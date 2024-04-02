import { useMemo } from 'react';
import { useRouter } from 'next/router';
import AnimationButton from '../AnimationButton';
import s from './RecordAddAnimation.module.css';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadFireworksPreset } from 'tsparticles-preset-fireworks';

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  setAddModalOpen: Function;
  newRecordId: string | number;
}

const RecordAddAnimation = (props: Props) => {
  const router = useRouter();

  const onInit = async (main: Engine): Promise<void> => {
    await loadFireworksPreset(main);
  };

  const options = {
    preset: 'fireworks',
  };

  const randomTitle = useMemo(() => {
    const titles = ['Congratulation', 'Good Job', 'Great', 'Awesome', 'Amazing', 'Fantastic', 'Wonderful', 'Bravo'];
    const random = Math.floor(Math.random() * titles.length);
    return titles[random];
  }, []);

  const showRecordsHandler = (openNewPage: boolean) => {
    props.setIsOpen(false);
    props.setAddModalOpen(false);
    if (openNewPage) {
      router.push(`/records/${props.newRecordId}`);
    } else {
      router.push('/records');
    }
  };

  const navigateHandler = (path: string) => {
    props.setIsOpen(false);
    props.setAddModalOpen(false);
    if (path === '/post') {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  return (
    <div className={s.container}>
      <Particles options={options} init={onInit} className={s.particles} />
      <h1 className={s.title}>{randomTitle}!</h1>
      <div className={s.buttons}>
        <AnimationButton onClick={() => showRecordsHandler(true)}>追加したレコードを見る</AnimationButton>
        <AnimationButton onClick={() => showRecordsHandler(false)}>レコード一覧ページに戻る</AnimationButton>
        <AnimationButton onClick={() => navigateHandler('/post')}>下書きページに戻る</AnimationButton>
      </div>
    </div>
  );
};

export default RecordAddAnimation;
