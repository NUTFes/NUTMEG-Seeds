import React, {useState} from 'react';
import {get} from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import CardHeader from '@components/common/CardHeader';
import AddButton from '@components/common/AddButton';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import HeaderLogo from '@components/icons/HeaderLogo';
import SlackIcon from '@components/icons/SlackIcon';
import GithubIcon from '@components/icons/GithubIcon';
import IconButton from '@components/common/IconButton';
import BackButton from '@components/common/BackButton';
import UserAddModal from '@components/common/ProjectUserAddModal';
import SkillAddModal from '@components/common/ProjectSkillAddModal';
import EditModal from '@components/common/ProjectEditModal';
import DeleteProjectModal from '@components/common/ProjectDeleteModal';
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

export async function getServerSideProps({params}: any) {
  const getUrl = process.env.SSR_API_URI + '/api/v1/get_project_for_view/' + params.id;
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
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteProjectModal, setIsOpenDeleteProjectModal] = useState(false);
  const [skills, setSkills] = useState<Skill[]>(props.skills);
  const [members, setMembers] = useState<Member[]>(props.members);
  const openUserAddModal = (isUserOpenAddModal: boolean) => {
    if (isOpenUserAddModal) {
      return (
        <>
          <UserAddModal isOpen={isOpenUserAddModal} setIsOpen={setIsOpenUserAddModal} setMembers={setMembers}
                        members={members}/>
        </>
      );
    }
  };
  const openSkillAddModal = (isSkillOpenAddModal: boolean) => {
    if (isOpenSkillAddModal) {
      return (
        <>
          <SkillAddModal isOpen={isOpenSkillAddModal} setIsOpen={setIsOpenSkillAddModal} setSkills={setSkills}
                         skills={skills}/>
        </>
      );
    }
  };
  const openEditModal = (isOpenEditModal: boolean) => {
    if (isOpenEditModal) {
      return (
        <>
          <EditModal isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal}/>
        </>
      );
    }
  };
  const openDeleteProjectModal = (isOpenDeleteProjectModal: boolean) => {
    if (isOpenDeleteProjectModal) {
      return (
        <>
          <DeleteProjectModal isOpen={isOpenDeleteProjectModal} setIsOpen={setIsOpenDeleteProjectModal}/>
        </>
      );
    }
  };

  return (
    <MainLayout>
      <BackButton/>
      <FlatCard>
        <Row gap={'0'}>
          <Column align='center'>
            <HeaderLogo height={300} width={300} color={'black'}/>
          </Column>
          <Column>
            <CardHeader title={props.project.name}>
              <IconButton onClick={() => window.open(props.project.github, '_blank')}>
                <GithubIcon height={30} width={30}/>
              </IconButton>
              <IconButton>
                <SlackIcon height={45} width={45}/>
              </IconButton>
            </CardHeader>
            <div>{props.project.detail}</div>
            <CardHeader subtitle={'Skills'}>
              <AddButton onClick={() => setIsOpenSkillAddModal(!isOpenSkillAddModal)}/>
              {openSkillAddModal(isOpenSkillAddModal)}
            </CardHeader>
            <table>
              {skills.map((skill) => (
                <tr key={skill.toString()}>
                  <th>{skill.name}</th>
                  <td>{skill.category}</td>
                </tr>
              ))}
            </table>
            <CardHeader subtitle={'Members'}>
              <AddButton onClick={() => setIsOpenUserAddModal(!isOpenUserAddModal)}/>
              {openUserAddModal(isOpenUserAddModal)}
            </CardHeader>
            <table>
              {members.map((member) => (
                <tr key={member.toString()}>
                  <th>{member.name}</th>
                  <td>{member.role}</td>
                </tr>
              ))}
            </table>
          </Column>
        </Row>
      </FlatCard>
      <Row>
        <EditButton onClick={() => setIsOpenEditModal(!isOpenEditModal)}/>
        {openEditModal(isOpenEditModal)}
        <DeleteButton onClick={() => setIsOpenDeleteProjectModal(!isOpenDeleteProjectModal)}/>
        {openDeleteProjectModal(isOpenDeleteProjectModal)}
      </Row>
    </MainLayout>
  );
}
