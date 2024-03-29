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
      <path d='M15.85 41h16.3l2.4-9.5h-21.1l2.4 9.5Zm0 3q-1 0-1.825-.625T12.95 41.75l-2.6-10.25h27.3l-2.6 10.25q-.25 1-1.075 1.625T32.15 44ZM9 28.5h30v-5H9v5Zm15-12.55q.25-4.35 3.9-8.025Q31.55 4.25 35.95 4q-.15 4.05-3.35 7.525Q29.4 15 25.5 15.75v4.75H42v8q0 1.25-.875 2.125T39 31.5H9q-1.25 0-2.125-.875T6 28.5v-8h16.5v-4.75q-3.9-.75-7.075-4.225Q12.25 8.05 12.05 4q4.4.25 8.075 3.9Q23.8 11.55 24 15.95Z' />
    </svg>
  );
};

export default PottedPlant;
