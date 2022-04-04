import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {get} from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import RecordDetailHeader from '@components/common/RecordDetailHeader';
import styled from 'styled-components';
import Button from '@components/common/BackButton';
import Row from '@components/layout/RowLayout';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import RecordEditModal from "@components/common/RecordEditModal";
import RecordDeleteModal from "@components/common/RecordDeleteModal";

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

export async function getServerSideProps({params}: any) {
  const id = params.id;
  const getRecordUrl = process.env.SSR_API_URI + '/api/v1/get_record_for_view/' + id;
  const getRes = await get(getRecordUrl);
  return {
    props: getRes,
  };
}

export default function Page(props: Props) {
  const RecordContentsContainer = styled.div`
  width: 100%;
  `;
  const RecordContentsTitle = styled.div`
  font-size: 2.8rem;
  padding-bottom: 1.2rem;
  `;
  const RecordContents = styled.div`
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
          <RecordEditModal isOpen={isOpenEditRecordModal} setIsOpen={setIsOpenEditRecordModal}/>
        </>
      );
    }
  };
  const openDeleteRecordModal = (isOpenDeleteRecordModal: boolean) => {
    if (isOpenDeleteRecordModal) {
      return (
        <>
          <RecordDeleteModal isOpen={isOpenDeleteRecordModal} setIsOpen={setIsOpenDeleteRecordModal}/>
        </>
      );
    }
  };

  return (
    <MainLayout>
      <ParentButtonContainer>
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
          <Row gap="3rem" justify="end">
            <EditButton onClick={() => setIsOpenEditRecordModal(!isOpenEditRecordModal)}/>
            {openEditRecordModal(isOpenEditRecordModal)}
            <DeleteButton onClick={() => setIsOpenDeleteRecordModal(!isOpenDeleteRecordModal)}/>
            {openDeleteRecordModal(isOpenDeleteRecordModal)}
          </Row>
          <RecordContentsContainer>
            <RecordContentsTitle>
              Contents
              <hr/>
            </RecordContentsTitle>
            <RecordContents>
              <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
                {props.record.content}
              </ReactMarkdown>
            </RecordContents>
            <RecordContentsTitle>
              Homework
              <hr/>
            </RecordContentsTitle>
            <RecordContents>{props.record.homework}</RecordContents>
          </RecordContentsContainer>
        </FlatCard>
        <ChildButtonContainer>
          <Button/>
        </ChildButtonContainer>
      </ParentButtonContainer>
    </MainLayout>
  );
}
