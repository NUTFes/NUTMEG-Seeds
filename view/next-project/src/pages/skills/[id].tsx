import React, { useState } from 'react';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import SkillDetailHeader from '@components/common/SkillDetailHeader';
import styled from 'styled-components';
import Button from '@components/common/BackButton';
import Row from '@components/layout/RowLayout';
import EditButton from '@components/common/EditButton';
import DeleteButton from '@components/common/DeleteButton';
import SkillEditModal from '@components/common/SkillEditModal';
import SkillDeleteModal from '@components/common/SkillDeleteModal';

interface Props {
  name: string;
  detail: string;
  category_name: string;
  type_name: string;
}

export async function getServerSideProps({ params }: any) {
  const id = params.id;
  const getSkillUrl = process.env.SSR_API_URI + '/api/v1/get_skill_for_view/' + id;
  const getRes = await get(getSkillUrl);
  return {
    props: getRes,
  };
}

export default function Page(props: Props) {
  const SkillContentsContainer = styled.div`
    width: 100%;
  `;
  const SkillContentsTitle = styled.div`
    font-size: 2.8rem;
    padding-bottom: 1.2rem;
  `;
  const SkillContents = styled.div`
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

  const [isOpenEditSkillModal, setIsOpenEditSkillModal] = useState(false);
  const [isOpenDeleteSkillModal, setIsOpenDeleteSkillModal] = useState(false);
  const [skillDetail, setSkillDetail] = useState<Props>(props);
  const openEditSkillModal = (isOpenEditSkillModal: boolean) => {
    if (isOpenEditSkillModal) {
      return (
        <>
          <SkillEditModal
            isOpen={isOpenEditSkillModal}
            setIsOpen={setIsOpenEditSkillModal}
            skillCategory={skillDetail}
            setSkillDetail={setSkillDetail}
          />
        </>
      );
    }
  };
  const openDeleteSkillModal = (isOpenDeleteSkillModal: boolean) => {
    if (isOpenDeleteSkillModal) {
      return (
        <>
          <SkillDeleteModal isOpen={isOpenDeleteSkillModal} setIsOpen={setIsOpenDeleteSkillModal} />
        </>
      );
    }
  };

  return (
    <MainLayout>
      <ParentButtonContainer>
        <SkillDetailHeader skillName={skillDetail.name} />
        <FlatCard width='100%'>
          <Row gap='3rem' justify='end'>
            <EditButton onClick={() => setIsOpenEditSkillModal(!isOpenEditSkillModal)} />
            {openEditSkillModal(isOpenEditSkillModal)}
            <DeleteButton onClick={() => setIsOpenDeleteSkillModal(!isOpenDeleteSkillModal)} />
            {openDeleteSkillModal(isOpenDeleteSkillModal)}
          </Row>
          <SkillContentsContainer>
            <SkillContentsTitle>
              Detail
              <hr />
            </SkillContentsTitle>
            <SkillContents>{skillDetail.detail}</SkillContents>
            <SkillContentsTitle>
              Category
              <hr />
            </SkillContentsTitle>
            <SkillContents>{skillDetail.category_name}</SkillContents>
            <SkillContentsTitle>
              Type
              <hr />
            </SkillContentsTitle>
            <SkillContents>{skillDetail.type_name}</SkillContents>
          </SkillContentsContainer>
        </FlatCard>
        <ChildButtonContainer>
          <Button />
        </ChildButtonContainer>
      </ParentButtonContainer>
    </MainLayout>
  );
}
