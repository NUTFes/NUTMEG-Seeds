import styled from "styled-components";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const RightArrow = (props: Props) => {
  const svg = styled.svg`
    position: relative;
    right: 0;
  `;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      viewBox="0 0 24 24"
      height={props.height}
      fill={props.color}
    >
      <path d="M10 17l5-5-5-5v10z" />
      <path d="M0 24V0h24v24H0z" fill="none" />
    </svg>
  );
};

export default RightArrow;
