import React, { useState } from 'react';
import { get, post, put, del } from '@utils/api_methods';
import Row from '@components/layout/RowLayout';
import MainLayout from '@components/layout/MainLayout';
import GlassCard from '@components/common/GlassCard';
import Button from '@components/common/TestButton';
import ProjectAddModal from '@components/common/ProjectAddModal';

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
  const getUrl = process.env.SSR_API_URI + '/curriculums';
  const json = await get(getUrl);
  return {
    props: {
      curriculums: json,
    },
  };
}

export async function postCurriculum() {
  const postUrl = 'http://localhost:3000/curriculums';
  const postData = { title: 'Rust勉強', content: '未定', homework: '未定', skill_id: 1 };
  const getRes = await get(postUrl);
  console.log(getRes.slice(-1)[0].id);
  const postReq = await post(postUrl, postData);
}

export async function putCurriculum() {
  const Url = 'http://localhost:3000/curriculums';
  const getRes = await get(Url);
  const putUrl = Url + '/' + getRes.slice(-1)[0].id;
  const putData = {
    title: 'Rust勉強会',
    content: 'Rustとwasbによるフロントエンド実装',
    homework: 'ソート',
    skill_id: 1,
  };
  console.log(getRes.slice(-1)[0].id);
  const putReq = await put(putUrl, putData);
}

export async function deleteCurriculum() {
  const Url = 'http://localhost:3000/curriculums';
  const getRes = await get(Url);
  const delUrl = Url + '/' + getRes.slice(-1)[0].id;
  console.log(getRes.slice(-1)[0].id);
  const delReq = await del(delUrl);
}

export default function Example(props: Props) {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const AddModal = (isOpenAddModal: boolean) => {
    if (isOpenAddModal) {
      return (
        <>
          <ProjectAddModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
        </>
      );
    }
  };
  return (
    <>
      <MainLayout>
        <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)}>open</Button>
        {AddModal(isOpenAddModal)}
        <Row>
          <Button onClick={postCurriculum}>POST</Button>
          <Button onClick={putCurriculum}>PUT</Button>
          <Button onClick={deleteCurriculum}>DELETE</Button>
        </Row>
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
    </>
  );
}
