import { get } from '@utils/api_methods';
import { useState } from 'react';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import Table from '@components/common/Table';
import ListHeader from '@components/common/ListHeader';
import { RECORD_COLUMNS } from 'src/constants/tableColumns';

type Record = {
  id: number;
  title: string;
  user_id: string;
  user_name: string;
  teacher_id: string;
  teacher_name: string;
  curriculum_id: number;
  curriculum_title: string;
  skills: { name: string }[];
  created_at: string;
  updated_at: string;
};

type Props = {
  records: Record[];
};

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI + '/api/v1/get_records_for_index';
  const json = await get(getUrl);
  return {
    props: {
      records: json,
    },
  };
};

export default function RecordList(props: Props) {
  const [records, setRecords] = useState<Record[]>(props.records);

  return (
    <>
      <MainLayout>
        <ListHeader title='Records' setRecords={setRecords} />
        <FlatCard>
          <Table columns={RECORD_COLUMNS} data={records} route='records' />
        </FlatCard>
      </MainLayout>
    </>
  );
}
