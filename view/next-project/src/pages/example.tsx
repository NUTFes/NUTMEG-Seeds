import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import GlassCard from '@components/common/GlassCard';

type Curriculum = {
  id: number;
  title: string;
  homework: string;
  skill_id: number;
};

type Props = {
  curriculums: Curriculum[];
};

export async function getStaticProps() {
  const url = 'http://seeds_api:3000/curriculums';
  const json = await get(url);

  return {
    props: {
      curriculums: json,
    },
  };
}

export default function Example(props: Props) {
  return (
    <MainLayout>
      <GlassCard align={'center'}>
        <table>
          {props.curriculums.map((curriculum) => (
            <tr key={curriculum.toString()}>
              <td>{curriculum.id}</td>
              <td>{curriculum.title}</td>
            </tr>
          ))}
        </table>
      </GlassCard>
    </MainLayout>
  );
}
