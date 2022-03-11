import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {del, get} from '@utils/api_methods';
import DeleteModal from '@components/common/DeleteModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

const CurriculumDeleteModal: FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    homework: '',
    skill_id: ''
  });
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (router.isReady) {
      const getFormDataUrl = process.env.SEEDS_API_URI + '/curriculums/' + query.id;
      const getFormData = async (url: string) => {
        setFormData(await get(url));
      };
      getFormData(getFormDataUrl);
    }
  }, [query, router]);

  const handler =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData({...formData, [input]: e.target.value});
    };

  const DeleteCurriculum = async (query: any) => {
    const deleteCurriculumUrl = process.env.SEEDS_API_URI + '/curriculums/' + query.id;
    await del(deleteCurriculumUrl);
  };

  return (
    <DeleteModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Delete Curriculum</h2>
      <h3>Are you sure?</h3>
      <Button
        onClick={() => {
          DeleteCurriculum(query);
          router.back();
        }}
      >
        Delete
      </Button>
    </DeleteModal>
  );
};

export default CurriculumDeleteModal;
