import React from 'react';
import Router from 'next/router';
import { get } from '@utils/api_methods';
import { formatDate } from '@utils/format_date';
import { useState } from 'react';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import Table from '@components/common/Table';
import ListHeader from '@components/common/ListHeader';

type Skill = {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  created_at: string;
}

type Props = {
  skills: Skill[];
}

export const getServerSideProps = async() => {
  const getUrl = process.env.SSR_API_URI + '/api/v1/get_skills_for_index';
  const json = await get(getUrl);
  return {
    props: {
      skills: json,
    },
  };
}

const Skills: React.VFC<Props> = (props) => {
  const [skills, setSkills] = useState<Skill[]>(props.skills)
  const headers = ['Name', 'Category', 'Date'];
  return(
    <>
      <MainLayout>
        <ListHeader title='Skills' setRecords={setSkills}/>
        <FlatCard>
          <Table headers={headers}>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.category_name}</td>
                <td>{formatDate(skill.created_at)}</td>
              </tr>
            ))}
          </Table>
        </FlatCard>
      </MainLayout>
    </>
  )
}

export default Skills;
