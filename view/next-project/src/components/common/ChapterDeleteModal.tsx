import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { del } from '@utils/api_methods';
import Button from '@components/common/TestButton';
import { useUI } from '@components/ui/context';

const ChapterDeleteModal: FC = () => {
  const router = useRouter();
  const query = router.query;
  const { closeModal } = useUI();

  const DeleteChapter = async (query: any) => {
    const deleteUrl = process.env.CSR_API_URI + '/chapters/' + query.id;
    await del(deleteUrl);
  };

  return (
    <>
      <h2>Delete Chapter</h2>
      <h3>Are you sure?</h3>
      <Button
        onClick={() => {
          DeleteChapter(query);
          closeModal();
          router.back();
        }}
      >
        Delete
      </Button>
    </>
  );
};

export default ChapterDeleteModal;
