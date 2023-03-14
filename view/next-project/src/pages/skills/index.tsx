import React from 'react';
import { get } from '@utils/api_methods';
import { useState } from 'react';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import Table from '@components/common/Table';
import ListHeader from '@components/common/ListHeader';
import { SKILL_COLUMNS } from 'src/constants/tableColumns';

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

  return(
    <>
      <MainLayout>
        <ListHeader title='Skills' newSkills={skills} setNewSkills={setSkills}/>
        <FlatCard>
          <Table route='skills' columns={SKILL_COLUMNS} data={skills} />
        </FlatCard>
      </MainLayout>
    </>
  )
}

export default Skills;
