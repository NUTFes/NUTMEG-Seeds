import React, { useState } from 'react';
import { get } from '@utils/api_methods';
import { GetStaticPaths } from 'next';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import CardHeader from '@components/common/CardHeader';
import AddButton from '@components/common/AddButton';
import HeaderLogo from '@components/icons/HeaderLogo';
import SlackIcon from '@components/icons/SlackIcon';
import GithubIcon from '@components/icons/GithubIcon';
import IconButton from '@components/common/IconButton';
import BackButton from '@components/common/BackButton';
import UserAddModal from '@components/common/ProjectUserAddModal';
import SkillAddModal from '@components/common/ProjectSkillAddModal';
import Row from '@components/layout/RowLayout';
import Column from '@components/common/Column';

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

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface Member {
  id: number;
  name: string;
  role: string;
}

type Props = {
  project: Project;
  skills: Skill[];
  members: Member[];
};

export const getStaticPaths: GetStaticPaths<PathParam> = async () => {
  const getUrl = 'http://seeds_api:3000/projects';
  const json = await get(getUrl);

  // // ProjectのIDを一覧から取得するための処理
  // peojectのidを格納するための配列
  let projectId: { id: number };
  const projectIds: { id: number }[] = [];

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
  const getUrl = 'http://seeds_api:3000/api/v1/get_project_for_view/' + params.id;
  const getRes = await get(getUrl);
  return {
    props: {
      project: getRes[0].project,
      skills: getRes[0].skills,
      members: getRes[0].users,
    },
  };
}

export default function Page(props: Props) {
  const [isOpenUserAddModal, setIsOpenUserAddModal] = useState(false);
  const [isOpenSkillAddModal, setIsOpenSkillAddModal] = useState(false);
  const openUserAddModal = (isUserOpenAddModal: boolean) => {
    if (isOpenUserAddModal) {
      return (
        <>
          <UserAddModal isOpen={isOpenUserAddModal} setIsOpen={setIsOpenUserAddModal} />
        </>
      );
    }
  };
  const openSkillAddModal = (isSkillOpenAddModal: boolean) => {
    if (isOpenSkillAddModal) {
      return (
        <>
          <SkillAddModal isOpen={isOpenSkillAddModal} setIsOpen={setIsOpenSkillAddModal} />
        </>
      );
    }
  };

  return (
    <MainLayout>
      <BackButton />
      <FlatCard>
        <Row gap={'0'}>
          <Column align='center'>
            <HeaderLogo height={300} width={300} color={'black'} />
          </Column>
          <Column>
            <CardHeader title={props.project.name}>
              <IconButton onClick={() => window.open(props.project.github, '_blank')}>
                <GithubIcon height={30} width={30} />
              </IconButton>
              <IconButton>
                <SlackIcon height={45} width={45} />
              </IconButton>
            </CardHeader>
            <div>{props.project.detail}</div>
            <CardHeader subtitle={'Skills'}>
              <AddButton onClick={() => setIsOpenSkillAddModal(!isOpenSkillAddModal)} />
              {openSkillAddModal(isOpenSkillAddModal)}
            </CardHeader>
            <table>
              {props.skills.map((skill) => (
                <tr key={skill.toString()}>
                  <th>{skill.name}</th>
                  <td>{skill.category}</td>
                </tr>
              ))}
            </table>
            <CardHeader subtitle={'Members'}>
              <AddButton onClick={() => setIsOpenUserAddModal(!isOpenUserAddModal)} />
              {openUserAddModal(isOpenUserAddModal)}
            </CardHeader>
            <table>
              {props.members.map((member) => (
                <tr key={member.toString()}>
                  <th>{member.name}</th>
                  <td>{member.role}</td>
                </tr>
              ))}
            </table>
          </Column>
        </Row>
      </FlatCard>
    </MainLayout>
  );
}
