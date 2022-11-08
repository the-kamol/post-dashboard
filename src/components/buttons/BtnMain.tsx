import { BtnMainProps } from 'components/buttons/types/btnMain';

export const BtnMain: React.FC<BtnMainProps> = (props) => (
  <button
    className={`btn bg-primary hover:bg-blue-700 text-white text-sm rounded-lg ${props.className}`}
    onClick={props.onClick}
    type={props.type ? 'submit' : 'button'}
  >
    {props.title}
  </button>
);
