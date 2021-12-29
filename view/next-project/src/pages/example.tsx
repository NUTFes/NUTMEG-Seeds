import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
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

const Example: FC<Props> = (props) => {
  return (
    <MainLayout>
      <GlassCard width={'1000px'} height={'1000px'}>
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
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('http://seeds_api:3000/curriculums');
  const json = await res.json();
  console.log(json);

  return {
    props: {
      curriculums: json,
    },
  };
};

export default Example;
