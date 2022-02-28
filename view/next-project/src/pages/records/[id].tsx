import React from 'react';
import {get} from '@utils/api_methods';
import {GetStaticPaths} from 'next';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import RecordDetailHeader from '@components/common/RecordDetailHeader';
import styled from 'styled-components';
import Button from '@components/common/BackButton';

interface PathParam {
  id: string;
}

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

export const getStaticPaths = async () => {
  const getUrl = 'http://seeds_api:3000/records';
  const json = await get(getUrl);

  // // RecordのIDを一覧から取得するための処理
  // Recordのidを格納するための配列
  const recordIds: recordID[] = [];

  // Recordのidを連想配列で格納するための処理
  interface recordID {
    id: number;
  }

  let recordId: recordID;
  json.map((record: Record) => {
    recordId = {id: record.id};
    recordIds.push(recordId);
  });

  return {
    // curriculumのidの数だけ動的ルーティングする
    paths: recordIds.map((record) => {
      return {
        params: {id: record.id.toString()},
      };
    }),
    // paramsに存在しないroutesが指定されたら404を返す
    fallback: false,
  };
};

export async function getStaticProps({params}: any) {
  const id = params.id;
  const getRecordUrl = 'http://seeds_api:3000/api/v1/record/' + id;
  const recordJson = await get(getRecordUrl);
  return {
    props: recordJson,
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

  return (
    <MainLayout>
      <ParentButtonContainer>
        <RecordDetailHeader recordTitle={props.record.title} createDate={formatDate(props.record.created_at)}
                            updateDate={formatDate(props.record.updated_at)}
                            curriculumTitle={props.curriculum.title}
                            skill={props.skill}
                            user={props.user}
                            teacher={props.teacher}/>
        <FlatCard width='100%'>
          <RecordContentsContainer>
            <RecordContentsTitle>
              Contents
              <hr/>
            </RecordContentsTitle>
            <RecordContents>{props.record.content}</RecordContents>
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
