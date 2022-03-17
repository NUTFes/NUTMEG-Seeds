import Router from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import Table from '@components/common/Table';
import ListHeader from '@components/common/ListHeader';

type Record = {
  id: number;
  title: string;
  content: string;
  homework: string;
  user_id: number;
  curriculum_id: number;
  created_at: string;
  updated_at: string;
};

type Props = {
  records: Record[];
};

export async function getServerSideProps() {
  const getUrl = process.env.SSR_API_URI + '/records';
  const json = await get(getUrl);
  return {
    props: {
      records: json,
    },
  };
}

export default function RecordList(props: Props) {
  const headers = ['Title', 'Content', 'Date'];
  const formatDate = (date: string) => {
    let datetime = date.replace('T', ' ');
    const datetime2 = datetime.substring(0, datetime.length - 5);
    return datetime2;
  };
  return (
    <>
      <MainLayout>
        <ListHeader title='Your Records' />
        <FlatCard>
          <Table headers={headers}>
            {props.records.map((record) => (
              <tr key={record.id} onClick={() => Router.push('/records/' + record.id)}>
                <td>{record.title}</td>
                <td>{record.content}</td>
                <td>{formatDate(record.created_at)}</td>
              </tr>
            ))}
          </Table>
        </FlatCard>
      </MainLayout>
    </>
  );
}