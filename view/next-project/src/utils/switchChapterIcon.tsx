import Forest from '@components/icons/Forest';
import Park from '@components/icons/Park';
import PottedPlant from '@components/icons/PottedPlant';
import Psychiatry from '@components/icons/Psychiatry';

// chapterページで表示するアイコンを切り替える関数
export const switchChapterIcon = (length: number, index: number) => {
  const icons = [
    <PottedPlant width={32} height={32} color={'#9d9'} key={0} />,
    <Psychiatry width={32} height={32} color={'#9d9'} key={1} />,
    <Park width={32} height={32} color={'#9d9'} key={2} />,
    <Forest width={32} height={32} color={'#9d9'} key={3} />,
  ];
  const iconLength = icons.length;
  const iconLengthValue = [];
  for (let i = 1; i <= iconLength; i++) {
    iconLengthValue.push(i / iconLength);
  }

  if (index / length < iconLengthValue[0]) {
    return icons[0];
  } else if (index / length < iconLengthValue[1]) {
    return icons[1];
  } else if (index / length < iconLengthValue[2]) {
    return icons[2];
  } else if (index / length < iconLengthValue[3]) {
    return icons[3];
  } else {
    return icons[3];
  }
};
