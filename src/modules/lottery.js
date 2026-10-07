import Web3 from 'web3';

import HunnyLotteryBuild from './abis/HunnyLottery.json';
import HunnyLotteryNFTBuild from './abis/HunnyLotteryNFT.json';
import HunnyLotteryNFTLegacyBuild from './abis/HunnyLotteryNFTLegacy.json';

import { forkjoinRequest, getAddress, getPublicProvider } from './utils';
import {
  HUNNY_LOTTERY,
  HUNNY_LOTTERY_NFT,
  HUNNY_LOTTERY_NFT_LEGACY,
} from '../constants/contracts';
import {
  LOTTERY_TICKET_MIN_PRICE,
  LOTTERY_FETCH_NUMBER_ROUND,
} from '../constants/values';
import BigNumber from 'bignumber.js';

const getWeb3 = (ethereum) => {
  if (ethereum) {
    return new Web3(ethereum);
  } else {
    return getPublicProvider();
  }
};

const getHunnyLotteryContract = (ethereum) => {
  const web3 = getWeb3(ethereum);
  return new web3.eth.Contract(
    HunnyLotteryBuild.abi,
    getAddress(HUNNY_LOTTERY)
  );
};

const getHunnyLotteryNFTContract = (ethereum) => {
  const web3 = getWeb3(ethereum);
  return new web3.eth.Contract(
    HunnyLotteryNFTBuild.abi,
    getAddress(HUNNY_LOTTERY_NFT)
  );
};

const getHunnyLotteryNFTLegacyContract = (ethereum) => {
  const web3 = getWeb3(ethereum);
  return new web3.eth.Contract(
    HunnyLotteryNFTLegacyBuild.abi,
    getAddress(HUNNY_LOTTERY_NFT_LEGACY)
  );
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 14) + 1;
};

export const getLotteryIssueIndex = async () => {
  const contract = getHunnyLotteryContract(null);
  return await contract.methods.issueIndex().call();
};

export const getLotteryTotalAmount = async (issueIndex) => {
  const contract = getHunnyLotteryContract(null);
  const current = await getLotteryIssueIndex();

  if (!issueIndex || issueIndex >= current || issueIndex < 0) {
    const balance = await contract.methods.totalAmount().call();
    return new BigNumber(balance);
  } else {
    const balance = await contract.methods.historyAmount(issueIndex, 0).call();
    return new BigNumber(balance);
  }
};

export const getLotteryTicketsInRoundOfAccount = async (
  account,
  issueIndex
) => {
  let tickets = [];

  if (!issueIndex) {
    return tickets;
  }

  const nftContract = getHunnyLotteryNFTContract(null);
  const nftLegacyContract = getHunnyLotteryNFTLegacyContract(null);
  const lotteryContract = getHunnyLotteryContract(null);
  const lotteryInfo = await lotteryContract.methods
    .lotteryInfoOfAccount(issueIndex, account)
    .call();

  for (let i = 0; i < lotteryInfo.length; i++) {
    let numbers;
    if (issueIndex < 6) {
      numbers = await nftLegacyContract.methods
        .getLotteryNumbers(lotteryInfo[i])
        .call();
    } else {
      numbers = await nftContract.methods
        .getLotteryNumbers(lotteryInfo[i])
        .call();
    }

    tickets.push(numbers);
  }

  return tickets;
};

export const getLotteryTicketsAllRoundOfAccount = async (account) => {
  let roundTickets = [];
  const issueIndex = await getLotteryIssueIndex();

  for (let i = 0; i <= issueIndex; i++) {
    roundTickets.push(await getLotteryTicketsInRoundOfAccount(account, i));
  }

  return roundTickets;
};

export const getLotteryWinningNumbers = async (issueIndex) => {
  const lotteryContract = getHunnyLotteryContract(null);
  const current = await getLotteryIssueIndex();

  if (!issueIndex || issueIndex > current || issueIndex < 0) {
    return [0, 0, 0, 0];
  }

  const number1 = await lotteryContract.methods
    .historyNumbers(issueIndex, 0)
    .call();
  const number2 = await lotteryContract.methods
    .historyNumbers(issueIndex, 1)
    .call();
  const number3 = await lotteryContract.methods
    .historyNumbers(issueIndex, 2)
    .call();
  const number4 = await lotteryContract.methods
    .historyNumbers(issueIndex, 3)
    .call();

  return [
    parseInt(number1),
    parseInt(number2),
    parseInt(number3),
    parseInt(number4),
  ];
};

export const getLotteryTotalReward = async (account) => {
  const lotteryContract = getHunnyLotteryContract(null);
  const nftContract = getHunnyLotteryNFTContract(null);
  const issueIndex = await getLotteryIssueIndex();
  const balance = await nftContract.methods.balanceOf(account).call();
  let total = new BigNumber(0);
  for (let i = 0; i < balance; i++) {
    const token = await nftContract.methods
      .tokenOfOwnerByIndex(account, i)
      .call();
    const tokenIssueIndex = await nftContract.methods
      .getLotteryIssueIndex(token)
      .call();

    if (tokenIssueIndex === issueIndex) {
      const reward = await lotteryContract.methods.getRewardView(token).call();
      total = total.plus(new BigNumber(reward));
    }
  }

  return total;
};

