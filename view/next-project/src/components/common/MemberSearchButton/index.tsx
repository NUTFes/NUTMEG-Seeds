import styles from './index.module.css';

interface Props {
  title: string;
  onClick?: () => void;
}

const MemberSearchButton = ({ title = 'Search', onClick = () => undefined }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default MemberSearchButton;
