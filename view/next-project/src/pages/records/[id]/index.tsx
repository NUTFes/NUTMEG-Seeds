import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import RecordDetailHeader from '@components/common/RecordDetailHeader';
import s from './index.module.css';
import Button from '@components/common/BackButton';
import Row from '@components/layout/RowLayout';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import RecordEditModal from '@components/common/RecordEditModal';
import RecordDeleteModal from '@components/common/RecordDeleteModal';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 任意のテーマをimport
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Curriculum {
  id: number;
  title: string;
  content: string;
  homework: string;
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
  user_id: number;
  curriculum_id: number;
  created_at: string;
  updated_at: string;
}

interface Skill {
  id: number;
  name: string;
}

interface Props {
  curriculum: Curriculum;
  chapter: Chapter;
  record: Record;
  teacher: string;
  user: string;
  skills: Skill[];
}

export async function getServerSideProps({ params }: any) {
  const id = params.id;
  const getRecordUrl = process.env.SSR_API_URI + '/api/v1/get_record_for_view/' + id;
  const getRes = await get(getRecordUrl);
  return {
    props: getRes,
  };
}

export default function Page(props: Props) {
  const formatDate = (date: string) => {
    let datetime = date.replace('T', ' ');
    const datetime2 = datetime.substring(0, datetime.length - 5);
    return datetime2;
  };

  const [isOpenEditRecordModal, setIsOpenEditRecordModal] = useState(false);
  const [isOpenDeleteRecordModal, setIsOpenDeleteRecordModal] = useState(false);
  const openEditRecordModal = (isOpenEditRecordModal: boolean) => {
    if (isOpenEditRecordModal) {
      return (
        <>
          <RecordEditModal isOpen={isOpenEditRecordModal} setIsOpen={setIsOpenEditRecordModal} />
        </>
      );
    }
  };
  const openDeleteRecordModal = (isOpenDeleteRecordModal: boolean) => {
    if (isOpenDeleteRecordModal) {
      return (
        <>
          <RecordDeleteModal isOpen={isOpenDeleteRecordModal} setIsOpen={setIsOpenDeleteRecordModal} />
        </>
      );
    }
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
      <div className={s.parentButton}>
        <RecordDetailHeader
          recordTitle={props.record.title}
          createDate={formatDate(props.record.created_at)}
          updateDate={formatDate(props.record.updated_at)}
          curriculumTitle={props.curriculum?.title}
          chapterTitle={props.chapter?.title}
          skill={props?.skills}
          user={props.user}
          teacher={props.teacher}
        />
        <FlatCard width='100%'>
          <Row gap='3rem' justify='end'>
            <EditButton onClick={() => setIsOpenEditRecordModal(!isOpenEditRecordModal)} />
            {openEditRecordModal(isOpenEditRecordModal)}
            <DeleteButton onClick={() => setIsOpenDeleteRecordModal(!isOpenDeleteRecordModal)} />
            {openDeleteRecordModal(isOpenDeleteRecordModal)}
          </Row>
          <div className={s.recordContentsContainer}>
            <div className={s.contentsTitle}>Contents</div>
            <div className={s.markdown}>
              <ReactMarkdown components={markdownComponents}>{props.record.content}</ReactMarkdown>
            </div>
          </div>
          <div className={s.homeworkContentsContainer}>
            <div className={s.contentsTitle}>Homework</div>
            <div className={s.homeworkContents}>
              <ReactMarkdown components={markdownComponents}>{props.record.homework}</ReactMarkdown>
            </div>
          </div>
        </FlatCard>
        <div className={s.childButton}>
          <Button />
        </div>
      </div>
    </MainLayout>
  );
}
