import React, { useCallback, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ClickAwayListener,
  FormControlLabel,
  Grid,
  Grow,
  Popper,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { Trans } from 'react-i18next';
import { useAppDispatch } from 'state';
import { setSelectedAssets } from 'state/pools';
import FilterIcon from 'assets/img/filterIcon.svg';
import { State } from 'modules/models/state.model';
import { POOL_ASSETS } from 'constants/poolFilter';
import { AssetTypeEnum } from 'modules/enums/Asset.enum';

const AssetsSelect: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const dispatch = useAppDispatch();

  const _selectedAsset = useSelector(
    (state: State) => state.pools.selectedAssets
  );

  const [open, setOpen] = useState(false);
  const [selectingTimeout, setSelectingTimeout] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(_selectedAsset);

  const anchorRef = React.useRef(null);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleClickSelect = useCallback(() => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [open]);

  const handleSelect = (item: any, code: AssetTypeEnum) => {
    if (selectingTimeout) {
      clearTimeout(selectingTimeout);
    }

    const _selectedAssets = {
      ...selectedAsset[code],
      [item.code]: !selectedAsset[code][item.code],
    };

    setSelectedAsset({
      ...selectedAsset,
      [code]: _selectedAssets,
    });

    setSelectingTimeout(
      setTimeout(() => {
        dispatch(
          setSelectedAssets({
            ...selectedAsset,
            [code]: _selectedAssets,
          })
        );
      }, 650)
    );
  };

  const totalFilter = Object.values({
    ...selectedAsset[AssetTypeEnum.Asset],
    ...selectedAsset[AssetTypeEnum.Farm],
    ...selectedAsset[AssetTypeEnum.Status],
  }).filter((item) => item).length;

  return (
    <>
      <StyledSelectContainer
        onClick={handleClickSelect}
        ref={anchorRef}
        style={{
          cursor: 'pointer',
        }}
        className={open || totalFilter ? 'open' : 'close'}
      >
        <StyledValueContainer>
          <Trans>Filter</Trans>
          <>{!!totalFilter && ` (${totalFilter})`}</>
        </StyledValueContainer>
        <StyledExpandMoreIcon className={open ? 'open' : 'close'} />
        <StyledMenuIcon src={FilterIcon} />
      </StyledSelectContainer>

      <StyledPopper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        role={undefined}
        disablePortal
        style={{ zIndex: 1, width: '100%' }}
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
        }}
      >
        <StyledOptionContainer>
          <ClickAwayListener onClickAway={handleClose}>
            <StyledOptionInnerContainer
              onKeyDown={handleListKeyDown}
              style={{ width: '100%' }}
            >
              {POOL_ASSETS.map((assets) => (
                <div>
                  <StyledTitle>{assets.name}</StyledTitle>
                  <Grid container>
                    {assets.items.map((item) => (
                      <Grid item xs={6} sm={3}>
                        <StyledCheckboxContainer
                          key={item.code}
                          className={
                            selectedAsset[assets.code][item.code] && 'checked'
                          }
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                value={item.code}
                                checked={
                                  !!selectedAsset[assets.code][item.code]
                                }
                                disabled={disabled}
                                onChange={() => {
                                  handleSelect(item, assets.code);
                                }}
                                disableRipple
                              />
                            }
                            label={item.name}
                          />
                        </StyledCheckboxContainer>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ))}
            </StyledOptionInnerContainer>
          </ClickAwayListener>
        </StyledOptionContainer>
      </StyledPopper>
    </>
  );
};

const StyledSelectContainer = styled.div`
  border: 1px solid #272f52;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #191d25;
  padding: 0px 6px;

  box-sizing: border-box;
  height: 100%;
  width: 100%;

  @media (max-width: 767px) {
    &.open {
      background: ${(props) => props.theme.color.purple[200]};
    }
  }
`;

const StyledOptionInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPopper = styled(Popper)`
  z-index: 1;
  width: 100% !important;
`;

const openKeyframes = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const StyledOptionContainer = styled.div`
  margin-top: 4px;
  padding: 8px;
  border: 1px solid #272f52;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #191d25;
  box-sizing: border-box;
  width: 100%;
  animation: ${openKeyframes} 0.1s forwards ease-out;
`;

const StyledValueContainer = styled.div`
  margin-right: 5px;
  margin-left: 6px;
  width: 100%;
  color: #fff;

  @media (max-width: 767px) {
    display: none;
  }
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  color: #fff;
  transition: transform 0.4s;

  &.open {
    transform: rotate(180deg);
    transition: transform 0.4s;
  }

  &.close {
    transform: rotate(360deg);
    transition: transform 0.4s;
  }

  @media (max-width: 767px) {
    display: none !important;
  }
`;

const StyledMenuIcon = styled.img`
  color: #fff;
  display: none !important;

  @media (max-width: 767px) {
    display: flex !important;
    height: 36px !important;
    width: 36px !important;
  }
`;

const StyledCheckboxContainer = styled.div`
  color: #fff;
  width: 100%;

  label {
    width: 100%;
    margin: 0px;

    .MuiButtonBase-root {
      padding: 4px !important;
    }
  }

  span {
    user-select: none;
    color: #fff !important;
  }

  &.checked {
    span {
      color: ${(props) => props.theme.color.purple[200]} !important;
    }
  }

  @media (max-width: 767px) {
    span {
      font-size: 14px !important;
    }
  }
`;

const StyledTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 4px;
  margin-bottom: 4px;
`;

export default AssetsSelect;
