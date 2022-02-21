import React from 'react';
import Router from 'next/router';
import { get } from '@utils/api_methods';
import { GetStaticPaths } from 'next';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import styled from 'styled-components';
import HeaderLogo from '@components/icons/HeaderLogo';
import SlackIcon from '@components/icons/SlackIcon';
import GithubIcon from '@components/icons/GithubIcon';
import Button from '@components/common/BackButton';

type PathParam = {
  id: string;
};

type Project = {
  id: number;
  name: string;
  detail: string;
  icon_name: string;
  github: string;
  remark: string;
};

type Props = {
  project: Project[];
};

export const getStaticPaths: GetStaticPaths<PathParam> = async () => {
  const getUrl = 'http://seeds_api:3000/projects';
  const json = await get(getUrl);

  // // ProjectのIDを一覧から取得するための処理
  // peojectのidを格納するための配列
  const projectIds: projectID[] = [];

  // peojectのidを連想配列で格納するための処理
  interface projectID {
    id: number;
  }
  let projectId: projectID;
  json.map((project: Project) => {
    projectId = { id: project.id };
    projectIds.push(projectId);
  });

  return {
    // projectのidの数だけ動的ルーティングする
    paths: projectIds.map((project) => {
      return {
        params: { id: project.id.toString() },
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

  const members: Member[] = [
    {
      id: 1,
      name: '大場雅士',
      role: 'Front End',
    },
    {
      id: 2,
      name: '久々江耀平',
      role: 'Front End',
    },
    {
      id: 3,
      name: '水上涼介',
      role: 'Back End',
    },
    {
      id: 4,
      name: '五十嵐和亜',
      role: 'Back End',
    },
  ];

  const id = params.id;
  const getUrl = 'http://seeds_api:3000/projects/' + id;
  const json = await get(getUrl);
  return {
    props: {
      project: json,
      skills: skills,
      members: members,
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
        <FlatCard width='1100px' height='650px'>
          <SplitParentContainer>
            <ImageContainer>
              <HeaderLogo height={300} width={300} color={'black'} />
            </ImageContainer>
            <ProjectContainer>
              <SplitParentContainer>
                <SplitChildContainer>
                  <ProjectNameContainer>{props.project.name}</ProjectNameContainer>
                </SplitChildContainer>
                <SplitChildContainer>
                  <GithubIcon height={30} width={30} />
                  <SlackIcon height={45} width={45} />
                </SplitChildContainer>
              </SplitParentContainer>
              <ProjectDetail>{props.project.detail}</ProjectDetail>
              <TopicContainer>Skills</TopicContainer>
              <ContentsContainer>
                <table>
                  {props.skills.map((skill) => (
                    <tr key={skill.toString()}>
                      <TableData>
                        <td width='150px'>{skill.name}</td>
                        <td width='150px'>{skill.role}</td>
                      </TableData>
                    </tr>
                  ))}
                </table>
              </ContentsContainer>
              <TopicContainer>Members</TopicContainer>
              <ContentsContainer>
                <table>
                  {props.members.map((member) => (
                    <tr key={member.toString()}>
                      <TableData>
                        <td width='150px'>{member.name}</td>
                        <td width='150px'>{member.role}</td>
                      </TableData>
                    </tr>
                  ))}
                </table>
              </ContentsContainer>
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
