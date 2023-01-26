import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {del, get} from '@utils/api_methods';
import DeleteModal from '@components/common/DeleteModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

const CategoryDeleteModal: FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (router.isReady) {
      const getFormDataUrl = process.env.CSR_API_URI + '/categories/' + query.id;
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

  const DeleteCategory = async (query: any) => {
    const deleteCategoryUrl = process.env.CSR_API_URI + '/categories/' + query.id;
    await del(deleteCategoryUrl);
  };

  return (
    <DeleteModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Delete Category</h2>
      <h3>Are you sure?</h3>
      <Button
        onClick={() => {
          DeleteCategory(query);
          router.back();
        }}
      >
        Delete
      </Button>
    </DeleteModal>
  );
};

export default CategoryDeleteModal;
