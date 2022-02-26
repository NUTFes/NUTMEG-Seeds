import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import SlackIcon from '@components/icons/SlackIcon';
import GithubIcon from '@components/icons/GithubIcon';
import BackButton from '@components/common/BackButton';
import AddButton from '@components/common/AddButton';
import CardHeader from '@components/common/CardHeader';
import SkillAddModal from '@components/common/UserSkillAddModal';
import ProjectAddModal from '@components/common/UserProjectAddModal';
import RecordAddModal from '@components/common/UserRecordAddModal';
import Column from '@components/common/Column';
import Row from '@components/layout/RowLayout';
import { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
  user: User;
  detail: UserDetail;
  projects: Project[];
  records: Record[];
  skills: Skill[];
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserDetail {
  grade: string;
  department: string;
  bureau: string;
  icon_name: string;
  github: string;
  slack: string;
  biography: string;
  pc_name: string;
  pc_os: string;
  pc_cpu: string;
  pc_ram: string;
  pc_storage: string;
}

interface Project {
  id: number;
  project: string;
  role: string;
}

interface Record {
  title: string;
  teacher: Teacher;
}

interface Teacher {
  name: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const getUrl = 'http://seeds_api:3000/api/v1/users';
  const json = await get(getUrl);

  let userId: { id: number };
  const userIds: { id: number }[] = [];

  json.map((user: any) => {
    userId = { id: user.id };
    userIds.push(userId);
  });

  return {
    paths: userIds.map((user) => {
      return {
        params: { id: user.id.toString() },
      };
    }),
    fallback: false,
  };
};

export async function getStaticProps({ params }: any) {
  const getUrl = 'http://seeds_api:3000/api/v1/get_user_with_detail_and_project_and_role_and_record/' + params.id;
  const getRes = await get(getUrl);
  return {
    props: {
      user: getRes[0].user,
      detail: getRes[0].detail,
      projects: getRes[0].projects,
      records: getRes[0].records,
      skills: getRes[0].skills,
    },
  };
}

export default function Users(props: Props) {
  const user = props.user;
  const detail = props.detail;
  const projects = props.projects;
  const records = props.records;
  const skills = props.skills;
  console.log(records);

  const [isOpenSkillAddModal, setIsOpenSkillAddModal] = useState(false);
  const [isOpenProjectAddModal, setIsOpenProjectAddModal] = useState(false);
  const [isOpenRecordAddModal, setIsOpenRecordAddModal] = useState(false);

  const openSkillAddModal = (isSkillOpenAddModal: boolean) => {
    if (isOpenSkillAddModal) {
      return (
        <>
          <SkillAddModal isOpen={isOpenSkillAddModal} setIsOpen={setIsOpenSkillAddModal} />
        </>
      );
    }
  };
  const openProjectAddModal = (isProjectOpenAddModal: boolean) => {
    if (isOpenProjectAddModal) {
      return (
        <>
          <ProjectAddModal isOpen={isOpenProjectAddModal} setIsOpen={setIsOpenProjectAddModal} />
        </>
      );
    }
  };
  const openRecordAddModal = (isRecordOpenAddModal: boolean) => {
    if (isOpenRecordAddModal) {
      return (
        <>
          <RecordAddModal isOpen={isOpenRecordAddModal} setIsOpen={setIsOpenRecordAddModal} />
        </>
      );
    }
  };

  return (
    <MainLayout>
      <BackButton />
      <FlatCard align='center' justify=''>
        <Row gap={'0'}>
          <Column>
            <Row>
              <img src='/99a.png' />
            </Row>
            <div>
              <h1>{user.name}</h1>
            </div>
            <table>
              <tr>
                <th>{user.email}</th>
              </tr>
              <tr>
                <th>{detail.grade}</th>
              </tr>
              <tr>
                <th>{detail.department}</th>
              </tr>
              <tr>
                <th>{detail.bureau}</th>
              </tr>
            </table>
          </Column>
          <Column>
            <CardHeader title={'Tech Stack'}>
              <AddButton onClick={() => setIsOpenSkillAddModal(!isOpenSkillAddModal)} />
              {openSkillAddModal(isOpenSkillAddModal)}
            </CardHeader>
            <table>
              {skills.map((skill) => (
                <tr>
                  <th>{skill.name}</th>
                  <td>{skill.category}</td>
                </tr>
              ))}
            </table>
            <CardHeader title={'Projects'}>
              <AddButton onClick={() => setIsOpenProjectAddModal(!isOpenProjectAddModal)} />
              {openProjectAddModal(isOpenProjectAddModal)}
            </CardHeader>
            <table>
              {projects.map((project) => (
                <tr>
                  <th>{project.project}</th>
                  <td>{project.role}</td>
                </tr>
              ))}
            </table>
            <CardHeader title={'Records'}>
              <AddButton onClick={() => setIsOpenRecordAddModal(!isOpenRecordAddModal)} />
              {openRecordAddModal(isOpenRecordAddModal)}
            </CardHeader>
            <table>
              {records.map((record) => (
                <tr>
                  <th>{record.title}</th>
                  <td>{record.teacher.name}</td>
                </tr>
              ))}
            </table>
          </Column>
        </Row>
      </FlatCard>
    </MainLayout>
  );
}
