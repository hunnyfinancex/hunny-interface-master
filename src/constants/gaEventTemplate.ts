import { GAEvent } from '../modules/analytics';

export const GOOGLE_ANALYTIC_EVENTS = {
  ADD_TOKEN_METAMASK_CLICK: {
    action: '[click][topbar][add_hunny_to_metamask]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  HUNNY_LOGO_CLICK: {
    action: '[click][topbar][logo]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  BUY_NOW_CLICK: {
    action: '[click][topbar][buynow]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  HUNNY_PRICE_CLICK: {
    action: '[click][topbar][hunny_price]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  VIEW_MY_ACCOUNT_CLICK: {
    action: '[click][topbar][view_my_account]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  CONNECT_WALLET_CLICK: {
    action: '[click][topbar][view_my_account]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  UTILITY_MOBILE_CLICK: {
    action: '[click][topbar][open_menu_on_mobile]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  POOL_NAV_CLICK: {
    action: '[click][topbar][pool_navigation]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  LOTTERY_NAV_CLICK: {
    action: '[click][topbar][lottery_navigation]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  CONVERT_CLICK: {
    action: '[click][topbar][convert_navigation]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  DOCS_CLICK: {
    action: '[click][topbar][docs_navigation]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  VOTE_CLICK: {
    action: '[click][topbar][vote_navigation]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  DAO_CLICK: {
    action: '[click][topbar][dao_navigation]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  PLAY_CLICK: {
    action: '[click][topbar][play_navigation]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  POKER_CLICK: {
    action: '[click][topbar][poker_navigation]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,
  NFT_CLICK: {
    action: '[click][topbar][nft_navigation]',
    category: 'click',
    label: 'top_bar',
  } as GAEvent,

  HEADER_TELEGRAM_CLICK: {
    action: '[click][pools][icon_telegram]',
    category: 'click',
    label: 'pool_dashboard_header',
  } as GAEvent,
  HEADER_TWITTER_CLICK: {
    action: '[click][pools][icon_twiiter]',
    category: 'click',
    label: 'pool_dashboard_header',
  } as GAEvent,
  HEADER_CERTIK_CLICK: {
    action: '[click][pools][icon_certik]',
    category: 'click',
    label: 'pool_dashboard_header',
  } as GAEvent,

  BSC_POOL_CLICK: {
    action: '[click][pools][bsc_pool]',
    category: 'click',
    label: 'pool_list',
  } as GAEvent,
  ETH_POOL_CLICK: {
    action: '[click][pools][eth_pool]',
    category: 'click',
    label: 'pool_list',
  } as GAEvent,

  FOOTER_COINMARKETCAP_CLICK: {
    action: '[click][fotter][coinmarketcap]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_COINGECKO_CLICK: {
    action: '[click][fotter][coingecko]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_DAPPRADAR_CLICK: {
    action: '[click][fotter][dappradar]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_TOKENPOCKET_CLICK: {
    action: '[click][fotter][tokenpocket]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_DAPP_CLICK: {
    action: '[click][fotter][dapp.com]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_BSCSCAN_CLICK: {
    action: '[click][fotter][bscscan]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_CHAINLINK_CLICK: {
    action: '[click][fotter][chainlink]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_NOMICS_CLICK: {
    action: '[click][fotter][nomics]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_DEFILLAMA_CLICK: {
    action: '[click][fotter][defillama]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_KINGDATA_CLICK: {
    action: '[click][fotter][kingdata]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_DEBANK_CLICK: {
    action: '[click][fotter][debank]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_GITHUB_CLICK: {
    action: '[click][fotter][github]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_DOCUMENT_CLICK: {
    action: '[click][fotter][document]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_MEDIUM_CLICK: {
    action: '[click][fotter][medium]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_TELEGRAM_CLICK: {
    action: '[click][fotter][telegram]',
    category: 'click',
    label: 'footer',
  } as GAEvent,
  FOOTER_TWITTER_CLICK: {
    action: '[click][fotter][twitter]',
    category: 'click',
    label: 'footer',
  } as GAEvent,

  CLICK_CLOSE_MODAL: {
    action: '[click][modal][close_modal]',
    category: 'click',
    label: 'modal',
  } as GAEvent,

  ACTION_CLOSE_MODAL: {
    action: '[event][modal][close_modal]',
    category: 'event',
    label: 'modal',
  } as GAEvent,

  CLICK_VIEW_ON_BSC_SCAN_YOUR_WALLET_MODAL: {
    action: '[click][your_wallet][view_on_bsc_scan]',
    category: 'click',
    label: 'your_wallet_modal',
  } as GAEvent,

  CLICK_COPY_ADDRESS_YOUR_WALLET_MODAL: {
    action: '[click][your_wallet][copy_address]',
    category: 'click',
    label: 'your_wallet_modal',
  } as GAEvent,

  CLICK_LOGOUT_YOUR_WALLET_MODAL: {
    action: '[click][your_wallet][logout]',
    category: 'click',
    label: 'your_wallet_modal',
  } as GAEvent,
  // metamask
  CLICK_CONNECT_METAMASK_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][metamask]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  CLICK_DOCS_CONNECT_METAMASK_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][docs_metamask]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  // trust
  CLICK_CONNECT_TRUST_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][trust]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  // math
  CLICK_CONNECT_MATHWALLET_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][mathwallet]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  CLICK_DOCS_CONNECT_MATHWALLET_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][docs_mathwallet]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  //safepal
  CLICK_CONNECT_SAFEPAL_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][safepal]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  CLICK_DOCS_CONNECT_SAFEPAL_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][docs_safepal]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  // bsc
  CLICK_CONNECT_BSCWALLET_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][bscwallet]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  CLICK_DOCS_CONNECT_BSCWALLET_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][docs_bscwallet]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  // tokenpocket
  CLICK_CONNECT_TOKENPOCKET_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][tokenpocket]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  CLICK_DOCS_CONNECT_TOKENPOCKET_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][docs_tokenpocket]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  // coin98
  CLICK_CONNECT_COIN98_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][coin98]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  CLICK_DOCS_CONNECT_COIN98_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][docs_coin98]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  // Bitkeep
  CLICK_CONNECT_BITKEEP_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][bitkeep]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  CLICK_DOCS_CONNECT_BITKEEP_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][docs_bitkeep]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,
  // wallet conenct
  CLICK_WALLET_CONNECT_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][wallet_connect]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,

  CLICK_BSC_DOCS_CONNECT_WALLET_MODAL: {
    action: '[click][connect_wallet][bsc_docs]',
    category: 'click',
    label: 'connect_wallet_modal',
  } as GAEvent,

  CLICK_VIEW_CHART_ON_DESKTOP: {
    action: '[click][pools][view_chart_on_desktop]',
    category: 'click',
    label: 'utility',
  } as GAEvent,
  CLICK_VIEW_CONTRACT_ON_DESKTOP: {
    action: '[click][pools][view_contract_on_desktop]',
    category: 'click',
    label: 'utility',
  } as GAEvent,
  CLICK_VIEW_CHART_ON_MOBILE: {
    action: '[click][pools][view_chart_on_mobile]',
    category: 'click',
    label: 'utility',
  } as GAEvent,
  CLICK_VIEW_CONTRACT_ON_MOBILE: {
    action: '[click][pools][view_contract_on_mobile]',
    category: 'click',
    label: 'utility',
  } as GAEvent,

  CLICK_MAX_BUTTON_ON_TOKEN_INPUT: {
    action: '[click][pool_details][max_button]',
    category: 'click',
    label: 'token_input',
  } as GAEvent,

  CLICK_DEPOST_TOGGLE_ON_POOL_DETAILS: {
    action: 'click_deposit_togge_on_pool_details',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,
  CLICK_WITHDRAW_TOGGLE_ON_POOL_DETAILS: {
    action: 'click_withdraw_togge_on_pool_details',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,

  CLICK_CLAIM_BUTTON: {
    action: '[click][pool_details][claim_button]',
    category: 'click',
    label: 'pool_detai',
  } as GAEvent,
  CLICK_DEPOSIT_ON_POOL_DETAILS: {
    action: '[click][pool_details][deposit]',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,
  CLICK_WITHDRAW_ON_POOL_DETAILS: {
    action: '[click][pool_details][withdraw]',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,
  CLICK_EXIT_ON_POOL_DETAILS: {
    action: '[click][pool_details][exit_withdraw_claim]',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,
  CLICK_APPROVE_ON_POOL_DETAILS: {
    action: '[click][pool_details][approve]',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,

  CLICK_BACK_ON_POOL_DETAILS: {
    action: '[click][pool_details][back]',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,

  CLICK_BUY_HUNNY_ON_POOL_DETAILS: {
    action: '[click][pool_details][buy_hunny]',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,
  CLICK_BUY_BANANA_ON_POOL_DETAILS: {
    action: '[click][pool_details][buy_banana]',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,
  CLICK_BUY_CAKE_LP_ON_POOL_DETAILS: {
    action: '[click][pool_details][cake_lp_pool]',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,
  CLICK_BUY_BANANA_LP_ON_POOL_DETAILS: {
    action: '[click][pool_details][buy_banana_lp]',
    category: 'click',
    label: 'pool_details',
  } as GAEvent,

  CLICK_POOL: {
    action: '[click][pools][pool]',
    category: 'click',
    label: 'pool_list',
  } as GAEvent,

  ERROR_TOKEN_INPUT: {
    action: '[error][pool_details][token_input]',
    category: 'error',
    label: 'token_input',
  } as GAEvent,

  ERROR_CONNECT_WALLET: {
    action: '[error][connect_wallet][error_connect_wallet]',
    category: 'error',
    label: 'connect_wallet',
  } as GAEvent,

  CURRENT_DRAW_LOTTERY_CLICK: {
    action: '[click][lottery][current_draw]',
    category: 'click',
    label: 'lottery',
  } as GAEvent,
  PAST_DRAW_LOTTERY_CLICK: {
    action: '[click][lottery][past_draw]',
    category: 'click',
    label: 'lottery',
  } as GAEvent,
};
