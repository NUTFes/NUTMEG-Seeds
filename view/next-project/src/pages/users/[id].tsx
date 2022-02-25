import React from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import styled from 'styled-components';
import HeaderLogo from '@components/icons/HeaderLogo';
import SlackIcon from '@components/icons/SlackIcon';
import GithubIcon from '@components/icons/GithubIcon';
import BackButton from '@components/common/BackButton';
import Row from '@components/layout/RowLayout'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  user: User;
  user_detail: UserDetail;
  projects: Project[];
  records: Record[];
  skills: Skill[];
};

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
  name: string;
  role: string;
};

interface Record {
  title: string;
  teacher: Teacher;
};

interface Teacher {
  name: string;
}

interface Skill {
  id: number;
  name: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const getUrl = 'http://seeds_api:3000/api/v1/users';
  const json = await get(getUrl);

  let userId: {id: number};
  const userIds: {id: number}[] = [];

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
  const getUrl = 'http://seeds_api:3000/api/v1/get_user_with_detail_and_project_and_role_and_record/' + params.id
  const getRes = await get(getUrl)
  return {
    props: {
      user: getRes[0].user,
    },
  };
}

export default function Users(props: Props) {
  const user = props.user
  const detail = props.user_detail
  const projects = props.projects
  const records = props.records
  const skills = props.skills
  console.log(user)
  return (
    <MainLayout>
      <BackButton />
      <FlatCard align="center" justify="">
        <Row>
          {user.name}
        </Row>
      </FlatCard>
    </MainLayout>
  );
}
