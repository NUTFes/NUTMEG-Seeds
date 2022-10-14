import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import RecordDetailHeader from '@components/common/RecordDetailHeader';
import styled from 'styled-components';
import s from './index.module.css';
import Button from '@components/common/BackButton';
import Row from '@components/layout/RowLayout';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import RecordEditModal from '@components/common/RecordEditModal';
import RecordDeleteModal from '@components/common/RecordDeleteModal';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { marked } from 'marked';
import highlight from 'highlight.js';
import 'highlightjs/styles/docco.css';

interface Curriculum {
  id: number;
  title: string;
  content: string;
  homework: string;
  skill_id: number;
  created_at: string;
  updated_at: string;
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

interface Props {
  curriculum: Curriculum;
  record: Record;
  teacher: string;
  user: string;
  skill: string;
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
  marked.setOptions({
    highlight: function (code, lang) {
      return highlight.highlightAuto(code, [lang.split(':')[0]]).value;
    },
  });

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

  return (
    <MainLayout>
      <div className={s.parentButton}>
        <RecordDetailHeader
          recordTitle={props.record.title}
          createDate={formatDate(props.record.created_at)}
          updateDate={formatDate(props.record.updated_at)}
          curriculumTitle={props.curriculum.title}
          skill={props.skill}
          user={props.user}
          teacher={props.teacher}
        />
        <FlatCard width='100%'>
          {/* <SimpleMde value={props.record.content} onChange={onChange} /> */}
          <Row gap='3rem' justify='end'>
            <EditButton onClick={() => setIsOpenEditRecordModal(!isOpenEditRecordModal)} />
            {openEditRecordModal(isOpenEditRecordModal)}
            <DeleteButton onClick={() => setIsOpenDeleteRecordModal(!isOpenDeleteRecordModal)} />
            {openDeleteRecordModal(isOpenDeleteRecordModal)}
          </Row>
          <div className={s.recordContentsContainer}>
            <div className={s.recordContentsTitle}>
              Contents
              <hr />
            </div>
            <div className={s.markdown}>
              <div dangerouslySetInnerHTML={{ __html: marked(props.record.content) }} />
            </div>
            <div className={s.recordContentsTitle}>
              Homework
              <hr />
            </div>
            <div className={s.recordContents}>{props.record.homework}</div>
          </div>
        </FlatCard>
        <div className={s.childButton}>
          <Button />
        </div>
      </div>
    </MainLayout>
  );
}
