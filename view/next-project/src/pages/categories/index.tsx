import React from 'react';
import { get } from '@utils/api_methods';
import { useState } from 'react';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import Table from '@components/common/Table';
import ListHeader from '@components/common/ListHeader';
import { CATEGORY_COLUMNS } from 'src/constants/tableColumns';

type Category = {
  id: number;
  name: string;
  detail: string;
  category_name: string;
  created_at: string;
};

type Props = {
  categories: Category[];
};

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI + '/categories';
  const json = await get(getUrl);
  return {
    props: {
      categories: json,
    },
  };
};

const Categories: React.VFC<Props> = (props) => {
  const [categories, setCategories] = useState<Category[]>(props.categories);

  return (
    <>
      <MainLayout>
        <ListHeader title='Categories' newCategories={categories} setNewCategories={setCategories} />
        <FlatCard>
          <Table route='categories' columns={CATEGORY_COLUMNS} data={categories} />
        </FlatCard>
      </MainLayout>
    </>
  );
};

export default Categories;
