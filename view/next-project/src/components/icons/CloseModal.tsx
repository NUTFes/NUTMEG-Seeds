import styled from 'styled-components';

type Props = {
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
};

const CloseButton = styled.button`
  cursor: pointer;
  background: radial-gradient(var(--button-primary, #007bff), var(--button-secondary, #0056b3));
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  position: fixed; // Or absolute, depending on need

  &:active {
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.25);
  }
`;

const CloseModal = (props: Props) => {
  return (
    <CloseButton onClick={props.onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={props.width || 32}
        height={props.height || 32}
        viewBox='0 0 24 24'
        fill="none"
      >
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path d='M6 6L18 18M18 6L6 18' stroke="white" stroke-width='2' /> {/* Changed stroke color to white */}
      </svg>
    </CloseButton>
  );
};

export default CloseModal;
