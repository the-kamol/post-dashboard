import { MouseEventHandler } from 'react';

type ButtonType = JSX.IntrinsicElements['button']['type'];
export interface BtnMainProps {
  title: string;
  type?: ButtonType;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
