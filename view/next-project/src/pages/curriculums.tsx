import { useState } from 'react';
import Router from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import ListHeader from '@components/common/ListHeader';
import FlatCard from '@components/common/FlatCard';
import Table from '@components/common/Table';

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
  curriculums: Curriculum[];
  skills: Skill[];
}

export async function getServerSideProps() {
  const getCurriculumsUrl = 'http://seeds_api:3000/curriculums';
  const getSkillsUrl = 'http://seeds_api:3000/skills';
  const curriculumsJson = await get(getCurriculumsUrl);
  const skillsJson = await get(getSkillsUrl);
  return {
    props: {
      curriculums: curriculumsJson,
      skills: skillsJson,
    },
  };
}

export default function CurriculumList(props: Props) {
  const headers = ['Title', 'Skill', 'Content', 'Date'];
  const formatDate = (date: string) => {
    let datetime = date.replace('T', ' ');
    const datetime2 = datetime.substring(0, datetime.length - 5);
    return datetime2;
  };
  return (
    <>
      <MainLayout>
        <ListHeader title='Curriculum' />
        <FlatCard width='100%'>
          <Table headers={headers}>
            {props.curriculums.map((curriculum) => (
              <tr key={curriculum.toString()} onClick={() => Router.push('/curriculums/' + curriculum.id)}>
                <td>{curriculum.title}</td>
                <td>{curriculum.skill_id}</td>
                <td>{curriculum.content}</td>
                <td>{formatDate(curriculum.created_at)}</td>
              </tr>
            ))}
          </Table>
        </FlatCard>
      </MainLayout>
    </>
  );
}
