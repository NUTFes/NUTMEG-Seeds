import React from 'react';
import Router from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import ShadowCard from '@components/common/ShadowCard';
import s from './Chapters.module.css';
import { switchChapterIcon } from '@utils/switchChapterIcon';

interface Curriculum {
  id: number;
  title: string;
  skill_ids: number[];
  graduation_assignment: string;
  created_at: string;
  updated_at: string;
}

interface Chapter {
  id: number;
  title: string;
  content: string;
  homework: string;
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
  chapters: Chapter[];
  records: Record[];
}

export async function getServerSideProps({ params }: any) {
  const id = params.slug;
  const getUrl = `${process.env.SSR_API_URI}/api/v1/get_curriculum_chapter_for_view/${id}`;
  const json = await get(getUrl);
  return {
    props: {
      curriculum: json[0].curriculum,
      chapters: json[0].chapter,
      records: json[0].records,
    },
  };
}

export default function Chapters(props: Props) {
  return (
    <MainLayout>
      <div className={s.parentButton}>
        <div className={s.chapters}>
          {props.chapters.map((chapter: Chapter, index: number) => (
            <div className={s.chapter}>
              <ShadowCard
                key={chapter.toString()}
                onClick={() => Router.push(`/curriculums/${props.curriculum.id}/chapters/${chapter.id}`)}
              >
                <div className={s.chapterContainer}>
                  <div className={s.chapterIcon}>{switchChapterIcon(props.chapters.length, index)}</div>
                  <div className={s.chapterInfo}>
                    <span className={s.chapterTitle}>{chapter.title}</span>
                    <span className={s.chapterContent}>{chapter.content}</span>
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
