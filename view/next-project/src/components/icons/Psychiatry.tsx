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
      <path d='M22.5 41.5V26.05h-1q-3.2 0-6.025-1.225T10.45 21.35q-2.2-2.25-3.325-5.2T6 10V6h3.9q3.1 0 5.95 1.225t5.1 3.475q1.65 1.7 2.725 3.8 1.075 2.1 1.525 4.45.4-.6.85-1.15.45-.55.95-1.1 2.25-2.25 5.1-3.475Q34.95 12 38.1 12H42v4q0 3.2-1.2 6.15t-3.4 5.2q-2.25 2.25-5.075 3.45Q29.5 32 26.4 32h-.9v9.5Zm.05-18.5q0-3.05-1-5.675T18.8 12.85q-1.75-1.8-4.3-2.825Q11.95 9 9 9q0 3.15.925 5.775.925 2.625 2.675 4.475 2.1 2.25 4.525 3 2.425.75 5.425.75Zm2.95 6q3 0 5.55-.975t4.3-2.825q1.75-1.8 2.7-4.425Q39 18.15 39 15q-3 0-5.55 1.025t-4.3 2.825q-2.15 2.25-2.9 4.7T25.5 29Zm0 0Zm-2.95-6Z' />
    </svg>
  );
};

export default PottedPlant;
