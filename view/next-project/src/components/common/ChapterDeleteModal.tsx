import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { del } from '@utils/api_methods';
import Button from '@components/common/TestButton';
import { useUI } from '@components/ui/context';

const RecordDeleteModal: FC = () => {
  const router = useRouter();
  const query = router.query;
  const { closeModal } = useUI();

  const DeleteRecord = async (query: any) => {
    const deleteRecordUrl = process.env.CSR_API_URI + '/chapters/' + query.id;
    await del(deleteRecordUrl);
  };

  return (
    <>
      <h2>Delete Record</h2>
      <h3>Are you sure?</h3>
      <Button
        onClick={() => {
          DeleteRecord(query);
          closeModal();
          router.back();
        }}
      >
        Delete
      </Button>
    </>
  );
};

export default RecordDeleteModal;
