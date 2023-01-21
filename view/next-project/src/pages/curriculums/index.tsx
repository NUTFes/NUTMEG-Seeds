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
  created_at: string;
  updated_at: string;
}

interface Skill {
  name: string;
}
interface Chapter {
  title: string;
  content: string;
  homework: string;
  curriculum_id: number;
}

interface CurriculumWithSkill {
  curriculum: Curriculum;
  skills: Skill[];
}

interface CurriculumWithChapter {
  curriculum: Curriculum;
  chapters: Chapter[];
}

interface Props {
  curriculumsWithSkill: CurriculumWithSkill[];
  curriculumsWithChapter: CurriculumWithChapter[];
  skills: Skill[];
  chapters: Chapter[];
}

export async function getServerSideProps() {
  const getCurriculumsUrl = process.env.SSR_API_URI + '/api/v1/get_curriculums_for_index';
  const getCurriculumsChapterUrl = process.env.SSR_API_URI + '/api/v1/get_curriculums_chapter_for_index';
  const getSkillsUrl = process.env.SSR_API_URI + '/skills';
  const getChaptersUrl = process.env.SSR_API_URI + '/chapters';
  const curriculumsJson = await get(getCurriculumsUrl);
  const curriculumsChapterJson = await get(getCurriculumsChapterUrl);
  const skillsJson = await get(getSkillsUrl);
  const chaptersJson = await get(getChaptersUrl);
  return {
    props: {
      curriculumsWithSkill: curriculumsJson,
      curriculumsWithChapter: curriculumsChapterJson,
      skills: skillsJson,
      chapters: chaptersJson,
    },
  };
}

export default function CurriculumList(props: Props) {
  const headers = ['Title', 'Skill', 'Date'];

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
            {props.curriculumsWithSkill.map((data: CurriculumWithSkill) => (
              <tr key={data.toString()} onClick={() => Router.push('/curriculums/' + data.curriculum.id)}>
                <td>{data.curriculum.title}</td>
                <td>
                  {data.skills.map((skill: Skill) => {
                    return(<><span>{skill.name}</span><br/></>);
                  })}
                </td>
                <td>{formatDate(data.curriculum.created_at)}</td>
              </tr>
            ))}
          </Table>
        </FlatCard>
      </MainLayout>
    </>
  );
}
