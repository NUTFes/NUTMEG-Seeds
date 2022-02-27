import React from 'react';
import { get } from '@utils/api_methods';
import { GetStaticPaths } from 'next';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import DetailHeader from '@components/common/DetailHeader';
import styled from 'styled-components';
import Button from '@components/common/BackButton';

type PathParam = {
  id: string;
};

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
  skill: string;
  records: Record[];
}

export const getStaticPaths: GetStaticPaths<PathParam> = async () => {
  const getUrl = 'http://seeds_api:3000/curriculums';
  const json = await get(getUrl);

  // // CurriculumsのIDを一覧から取得するための処理
  // Curriculumのidを格納するための配列
  const curriculumIds: curriculumID[] = [];

  // Curriculumのidを連想配列で格納するための処理
  interface curriculumID {
    id: number;
  }

  let curriculumId: curriculumID;
  json.map((curriculum: Curriculum) => {
    curriculumId = { id: curriculum.id };
    curriculumIds.push(curriculumId);
  });

  return {
    // curriculumのidの数だけ動的ルーティングする
    paths: curriculumIds.map((curriculum) => {
      return {
        params: { id: curriculum.id.toString() },
      };
    }),
    // paramsに存在しないroutesが指定されたら404を返す
    fallback: false,
  };
};

export async function getStaticProps({ params }: any) {
  const id = params.id;
  const getUrl = 'http://seeds_api:3000/api/v1/get_curriculum_for_view/' + id;
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
    width: 80%;
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
            <FlatCard width='100%'>
              <CurriculumContentsContainer>
                <CurriculumContentsTitle>
                  Contents
                  <hr />
                </CurriculumContentsTitle>
                <CurriculumContents>{props.curriculum.content}</CurriculumContents>
                <CurriculumContentsTitle>
                  Homework
                  <hr />
                </CurriculumContentsTitle>
                <CurriculumContents>{props.curriculum.homework}</CurriculumContents>
              </CurriculumContentsContainer>
            </FlatCard>
            <ChildButtonContainer>
              <Button />
            </ChildButtonContainer>
          </SplitLeftContainer>
          <SplitRightContainer>
            {props.records.map((record) => (
              <FlatCard>
                <RecordMember>{record.user_id}</RecordMember>
                <RecordContents>{record.title}</RecordContents>
                <RecordDate>最終更新日: {formatDate(record.updated_at)}</RecordDate>
              </FlatCard>
            ))}
          </SplitRightContainer>
        </SplitParentContainer>
      </ParentButtonContainer>
    </MainLayout>
  );
}
