import React from 'react';
import { useRouter } from 'next/router';
import { del } from '@utils/api_methods';
import Button from '@components/common/TestButton';
import { useUI } from '@components/ui/context';

export default function ChapterDeleteModal() {
  const router = useRouter();
  const query = router.query;
  const { closeModal } = useUI();

  const DeleteChapter = async (query: any) => {
    const deleteChapterUrl = process.env.CSR_API_URI + '/chapters/' + query.id;
    await del(deleteChapterUrl);
    router.back();
  };

  return (
    <>
      <h2>Delete Chapter</h2>
      <h3>Are you sure?</h3>
      <Button
        onClick={() => {
          DeleteChapter(query);
          closeModal();
        }}
      >
        Delete
      </Button>
    </>
  );
}
