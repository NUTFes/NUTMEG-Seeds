import React, { useEffect } from 'react';
import Router from 'next/router';
import { get } from '@utils/api_methods';
import { formatDate } from '@utils/format_date';
import { useState } from 'react';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import Table from '@components/common/Table';
import ListHeader from '@components/common/ListHeader';
import reactMarkdown from 'react-markdown';

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
  const headers = ['Name', 'Date'];
  return (
    <>
      <MainLayout>
        <ListHeader title='Categories' newCategories={categories} setNewCategories={setCategories} />
        <FlatCard>
          <Table headers={headers}>
            {categories.map((category) => (
              <tr key={category.id} onClick={() => Router.push('/categories/' + category.id)}>
                <td>{category.name}</td>
                <td>{formatDate(category.created_at)}</td>
              </tr>
            ))}
          </Table>
        </FlatCard>
      </MainLayout>
    </>
  );
};

export default Categories;
