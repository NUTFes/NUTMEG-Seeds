import React, { useState } from 'react';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import styled from 'styled-components';
import BackButton from '@components/common/BackButton';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import Row from '@components/layout/RowLayout';
import { useUI } from '@components/ui/context';
import ChapterDetailHeader from '@components/common/ChapterDetailHeader';
import ChapterEditModal from '@components/common/ChapterEditModal';
import Markdown from '@components/common/Markdown';

import { useRouter } from 'next/router';

interface Skill {
  id: number;
  name: string;
}

interface Curriculum {
  id: number;
  title: string;
  skill_ids: number[];
  graduation_assignment: string;
  created_at: string;
  updated_at: string;
}

interface Chapter {
  id?: number;
  title: string;
  content: string;
  homework: string;
  curriculum_id: number;
  order: number;
  created_at?: string;
  updated_at?: string;
}

interface Record {
  id: number;
  title: string;
  content: string;
  homework: string;
  user: string;
  curriculum_id: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  curriculum: Curriculum;
  skills: Skill[];
  records: Record[];
  chapter: Chapter;
  curriculums: Curriculum[];
}

export async function getServerSideProps({ params }: any) {
  const id = params.id;
  const getUrl = `${process.env.SSR_API_URI}/api/v1/get_chapter_for_detail/${id}`;
  const getCurriculumsUrl = `${process.env.SSR_API_URI}/curriculums`;
  const json = await get(getUrl);
  const curriculums = await get(getCurriculumsUrl);
  return {
    props: {
      chapter: json.chapter,
      curriculum: json.curriculum,
      skills: json.skills,
      records: json.records,
      curriculums: curriculums,
    },
  };
}

export default function Page(props: Props) {
  const SplitParentContainer = styled.div`
    display: flex;
    width: 100%;
  `;
  const SplitLeftContainer = styled.div`
    width: 70%;
  `;
  const SplitRightContainer = styled.div`
    width: 30%;
    margin-left: 2rem;
    margin-bottom: 40px;
  `;

  const CurriculumContentsContainer = styled.div`
    width: 100%;
  `;
  const CurriculumContentsTitle = styled.div`
    font-size: 2.8rem;
    padding-bottom: 1.2rem;
  `;
  const CurriculumContents = styled.div`
    font-size: 1.6rem;
    padding-bottom: 3rem;
  `;
  const ParentButtonContainer = styled.div`
    position: relative;
    width: 100%;
  `;
  const ChildButtonContainer = styled.div`
    position: absolute;
    bottom: 50px;
    left: -40px;
  `;
  const RecordContainer = styled.div`
    padding-bottom: 1rem;
  `;
  const RecordMember = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    width: 100%;
    padding-bottom: 1rem;
  `;
  const RecordContents = styled.div`
    font-size: 1.4rem;
    width: 100%;
    padding-bottom: 1rem;
  `;
  const RecordDate = styled.div`
    font-size: 1.2rem;
    width: 100%;
    text-align: right;
  `;

  const router = useRouter();

  const { openModal, setModalView } = useUI();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chapter, setChapter] = useState<Chapter>(props.chapter);

  const formatDate = (date: string) => {
    let datetime = date.replace('T', ' ');
    const datetime2 = datetime.substring(0, datetime.length - 5);
    return datetime2;
  };

  return (
    <MainLayout>
      <ChapterDetailHeader
        title={chapter.title}
        createDate={formatDate(props.curriculum.created_at)}
        updateDate={formatDate(props.curriculum.updated_at)}
        skills={props.skills}
      />
      <ParentButtonContainer>
        <SplitParentContainer>
          <SplitLeftContainer>
            <FlatCard width='100%' height='auto'>
              <Row gap='3rem' justify='end'>
                <EditButton
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
                <DeleteButton
                  onClick={() => {
                    setModalView('CHAPTER_DELETE_MODAL');
                    openModal();
                  }}
                />
              </Row>
              <CurriculumContentsContainer>
                <CurriculumContentsTitle>
                  Contents
                  <hr />
                </CurriculumContentsTitle>
                <CurriculumContents>
                  <Markdown>{chapter.content}</Markdown>
                </CurriculumContents>
                <CurriculumContentsTitle>
                  Homework
                  <hr />
                </CurriculumContentsTitle>
                <Markdown>{chapter.homework}</Markdown>
              </CurriculumContentsContainer>
            </FlatCard>
            <ChildButtonContainer>
              <BackButton />
            </ChildButtonContainer>
          </SplitLeftContainer>
          <SplitRightContainer>
            <RecordContainer>
              {props.records.map((record) => (
                <RecordContents key={record.title.toString()}>
                  <FlatCard
                    height='auto'
                    onClick={() => {
                      router.push(`/records/${record.id}`);
                    }}
                  >
                    <RecordMember>{record.user}</RecordMember>
                    <RecordContents>{record.title}</RecordContents>
                    <RecordDate>最終更新日: {formatDate(record.updated_at)}</RecordDate>
                  </FlatCard>
                </RecordContents>
              ))}
            </RecordContainer>
          </SplitRightContainer>
        </SplitParentContainer>
      </ParentButtonContainer>

      {/* チャプターの編集モーダル */}
      {isOpen && (
        <ChapterEditModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          chapter={chapter}
          setChapter={setChapter}
          curriculums={props.curriculums}
        />
      )}
    </MainLayout>
  );
}
