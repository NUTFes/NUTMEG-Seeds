import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import SlackIcon from '@components/icons/SlackIcon';
import GithubIcon from '@components/icons/GithubIcon';
import BackButton from '@components/common/BackButton';
import AddButton from '@components/common/AddButton';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import IconButton from '@components/common/IconButton';
import CardHeader from '@components/common/CardHeader';
import SkillAddModal from '@components/common/UserSkillAddModal';
import ProjectAddModal from '@components/common/UserProjectAddModal';
import RecordAddModal from '@components/common/UserRecordAddModal';
import EditModal from '@components/common/UserEditModal';
import DeleteUserModal from '@components/common/UserDeleteModal';
import Column from '@components/common/Column';
import Row from '@components/layout/RowLayout';
import { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
  user: User;
  detail: UserDetail;
  projects: User[];
  records: Record[];
  skills: Skill[];
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Grade {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

interface Bureau {
  id: string;
  name: string;
}

interface UserDetail {
  grade: Grade;
  department: Department;
  bureau: Bureau;
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

interface User {
  id: number;
  project: string;
  role: string;
}

interface Record {
  id: string;
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

export async function getServerSideProps({ params }: any) {
  console.log(params)
  const getUrl = process.env.SSR_API_URI + '/api/v1/get_user_for_member_page/' + params.id;
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
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState(false);

  const openSkillAddModal = (isOpenSkillAddModal: boolean) => {
    if (isOpenSkillAddModal) {
      return (
        <>
          <SkillAddModal isOpen={isOpenSkillAddModal} setIsOpen={setIsOpenSkillAddModal} />
        </>
      );
    }
  };
  const openProjectAddModal = (isOpenProjectAddModal: boolean) => {
    if (isOpenProjectAddModal) {
      return (
        <>
          <ProjectAddModal isOpen={isOpenProjectAddModal} setIsOpen={setIsOpenProjectAddModal} />
        </>
      );
    }
  };
  const openRecordAddModal = (isOpenRecordAddModal: boolean) => {
    if (isOpenRecordAddModal) {
      return (
        <>
          <RecordAddModal isOpen={isOpenRecordAddModal} setIsOpen={setIsOpenRecordAddModal} />
        </>
      );
    }
  };
  const openEditModal = (isOpenEditModal: boolean, detail: UserDetail) => {
    if (isOpenEditModal) {
      return (
        <>
          <EditModal isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal} userDetaiInfo={detail} />
        </>
      );
    }
  };
  const openDeleteUserModal = (isOpenDeleteUserModal: boolean) => {
    if (isOpenDeleteUserModal) {
      return (
        <>
          <DeleteUserModal isOpen={isOpenDeleteUserModal} setIsOpen={setIsOpenDeleteUserModal} />
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
            <CardHeader title={user.name}>
              <IconButton onClick={() => window.open(detail.github, '_blank')}>
                <GithubIcon height={30} width={30} />
              </IconButton>
              <IconButton onClick={() => window.open(detail.slack, '_blank')}>
                <SlackIcon height={45} width={45} />
              </IconButton>
              <EditButton onClick={() => setIsOpenEditModal(!isOpenEditModal)} />
              {openEditModal(isOpenEditModal, detail)}
            </CardHeader>
            <table>
              <tr>
                <th>{user.email}</th>
              </tr>
              <tr>
                <th>{detail.grade.name}</th>
              </tr>
              <tr>
                <th>{detail.department.name}</th>
              </tr>
              <tr>
                <th>{detail.bureau.name}</th>
              </tr>
              <tr>
                <th>{detail.biography}</th>
              </tr>
            </table>
          </Column>
          <Column>
            <CardHeader subtitle={'Tech Stack'}>
              <AddButton onClick={() => setIsOpenSkillAddModal(!isOpenSkillAddModal)} />
              {openSkillAddModal(isOpenSkillAddModal)}
            </CardHeader>
            <table>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <th>{skill.name}</th>
                  <td>{skill.category}</td>
                </tr>
              ))}
            </table>
            <CardHeader subtitle={'Projects'}>
              <AddButton onClick={() => setIsOpenProjectAddModal(!isOpenProjectAddModal)} />
              {openProjectAddModal(isOpenProjectAddModal)}
            </CardHeader>
            <table>
              {projects.map((project) => (
                <tr key={project.id}>
                  <th>{project.project}</th>
                  <td>{project.role}</td>
                </tr>
              ))}
            </table>
            <CardHeader subtitle={'Records'}>
              <AddButton onClick={() => setIsOpenRecordAddModal(!isOpenRecordAddModal)} />
              {openRecordAddModal(isOpenRecordAddModal)}
            </CardHeader>
            <table>
              {records.map((record) => (
                <tr key={record.id}>
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
