import styled from 'styled-components';

export const HeaderStyle = styled.header`
  display: flex;
  width: 100%;
  height: 90px;
  padding-top: 16px;

  border-top: 8px solid ${(props) => props.theme.colors.orange};

  justify-content: center;
  position: relative;
`;
