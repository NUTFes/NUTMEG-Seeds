import React from 'react';
import Router from 'next/router';
import { get } from '@utils/api_methods';
import { GetStaticPaths } from 'next';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import DetailHeader from '@components/common/DetailHeader';
import styled from 'styled-components';
import HeaderLogo from '@components/icons/HeaderLogo';
import SlackIcon from '@components/icons/SlackIcon';
import GithubIcon from '@components/icons/GithubIcon';
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

interface Skill {
  id: number;
  name: string;
  detail: string;
  category_id: number;
}

interface Props {
  curriculum: Curriculum[];
  skills: Skill[];
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
  interface Skill {
    id: number;
    name: string;
    role: string;
  }

  interface Member {
    id: number;
    name: string;
    role: string;
  }

  const skills: Skill[] = [
    {
      id: 1,
      name: 'Vue.js',
      role: 'Front End',
    },
    {
      id: 2,
      name: 'Ruby on Rails',
      role: 'Back End',
    },
  ];

  const id = params.id;
  const getUrl = 'http://seeds_api:3000/curriculums/' + id;
  const json = await get(getUrl);
  return {
    props: {
      curriculum: json,
      skills: skills,
    },
  };
}

export default function Page(props: Props) {
  const SplitParentContainer = styled.div`
    display: flex;
  `;
  const SplitChildContainer = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: end;
    align-items: center;
  `;
  const ImageContainer = styled.div`
    flex-grow: 1;
    padding: 20px;
  `;
  const ProjectContainer = styled.div`
    padding: 20px;
  `;
  const ProjectNameContainer = styled.div`
    flex-grow: 1;
    font-size: 28px;
    font-weight: bold;
  `;
  const TopicContainer = styled.div`
    font-size: 20px;
    padding-top: 30px;
    padding-bottom: 15px;
  `;
  const ContentsContainer = styled.div`
    font-size: 14px;
    padding: 10px;
    width: 100%
    display: flex;
  `;
  const TableData = styled.div`
    text-align: center;
  `;
  const ProjectDetail = styled.div`
    font-size: 14px;
    padding: 10px 0 0 30px;
  `;
  return (
    <MainLayout>
      <div style={{ position: 'relative' }}>
       <DetailHeader skills={props.skills} curriculum={props.curriculum} />
        <FlatCard width='1100px' height='650px'>
          <SplitParentContainer>
            <ImageContainer>
              <HeaderLogo height={300} width={300} color={'black'} />
            </ImageContainer>
            <ProjectContainer>
              <SplitParentContainer>
                <SplitChildContainer>
                </SplitChildContainer>
                <SplitChildContainer>
                  <GithubIcon height={30} width={30} />
                  <SlackIcon height={45} width={45} />
                </SplitChildContainer>
              </SplitParentContainer>
              <TopicContainer>Skills</TopicContainer>
              <TopicContainer>Members</TopicContainer>
            </ProjectContainer>
          </SplitParentContainer>
        </FlatCard>
        <div style={{ position: 'absolute', bottom: '50px', left: '-40px' }}>
          <Button onClick={() => Router.back()} />
        </div>
      </div>
    </MainLayout>
  );
}
