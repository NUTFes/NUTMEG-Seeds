import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import SkillDetailHeader from '@components/common/SkillDetailHeader';
import styled from 'styled-components';
import Button from '@components/common/BackButton';
import Row from '@components/layout/RowLayout';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import CategoryEditModal from '@components/common/CategoryEditModal';
import CategoryDeleteModal from '@components/common/CategoryDeleteModal';

interface Props {
  name: string;
  detail: string;
}

export async function getServerSideProps({ params }: any) {
  const id = params.id;
  const getCategoryUrl = process.env.SSR_API_URI + '/categories/' + id;
  const getRes = await get(getCategoryUrl);
  return {
    props: getRes,
  };
}

export default function Page(props: Props) {
  const CategoryContentsContainer = styled.div`
    width: 100%;
  `;
  const CategoryContentsTitle = styled.div`
    font-size: 2.8rem;
    padding-bottom: 1.2rem;
  `;
  const CategoryContents = styled.div`
    font-size: 1.6rem;
    padding-bottom: 3rem;
  `;
  const ParentButtonContainer = styled.div`
    position: relative;
    width: 100%;
  `;
  const ChildButtonContainer = styled.div`
    position: absolute;
    bottom: 50px;
    left: -40px;
  `;

  const formatDate = (date: string) => {
    let datetime = date.replace('T', ' ');
    const datetime2 = datetime.substring(0, datetime.length - 5);
    return datetime2;
  };

  const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] = useState(false);
  const [isOpenDeleteCategoryModal, setIsOpenDeleteCategoryModal] = useState(false);
  const [categoryDetail, setCategoryDetail] = useState<Props>(props);

  const openEditCategoryModal = (isOpenEditCategoryModal: boolean) => {
    if (isOpenEditCategoryModal) {
      return (
        <>
          <CategoryEditModal
            isOpen={isOpenEditCategoryModal}
            setIsOpen={setIsOpenEditCategoryModal}
            category={categoryDetail}
            setCategoryDetail={setCategoryDetail}
          />
        </>
      );
    }
  };
  const openDeleteCategoryModal = (isOpenDeleteCategoryModal: boolean) => {
    if (isOpenDeleteCategoryModal) {
      return (
        <>
          <CategoryDeleteModal isOpen={isOpenDeleteCategoryModal} setIsOpen={setIsOpenDeleteCategoryModal} />
        </>
      );
    }
  };

  return (
    <MainLayout>
      <ParentButtonContainer>
        <SkillDetailHeader skillName={categoryDetail.name} />
        <FlatCard width='100%'>
          <Row gap='3rem' justify='end'>
            <EditButton onClick={() => setIsOpenEditCategoryModal(!isOpenEditCategoryModal)} />
            {openEditCategoryModal(isOpenEditCategoryModal)}
            <DeleteButton onClick={() => setIsOpenDeleteCategoryModal(!isOpenDeleteCategoryModal)} />
            {openDeleteCategoryModal(isOpenDeleteCategoryModal)}
          </Row>
          <CategoryContentsContainer>
            <CategoryContentsTitle>
              Detail
              <hr />
            </CategoryContentsTitle>
            <CategoryContents>{categoryDetail.detail}</CategoryContents>
          </CategoryContentsContainer>
        </FlatCard>
        <ChildButtonContainer>
          <Button />
        </ChildButtonContainer>
      </ParentButtonContainer>
    </MainLayout>
  );
}
