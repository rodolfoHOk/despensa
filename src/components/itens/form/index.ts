import styled from 'styled-components';

export const Form: any = styled.form`
  display: flex;
  flex-direction: column;
`;

Form.Row = styled.div`
  display: inline-block;

  div + div {
    margin-left: 14px;
  }

  @media (max-width: ${({theme}) => theme.tablet}) {
    display: block;

    div + div {
      margin-left: 0;
    }
  }
`;
