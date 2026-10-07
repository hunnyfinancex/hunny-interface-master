import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

interface SearchControlProps {
  handleSearch: (searchValue: string) => void;
  validate?: (searchValue: string) => boolean;
  placeholder?: string;
  disabled?: boolean;
}

const SearchControl: React.FC<SearchControlProps> = ({handleSearch, placeholder, disabled, validate }) => {
  
  const [searchValue, setSearchValue] = useState('');
  const [typingTimeout, settypingTimeout] = useState(null);
  
  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace('.', '');
      
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      if(validate && !validate(value)){
        return;
      }

      
      setSearchValue(value);  

      settypingTimeout(setTimeout(()=>{
        handleSearch(value.trim());
      }, 500))
      
    },
    [setSearchValue, typingTimeout]
  );

  return (
    <StyledSearchContainer>
      <StyledSearchIcon/>
      <StyledInput 
        placeholder={placeholder} 
        value={searchValue} 
        onChange={handleValueChange}
        disabled={disabled}
        />
    </StyledSearchContainer>
  );
};

const StyledSearchIcon = styled(SearchIcon)`
  margin-left: 8px;
  color: white;
`;

const StyledSearchContainer = styled.div`
  border: 1px solid #272F52;
  display: flex;
  align-items: center;  
  border-radius: 5px;
  background-color: #191D25;
  margin-bottom: 22px;
  padding: 6px;
`;

const StyledInput = styled.input`
  min-width: 0;
  width: 100%;
  flex: 1 1;
  margin: 0;
  padding: 6px 20px;
  background: none;
  outline: none;
  border: 0;
  font-size: 18px;
  color: #fff;
  font-family: 'Ubuntu';

  &:disabled{
    opacity: 0.6
  }
`;

export default SearchControl;
