import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import DetailHeader from '@components/common/DetailHeader';
import styled from 'styled-components';
import BackButton from '@components/common/BackButton';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import Row from '@components/layout/RowLayout';
import { useUI } from '@components/ui/context';

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
  user: string;
  curriculum_id: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  curriculum: Curriculum;
  skill: string;
  records: Record[];
}

export async function getServerSideProps({ params }: any) {
  const id = params.id;
  const getUrl = process.env.SSR_API_URI + '/api/v1/get_curriculum_for_view/' + id;
  const json = await get(getUrl);
  return {
    props: json[0],
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

  return (
    <MainLayout>
      <ParentButtonContainer>
        <DetailHeader curriculum={props.curriculum} skill={props.skill} />
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
                  <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
                    {props.curriculum.content}
                  </ReactMarkdown>
                </CurriculumContents>
                <CurriculumContentsTitle>
                  Homework
                  <hr />
                </CurriculumContentsTitle>
                <CurriculumContents>{props.curriculum.homework}</CurriculumContents>
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
