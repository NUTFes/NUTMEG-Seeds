import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import styled from 'styled-components';
import s from './Chapter.module.css';
import BackButton from '@components/common/BackButton';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import Row from '@components/layout/RowLayout';
import { useUI } from '@components/ui/context';
import ChapterDetailHeader from '@components/common/ChapterDetailHeader';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 任意のテーマをimport
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
  title: string;
  content: string;
  homework: string;
  curriculum_id: number;
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

interface CurriculumWithChapter {
  curriculum: Curriculum;
  chapter: Chapter[];
}

interface Props {
  curriculum: Curriculum;
  skills: Skill[];
  records: Record[];
  curriculumsWithChapter: CurriculumWithChapter[];
  chapter: Chapter;
}

export async function getServerSideProps({ params }: any) {
  const id = params.id;
  const getUrl = `${process.env.SSR_API_URI}/api/v1/get_chapter_for_detail/${id}`;
  const json = await get(getUrl);
  return {
    props: {
      chapter: json.chapter,
      curriculum: json.curriculum,
      skills: json.skills,
      records: json.records,
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

  const { setModalView, openModal } = useUI();

  const formatDate = (date: string) => {
    let datetime = date.replace('T', ' ');
    const datetime2 = datetime.substring(0, datetime.length - 5);
    return datetime2;
  };

  // コードブロックのレンダリング
  const markdownComponents = {
    pre: (pre: any) => {
      // 中身がcodeでなければ普通に表示させる
      if (pre.children[0].type !== 'code') {
        return <pre>{pre.children}</pre>;
      }

      const code = pre.children[0];
      // 正規表現で"language-言語名:ファイル名"をマッチする
      const matchResult = code.props.className ? code.props.className.match(/language-(\w+)(:(.+))?/) : '';
      const language = matchResult?.[1] || '';
      const filename = matchResult?.[3] || undefined;

      return (
        <SyntaxHighlighter
          language={language}
          style={materialDark}
          // // ファイル名がある場合、表示用の余白を作る
          // customStyle={filename && { paddingTop: '2.5rem' }}
          showLineNumbers
          className={s.syntaxHighlighter}
          // // CSSの擬似要素を使ってファイル名を表示させるため
          // fileName={fileName}
        >
          {code.props.children[0]}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <MainLayout>
      <ChapterDetailHeader
        title={props.chapter.title}
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
                    setModalView('CURRICULUM_EDIT_MODAL');
                    openModal();
                  }}
                />
                <DeleteButton
                  onClick={() => {
                    setModalView('CURRICULUM_DELETE_MODAL');
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
                  <div className={s.markdown}>
                    <ReactMarkdown components={markdownComponents}>{props.chapter.content}</ReactMarkdown>
                  </div>
                </CurriculumContents>
                <CurriculumContentsTitle>
                  Homework
                  <hr />
                </CurriculumContentsTitle>
                <div className={s.markdown}>
                  <ReactMarkdown components={markdownComponents}>{props.chapter.homework}</ReactMarkdown>
                </div>
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
                  <FlatCard height='auto'>
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
    </MainLayout>
  );
}
