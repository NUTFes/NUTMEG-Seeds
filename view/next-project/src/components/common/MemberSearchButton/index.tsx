import styles from "./index.module.css";

const Button = ({
  title = "Search",
  onClick = () => undefined,
}: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

type Props = {
  title: string;
  onClick?: () => void;
};

export default Button;