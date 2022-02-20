import React, { FC } from 'react';
import s from './Table.module.css';

interface TableContentProps {
  headers: string[];
  children: any;
}

const Table: FC<TableContentProps> = (props) => {
  return (
    <>
      <table className={ s.tableContainer }>
        <thead>
          {props.headers.map((header) => (
            <th>
              { header }
            </th>
          ))}
        </thead>
        <tbody>
          { props.children }
        </tbody>
      </table>
    </>
  )
}

export default Table;
