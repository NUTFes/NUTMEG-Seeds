import React from 'react';
import { useRouter } from 'next/router';
import { del } from '@utils/api_methods';
import Button from '@components/common/TestButton';
import { useUI } from '@components/ui/context';

export default function CurriculumDeleteModal() {
  const router = useRouter();
  const query = router.query;
  const { closeModal } = useUI();

  const DeleteCurriculum = async (query: any) => {
    const deleteCurriculumUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
    await del(deleteCurriculumUrl);
    router.back();
  };

  return (
    <>
      <h2>Delete Curriculum</h2>
      <h3>Are you sure?</h3>
      <Button
        onClick={() => {
          DeleteCurriculum(query);
          closeModal();
        }}
      >
        Delete
      </Button>
    </>
  );
}