export const getLotteryTicketsHaveReward = async (account) => {
  const lotteryContract = getHunnyLotteryContract(null);
  const nftContract = getHunnyLotteryNFTContract(null);
  const nftLegacyContract = getHunnyLotteryNFTLegacyContract(null);
  const issueIndex = await getLotteryIssueIndex();
  const winningNumbers = await getLotteryWinningNumbers(issueIndex);
  const roundEnd = winningNumbers[0] === 0 ? issueIndex - 1 : issueIndex;

  const fetchStatus = [];
  let tickets = [];

  for (let i = roundEnd - LOTTERY_FETCH_NUMBER_ROUND + 1; i <= roundEnd; i++) {
    const fetch = async () => {
      try {
        const lotteryInfo = await lotteryContract.methods
          .lotteryInfoOfAccount(i, account)
          .call();

        const fetchRewardStatus = [];

        for (let idx = 0; idx < lotteryInfo.length; idx++) {
          let reward;
          let claimStatus;

          if (i < 6) {
            const fetch = async () => {
              reward = await lotteryContract.methods
                .getRewardViewLegacy(lotteryInfo[idx])
                .call();
              claimStatus = await nftLegacyContract.methods
                .getClaimStatus(lotteryInfo[idx])
                .call();

              return [new BigNumber(reward), claimStatus, idx];
            };

            fetchRewardStatus.push(fetch());
          } else {
            const fetch = async () => {
              reward = await lotteryContract.methods
                .getRewardView(lotteryInfo[idx])
                .call();
              claimStatus = await nftContract.methods
                .getClaimStatus(lotteryInfo[idx])
                .call();

              return [new BigNumber(reward), claimStatus, idx];
            };

            fetchRewardStatus.push(fetch());
          }
        }

        const result = await forkjoinRequest(fetchRewardStatus);

        for (let index = 0; index < result.length; index++) {
          const [reward, claimStatus, idx] = result[index];

          if (reward && reward.gt(0) && !claimStatus) {
            tickets.push({
              token: lotteryInfo[idx],
              reward: reward,
            });
          }
        }

        return;
      } catch (e) {
        return null;
      }
    };

    fetchStatus.push(fetch());
  }

  await forkjoinRequest(fetchStatus);

  return tickets;
};

export const getLotteryTicketsOfRound = async (issueIndex) => {
  let tickets = [];
  try {
    const lotteryContract = getHunnyLotteryContract(null);
    let i = 0;
    while (true) {
      const tokenId = await lotteryContract.methods
        .lotteryInfo(issueIndex, i)
        .call();
      tickets.push(tokenId);
      i++;
    }
  } catch (e) {
    return tickets;
  }
};

export const getWinnersOfRound = async (issueIndex) => {
  // const winningNumbers = await getLotteryWinningNumbers(issueIndex);
  // const tickets = await getLotteryTicketsOfRound(issueIndex);
  // console.log(tickets)
  // let matching4 = 0;
  // let matching3 = 0;
  // let matching2 = 0;
  // if (winningNumbers[0] !== 0) {
  //   for (let i = 0; i < tickets.length; i++) {
  //     let match = 0;
  //     for (let idx = 0; idx < 4; idx++) {
  //       if (tickets[i][idx] === winningNumbers[idx]) {
  //         match += 1;
  //       }
  //     }
  //
  //     if (match === 4) matching4 += 1;
  //     if (match === 3) matching3 += 1;
  //     if (match === 2) matching2 += 1;
  //   }
  //
  //   return [matching4, matching3, matching2];
  // }

  return [0, 0, 0];
};

export const getLotteryMatchingRewardAmount = async (issueIndex) => {
  const lotteryContract = getHunnyLotteryContract(null);
  const matching4 = await lotteryContract.methods
    .getMatchingRewardAmount(issueIndex, 4)
    .call();
  const matching3 = await lotteryContract.methods
    .getMatchingRewardAmount(issueIndex, 3)
    .call();
  const matching2 = await lotteryContract.methods
    .getMatchingRewardAmount(issueIndex, 2)
    .call();

  return [
    new BigNumber(matching4),
    new BigNumber(matching3),
    new BigNumber(matching2),
  ];
};

export const getLotteryDrawingPhase = async () => {
  const lotteryContract = getHunnyLotteryContract(null);
  const drawingPhase = await lotteryContract.methods.drawingPhase().call();
  const drawed = await lotteryContract.methods.drawed().call();

  return !drawed && !drawingPhase;
};

export const buyLotteryTickets = async (ethereum, account, amount) => {
  let tickets = [];
  for (let i = 0; i < amount; i++) {
    let ticket = [];
    ticket[0] = getRandomNumber();
    ticket[1] = getRandomNumber();
    ticket[2] = getRandomNumber();
    ticket[3] = getRandomNumber();

    tickets.push(ticket);
  }

  try {
    const contract = getHunnyLotteryContract(ethereum);
    const tx = await contract.methods
      .multiBuy(LOTTERY_TICKET_MIN_PRICE.toString(10), tickets)
      .send({
        from: account,
        to: getAddress(HUNNY_LOTTERY),
      });
    if (tx && tx.transactionHash) return tx.transactionHash;
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const claimLotteryReward = async (ethereum, account, tokens) => {
  try {
    const contract = getHunnyLotteryContract(ethereum);
    const tx = await contract.methods.multiClaim(tokens).send({
      from: account,
      to: getAddress(HUNNY_LOTTERY),
    });
    if (tx && tx.transactionHash) return tx.transactionHash;
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
