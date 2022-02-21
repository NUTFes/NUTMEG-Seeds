import styled from 'styled-components';

type Props = {
  width?: number;
  height?: number;
};

const SlackIcon = (props: Props) => {
  const svg = styled.svg`
    position: relative;
    right: 0;
  `;
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={props.width} height={props.height} viewBox='0 0 48 48' fill='none'>
      <path
        d='M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z'
        fill='white'
      />
      <path
        d='M16.5355 27.3969C16.5355 28.8856 15.3193 30.1017 13.8306 30.1017C12.3419 30.1017 11.1258 28.8856 11.1258 27.3969C11.1258 25.9081 12.3419 24.692 13.8306 24.692H16.5355V27.3969Z'
        fill='#E01E5A'
      />
      <path
        d='M17.8984 27.3969C17.8984 25.9081 19.1145 24.692 20.6032 24.692C22.0919 24.692 23.3081 25.9081 23.3081 27.3969V34.1694C23.3081 35.6581 22.0919 36.8743 20.6032 36.8743C19.1145 36.8743 17.8984 35.6581 17.8984 34.1694V27.3969Z'
        fill='#E01E5A'
      />
      <path
        d='M20.6032 16.5355C19.1145 16.5355 17.8984 15.3194 17.8984 13.8307C17.8984 12.342 19.1145 11.1259 20.6032 11.1259C22.0919 11.1259 23.3081 12.342 23.3081 13.8307V16.5355H20.6032Z'
        fill='#36C5F0'
      />
      <path
        d='M20.6032 17.8984C22.0919 17.8984 23.3081 19.1146 23.3081 20.6033C23.3081 22.092 22.0919 23.3081 20.6032 23.3081H13.8306C12.3419 23.3081 11.1258 22.092 11.1258 20.6033C11.1258 19.1146 12.3419 17.8984 13.8306 17.8984H20.6032Z'
        fill='#36C5F0'
      />
      <path
        d='M31.4645 20.6033C31.4645 19.1146 32.6806 17.8984 34.1693 17.8984C35.6581 17.8984 36.8742 19.1146 36.8742 20.6033C36.8742 22.092 35.6581 23.3081 34.1693 23.3081H31.4645V20.6033Z'
        fill='#2EB67D'
      />
      <path
        d='M30.1016 20.6033C30.1016 22.092 28.8855 23.3081 27.3968 23.3081C25.9081 23.3081 24.6919 22.092 24.6919 20.6033V13.8307C24.6919 12.342 25.9081 11.1259 27.3968 11.1259C28.8855 11.1259 30.1016 12.342 30.1016 13.8307V20.6033Z'
        fill='#2EB67D'
      />
      <path
        d='M27.3968 31.4646C28.8855 31.4646 30.1016 32.6807 30.1016 34.1694C30.1016 35.6581 28.8855 36.8743 27.3968 36.8743C25.9081 36.8743 24.6919 35.6581 24.6919 34.1694V31.4646H27.3968Z'
        fill='#ECB22E'
      />
      <path
        d='M27.3968 30.1017C25.9081 30.1017 24.6919 28.8856 24.6919 27.3969C24.6919 25.9081 25.9081 24.692 27.3968 24.692H34.1693C35.6581 24.692 36.8742 25.9081 36.8742 27.3969C36.8742 28.8856 35.6581 30.1017 34.1693 30.1017H27.3968Z'
        fill='#ECB22E'
      />
    </svg>
  );
};

export default SlackIcon;
