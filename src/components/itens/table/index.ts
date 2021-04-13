import styled from 'styled-components';

export const Table: any = styled.table`
  display: table;
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 16px;
  tr {
    background-color: ${({theme}) => theme.primaryHover + '33'};
    &:hover {
      background-color: ${({theme}) => theme.primaryHover + '66'};
    }
    @media (max-width: ${({theme}) => theme.mobile}) {
      background-color: #c9d5e0;
      &:hover {
        background-color: #a4acc6;
      }
    }
  }
  th {
    padding: 5px 10px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: ${({theme}) => theme.primaryLight};
    background-color: ${({theme}) => theme.primaryHover};
  }
  td {
    padding: 3px 10px;
    text-align: center;
    font-size: 18px;
    font-weight: normal;
    border-top: 1px solid ${({theme}) => theme.primaryLight};
    color: ${({theme}) => theme.primaryDark};
  }
`;
