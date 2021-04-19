import styled, { css } from 'styled-components';
import Categoria from '../../../interface/categoria';

interface FormFieldProps {
  width?: string;
}

export const StyledFormField = styled.div<FormFieldProps>`
  flex: 1;
  position: relative;
  display: inline-block;
  width: ${({width}) => width ? `calc(${width} - 7px)` : '100%'};

  @media (max-width: ${({theme}) => theme.tablet}) {
    display: block;
    width: 100%;
  }
`;

const Label: any = styled.label`

`;

Label.Text = styled.span`
  position: absolute; 
  top: 16px;
  left: 16px;
  display: flex;
  height: 50px;
  font-size: 16px;
  font-style: normal;
  color: ${({theme}) => theme.primaryDark + 'dd'};
  transform-origin: 0% 0%;
  transition: .2s ease-in-out;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  margin-bottom: 16px;
  padding: 16px 16px 0;
  text-justify: bottom;
  font-size: 18px;
  background: #FFFFFF;
  color: ${({theme}) => theme.primaryDark};
  outline: 1px;
  border: 1px solid ${({theme}) => theme.primaryDark};
  border-bottom: 4px solid ${({theme}) => theme.primaryDark};
  border-radius: 6px;
  transition: border-color .3s;
  &:focus {
    border-bottom-color: ${({theme}) => theme.primaryHover};
    -webkit-box-shadow: 0px 0px 5px 5px ${({theme}) => theme.primaryHover + '33'}; 
    box-shadow: 0px 0px 5px 5px ${({theme}) => theme.primaryHover + '33'};
    + ${Label.Text} {
      transform: scale(.6) translateY(-16px);
      color: ${({theme}) => theme.primaryHover};
    }
  }
  &:disabled {
    border: 1px solid ${({theme}) => theme.primaryDark + '77'};
    border-bottom: 4px solid ${({theme}) => theme.primaryDark + '77'};
    color: ${({theme}) => theme.primaryDark + '77'};
  }
  ${({ value }) => {
    const hasValue = value.toString().length > 0;
    return hasValue && css`
      + ${Label.Text} {
        transform: scale(.6) translateY(-16px);
        color: ${({theme}) => theme.primaryHover};
      }
    `;
  }}
`;

export default function FormField(
{
  label,
  type,
  name,
  value,
  onChange,
  suggestions,
  width,
  disabled,
  min,
  max,
}:{
  label: string,
  type: string,
  name: string,
  value: string | number,
  onChange: (event: any) => any | null,
  suggestions?: Categoria[],
  width?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}) {
  const fieldId = `id_${name}`;
  const hasSuggestions = Boolean(suggestions);

  return(
    <StyledFormField width={width}>
      <Label htmlFor={fieldId}>
        <Input
          id={fieldId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={hasSuggestions ? 'off' : 'on'}
          list={hasSuggestions ? `suggestionFor_${fieldId}` : undefined}
          disabled={disabled}
          min={min}
          max={max}
        />
        <Label.Text>
          { label } 
        </Label.Text>
      </Label>
      { 
        hasSuggestions
        &&
        <datalist id={`suggestionFor_${fieldId}`}>
          {
            suggestions.map(suggestion => (
              <option value={suggestion.nome} key={`suggestionFor_${fieldId}_option_${suggestion._id}`}>
                {suggestion.emoji + ' ' + suggestion.nome}
              </option>
            ))
          }
        </datalist>
      }
    </StyledFormField>
  );
}

/* obs: mudanças para a aplicação especificamente
original:
  suggestions?: string[],
  ...
  <option value={suggestion} key={`suggestionFor_${fieldId}_option_${suggestion}`}>
    {suggestion}
  </option>
*/
