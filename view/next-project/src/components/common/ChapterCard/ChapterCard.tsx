import React, { FC } from 'react';
import s from './ChapterCard.module.css';
import ShadowCard from '@components/common/ShadowCard';
import { switchChapterIcon } from 'src/utils';

interface Chapter {
  id?: number;
  title: string;
  content: string;
  homework: string;
  curriculum_id: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

interface Props {
  chapter: Chapter;
  index: number;
  length: number;
}

const ChapterCard: FC<Props> = ({ chapter, index, length }) => {
  return (
    <ShadowCard>
      <div className={s.chapterContainer}>
        <div className={s.chapterIcon}>{switchChapterIcon(length, index)}</div>
        <div className={s.chapterInfo}>
          <span className={s.chapterTitle}>{chapter.title}</span>
          <span className={s.chapterContent}>{chapter.content}</span>
        </div>
      </div>
    </ShadowCard>
  );
};

export default ChapterCard;
