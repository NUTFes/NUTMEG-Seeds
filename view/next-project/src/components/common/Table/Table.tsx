import React, { FC } from 'react';
import s from './Table.module.css';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface Column {
  name: ReactNode;
  selector: (row: any) => string;
  sortable: boolean;
  style?: any;
}

interface TableContentProps {
  columns: Column[];
  data: any;
  route: 'records' | 'categories' | 'skills' | 'curriculums';
}

const CUSTOM_STYLES = {
  headCells: {
    style: {
      fontSize: '14px',
      justifyContent: 'center',
    },
  },
  cells: {
    style: {
      justifyContent: 'center',
      padding: '25px',
    },
  },
  headRow: {
    style: {
      borderBottomWidth: '1px',
      borderBottomColor: '#000',
    },
  },
  rows: {
    highlightOnHoverStyle: {
      transform: 'translateY(-1px)',
      backgroundColor: 'white',
      boxShadow: '5px 5px 14px #f0f0f0, -5px -5px 14px #fafafa',
      transition: 'all 0.2s ease-in-out',
    },
  },
};

const Table: FC<TableContentProps> = (props) => {
  const router = useRouter();

  return (
    <DataTable
      columns={props.columns}
      data={props.data}
      pagination
      highlightOnHover
      pointerOnHover
      onRowClicked={(row) => {
        if (row.curriculum) router.push(`/${props.route}/${row.curriculum.id}`);
        else router.push(`/${props.route}/${row.id}`);
      }}
      customStyles={CUSTOM_STYLES}
    />
  );
};

export default Table;
