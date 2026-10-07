import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Popper,
} from '@material-ui/core';

interface SelectProps {
  value: string;
  options: any[];
  ItemDisplay: React.FC<{ item: any }>;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  options,
  ItemDisplay,
  onChange,
  children,
  disabled,
}) => {
  const [open, setOpen] = useState(false);

  const anchorRef = React.useRef(null);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleSelect = (event: React.MouseEvent<EventTarget>, code: string) => {
    onChange(code);
    handleClose(event);
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

  return (
    <>
      <StyledSelectContainer
        onClick={handleClickSelect}
        ref={anchorRef}
        style={{
          cursor: disabled ? 'unset' : 'pointer',
          pointerEvents: disabled ? 'none' : 'unset',
        }}
      >
        <StyledValueContainer>{children}</StyledValueContainer>
        {!disabled && (
          <StyledExpandMoreIcon className={open ? 'open' : 'close'} />
        )}
      </StyledSelectContainer>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom"
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
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-end' ? 'center top' : 'center bottom',
            }}
          >
            <StyledOptionContainer>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  onKeyDown={handleListKeyDown}
                  style={{ width: '100%' }}
                >
                  {options.map(
                    (item) =>
                      item.code != value && (
                        <StyledMenuItem
                          key={item.code}
                          disableRipple
                          onClick={(event) => {
                            handleSelect(event, item.code);
                          }}
                        >
                          <ItemDisplay item={item} />
                        </StyledMenuItem>
                      )
                  )}
                </MenuList>
              </ClickAwayListener>
            </StyledOptionContainer>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const StyledSelectContainer = styled.div`
  border: 1px solid #272f52;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: #191d25;
  padding: 0px 6px;

  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

const StyledOptionContainer = styled.div`
  margin-top: 4px;
  border: 1px solid #272f52;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: #191d25;
  padding: 0px 8px;
  box-sizing: border-box;
  width: 100%;
`;

const StyledValueContainer = styled.div`
  margin-right: 8px;
  width: 100%;
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
`;

const StyledMenuItem = styled(MenuItem)`
  color: #fff !important;
  border-radius: 8px !important;
  padding: 12px 6px !important;
  box-sizing: border-box !important;
  margin: 0px 8px;

  &:hover {
    background: rgba(225, 225, 225, 0.1) !important;
  }
`;

export default Select;
