import AnimationButton from '../AnimationButton';
import s from './RecordAddAnimation.module.css';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadFireworksPreset } from 'tsparticles-preset-fireworks';

const RecordAddAnimation = () => {
  const onInit = async (main: Engine): Promise<void> => {
    await loadFireworksPreset(main);
  };

  const options = {
    preset: 'fireworks',
    fullScreen: { enable: false },
    background: {
      color: { value: '#f5f5f5' },
      opacity: 0,
    },
  };

  return (
    <div className={s.container}>
      <Particles options={options} init={onInit} className={s.particles} />
      <h1 className={s.title}>Congratulation</h1>
      <div className={s.buttons}>
        <AnimationButton>追加したレコードを見る</AnimationButton>
        <AnimationButton>レコード一覧ページに戻る</AnimationButton>
      </div>
    </div>
  );
};

export default RecordAddAnimation;
