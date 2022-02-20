import { useState } from 'react';
import Router from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import Table from '@components/common/Table';

type Curriculum = {
  id: number;
  title: string;
  content: string;
  homework: string;
  skill_id: number;
  created_at: string;
  updated_at: string;
};

type Props = {
  curriculums: Curriculum[];
};

export async function getStaticProps() {
  const getUrl = 'http://seeds_api:3000/curriculums';
  const json = await get(getUrl);
  return {
    props: {
      curriculums: json,
    },
  };
}

export default function CurriculumList(props: Props) {
  const headers = ['Title', 'Skill', 'Content', 'Date']
  const formatDate = (date: string) => {
    let datetime = date.replace('T', ' ')
    const datetime2 = datetime.substring(0, datetime.length - 5);
    return datetime2
  } 
  return (
    <>
      <MainLayout>
        <FlatCard>
          <Table headers={headers}>
            {props.curriculums.map((curriculum) => (
              <tr key={curriculum.toString()} onClick={() => Router.push('/example')}>
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
  )
}
