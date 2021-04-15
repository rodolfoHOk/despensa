import styled from 'styled-components';

export const List = styled.div`
  width: 210mm;
  padding: 10mm;
  font-size: 12pt;
  background-color: ${({theme}) => theme.primaryLight};
  color: ${({theme}) => theme.primaryDark};

  h1 {
    font-size: 22pt;
    text-align: center;
    background-color: ${({theme}) => theme.primaryHover};
    color: ${({theme}) => theme.primaryLight};
    padding: 5pt;
  }

  h2 {
    font-size: 18pt;
  }

  h3 {
    font-size: 14pt;
  }
  
  .print {
    display:none;
  }

  .no-print { 
    display:block; 
  }

  table {
    th {
      padding: 0 5pt;
    }
    td {
      padding: 0 5pt;
    }
  }

  button {
    margin-top: 10pt;
    margin-right: 10pt;
    margin-left: auto;
  }

  @media (max-width: ${({theme}) => theme.tablet}){
    width: 100%;
    max-width: 210mm;
    h1 {
      font-size: 20pt;
    }
  }

  @media print {
    margin: 0;
    padding: 0;
    line-height: 1.4em;
    font-family: Georgia, 'Times New Roman', Times, serif;

    * {
      background-color: transparent;
      color: #000000;
      text-shadow: none;
      filter: none;
    }
    
    @Page {
      size: A4;
      margin: 10mm;
    }

    h1 {
      background-color: transparent;
      color: #000000;
      padding: 0;
    }
    
    img {
      max-width: 100%;
      max-height: 100%;
    }

    a, a:visited {
      text-decoration: underline;
    }

    a:link:after, a:visited:after {
      content: " (" attr(href) ") ";
    }

    p a {
      word-wrap: break-word;
    }

    p {
      widows: 3;
      orphans: 3;
    }

    .print {
      display:block;
    }

    .no-print { 
      display:none; 
    }

    .page-break {
      page-break-after: always;
    }
  }
`;