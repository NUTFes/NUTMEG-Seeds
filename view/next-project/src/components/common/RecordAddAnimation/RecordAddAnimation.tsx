import AnimationButton from '../AnimationButton';
import s from './RecordAddAnimation.module.css';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const RecordAddAnimation = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Congratulation</h1>
      <div className={s.buttons}>
        <AnimationButton>追加したレコードを見る</AnimationButton>
        <AnimationButton>レコード一覧ページに戻る</AnimationButton>
      </div>
    </div>
  );
};

export default RecordAddAnimation;
