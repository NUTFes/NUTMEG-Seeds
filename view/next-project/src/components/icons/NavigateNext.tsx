type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const NavigateNext = (props: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width ? props.width : 48}
      viewBox='0 0 48 48'
      height={props.height ? props.height : 48}
      fill={props.color ? props.color : '#fff'}
    >
      <path d='m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z' />
    </svg>
  );
};

export default NavigateNext;
