import 'styled-components';
import { DefaultTheme } from "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryDark: string;
    primaryLight: string;
    primaryHover: string;
    buttonPrimary: string;
    buttonSuccess: string;
    buttonDanger: string;
    buttonWarn: string;
    toastColor: string;
    toastSuccess: string;
    toastError: string;
    mobile: string;
    tablet: string;
  }
}

export const theme : DefaultTheme = {
  primaryDark: '#0D0C1D',
  primaryLight: '#EFFFFA',
  primaryHover: '#343078',
  buttonPrimary: '#343078',
  buttonSuccess: '#388E3C',
  buttonDanger:  '#D32F2F',
  buttonWarn: '#F57C00',
  toastColor: '#333333',
  toastSuccess: '#4CAF50',
  toastError: '#D32F2F',
  mobile: '600px',
  tablet: '900px'
}
