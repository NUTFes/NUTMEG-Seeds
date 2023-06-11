import styled from 'styled-components';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const Add = (props: Props) => {
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
      <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
    </svg>
  );
};

export default Add;
