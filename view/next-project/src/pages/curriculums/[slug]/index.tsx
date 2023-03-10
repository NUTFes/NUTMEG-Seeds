import React, { useState } from 'react';
import Router from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import ShadowCard from '@components/common/ShadowCard';
import s from './Chapters.module.css';
import { switchChapterIcon } from '@utils/switchChapterIcon';
import NavigateNext from '@components/icons/NavigateNext';
import CurriculumDetailHeader from '@components/common/CurriculumDetailHeader';
import { formatDate } from '@utils/format_date';
import ListHeader from '@components/common/ListHeader';

interface Curriculum {
  id: number;
  title: string;
  skill_ids: number[];
  graduation_assignment: string;
  created_at: string;
  updated_at: string;
}

interface Skill {
  id: number;
  name: string;
}

interface Chapter {
  id?: number;
  title: string;
  content: string;
  homework: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

interface Record {
  id: number;
  title: string;
  user: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  curriculum: Curriculum;
  skills: Skill[];
  chapters: Chapter[];
  records: Record[];
}

export async function getServerSideProps({ params }: any) {
  const id = params.slug;
  const getUrl = `${process.env.SSR_API_URI}/api/v1/get_curriculum_chapter_records_for_view/${id}`;
  const json = await get(getUrl);
  return {
    props: {
      curriculum: json[0].curriculum || null,
      skills: json[0].skills || null,
      chapters: json[0].chapter || null,
      records: json[0].records || null,
    },
  };
}

export default function Chapters(props: Props) {
  // チャプターをorder順に並び替えるためのソート関数
  const sort = (array: Chapter[]) => {
    return array.sort((a, b) => a.order - b.order);
  };
  const sortedChapters: Chapter[] = sort(props.chapters);

  return (
    <MainLayout>
      <CurriculumDetailHeader curriculum={props.curriculum} skills={props.skills} />
      <ListHeader title='Chapters' />
      <div className={s.parentButton}>
        <div className={s.chapters}>
          {sortedChapters.map((chapter: Chapter, index: number) => (
            <div className={s.chapter} key={chapter.toString()}>
              <ShadowCard onClick={() => Router.push(`/curriculums/${props.curriculum.id}/chapters/${chapter.id}`)}>
                <div className={s.chapterContainer}>
                  <div className={s.chapterIcon}>{switchChapterIcon(sortedChapters.length, index)}</div>
                  <div className={s.chapterInfo}>
                    <span className={s.chapterTitle}>{chapter.title}</span>
                    <span className={s.chapterContent}>{chapter.content}</span>
                  </div>
                  <div className={s.navigateNextIcon}>
                    <NavigateNext width={28} height={28} color={'#FFAC5D'} />
                  </div>
                </div>
              </ShadowCard>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
