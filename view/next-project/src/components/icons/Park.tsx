type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const PottedPlant = (props: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width ? props.width : 48}
      viewBox='0 0 48 48'
      height={props.height ? props.height : 48}
      fill={props.color ? props.color : '#fff'}
    >
      <path d='M26.9 44h-5.75v-7.45H6l9.45-13.7H10.7L24 4l13.3 18.85h-4.7l9.4 13.7H26.9ZM11.8 33.55h9.45-4.5 14.5-4.45 9.45Zm0 0h24.45l-9.45-13.7h4.45L24 9.55l-7.25 10.3h4.5Z' />
    </svg>
  );
};

export default PottedPlant;
