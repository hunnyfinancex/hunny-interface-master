import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import styled from 'styled-components';

import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import LanguageIcon from '@material-ui/icons/Language';
import { LANGUAGES } from 'constants/values';

const LanguageSelect: React.FC = React.memo(({ children }) => {
  const [open, setOpen] = React.useState(false);
  const { i18n } = useTranslation();

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    handleClose(event);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const selectedLanguage = LANGUAGES.find(
    (item) => item.code.toLowerCase() === i18n.language.toLocaleLowerCase()
  );

  return (
    <>
      <StyledSettingSection
        ref={anchorRef}
        aria-controls={open ? 'menu-lang-list' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {!children ? (
          <StyledContent>
            <img src={selectedLanguage?.logo} />
            {i18n.language.substring(0, 2)}
          </StyledContent>
        ) : (
          <>{children}</>
        )}
      </StyledSettingSection>

      <StyledPoper
        style={{ zIndex: 10 }}
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-end' ? 'center top' : 'center bottom',
            }}
          >
            <Paper
              style={{
                background:
                  'linear-gradient(0deg, #191d25 -5.56%, #1a2233 108.98%)',
                border: '1px solid #272F52',
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-lang-list"
                  onKeyDown={handleListKeyDown}
                >
                  {LANGUAGES.map((item) => (
                    <StyledMenuItem
                      onClick={(event) => {
                        handleSelect(event, item.code);
                      }}
                    >
                      <StyledFlagContainer>
                        <img src={item?.logo} />
                        {item.name}
                      </StyledFlagContainer>
                      {i18n.language === item.code && <DoneIcon />}
                    </StyledMenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </StyledPoper>
    </>
  );
});

const StyledMenuItem = styled(MenuItem)`
  color: #fff !important;

  display: flex !important;
  min-width: 240px !important;

  justify-content: space-between !important;

  &:hover {
    background: rgba(225, 225, 225, 0.2) !important;
  }
`;

const StyledContent = styled.div`
  text-transform: uppercase;
  margin: 4px 0px;
  position: relative;
  display: flex;

  box-sizing: border-box;
  align-items: center;
  cursor: pointer;
  justify-content: start;

  font-weight: bold;
  color: ${(props) => props.theme.color.grey[200]};
  opacity: 0.9;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const StyledFlagContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPoper = styled(Popper)``;

const StyledSettingSection = styled.div`
  width: 100%;
  
  display: flex;
  justify-content: flex-end;
}
`;

export default LanguageSelect;
