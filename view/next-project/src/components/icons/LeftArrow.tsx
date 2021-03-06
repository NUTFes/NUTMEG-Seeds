import styled from 'styled-components';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const LeftArrow = (props: Props) => {
  const svg = styled.svg`
    position: relative;
    right: 0;
  `;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width}
      viewBox='0 0 24 24'
      height={props.height}
      fill={props.color}
    >
      <path d='M0 0h24v24H0V0z' fill='none' />
      <path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' />
    </svg>
  );
};

export default LeftArrow;
