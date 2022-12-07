import Button from '../TransButton';
import s from './RecordAddAnimation.module.scss';

const RecordAddAnimation = () => {
  return (
    <div className={s.conteiner}>
      <h1 className={s.title}>Congratulation</h1>
      <Button>追加したレコードを見る</Button>
      <Button>レコード一覧ページに戻る</Button>
    </div>
  );
};

export default RecordAddAnimation;
