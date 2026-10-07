import React, { createContext, useCallback, useState } from 'react';
import styled from 'styled-components';
import { GOOGLE_ANALYTIC_EVENTS } from '../../constants/gaEventTemplate';
import analytics from '../../modules/analytics';

interface ModalsContext {
  content?: React.ReactNode;
  isOpen?: boolean;
  onPresent: (content: React.ReactNode, key?: string) => void;
  onDismiss: () => void;
}

export const Context = createContext<ModalsContext>({
  onPresent: () => {},
  onDismiss: () => {},
});

const Modals: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>();
  const [modalKey, setModalKey] = useState<string>();

  const handlePresent = useCallback(
    (modalContent: React.ReactNode, key?: string) => {
      setModalKey(key);
      setContent(modalContent);
      setIsOpen(true);
      document.body.classList.add('no-scroll');
    },
    [setContent, setIsOpen, setModalKey]
  );

  const handleDismiss = useCallback(() => {
    analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.ACTION_CLOSE_MODAL);

    setContent(undefined);
    setIsOpen(false);
    document.body.classList.remove('no-scroll');
  }, [setContent, setIsOpen, modalKey]);

  return (
    <Context.Provider
      value={{
        content,
        isOpen,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {isOpen && (
        <StyledModalWrapper>
          <StyledModalBackdrop onClick={handleDismiss} />
          {React.isValidElement(content) &&
            React.cloneElement(content, {
              onDismiss: handleDismiss,
            })}
        </StyledModalWrapper>
      )}
    </Context.Provider>
  );
};

const StyledModalWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`;

const StyledModalBackdrop = styled.div`
  background-color: ${(props) => props.theme.color.grey[600]}aa;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default Modals;
