import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get, put } from '@utils/api_methods';
import EditModal from '@components/common/EditModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  category: Category;
  setCategoryDetail: Function;
}

interface Category {
  id?: number;
  detail: string;
  name: string;
}

const CategoryEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();
  const query = router.query;

  const [formData, setFormData] = useState({
    name: '',
    detail: '',
  });

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
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setFormData({ ...formData, [input]: e.target.value });
    };

  const submitSkill = async (data: any, query: any) => {
    const submitSkillUrl = process.env.CSR_API_URI + '/categories/' + query.id;
    const postRes = await put(submitSkillUrl, data);
    const getSkillDetailUrl = process.env.CSR_API_URI + '/categories/' + query.id;
    const getRes = await get(getSkillDetailUrl);
    const newCategory: Category = getRes;
    props.setCategoryDetail(newCategory);
    props.setIsOpen(false);
  };

  return (
    <EditModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Edit Category</h2>
      <div>
        <h3>Name</h3>
        <input type='text' placeholder='Input' value={formData.name} onChange={handler('name')} />
      </div>
      <div>
        <h3>Detail</h3>
        <input type='text' placeholder='Input' value={formData.detail} onChange={handler('detail')} />
      </div>
      <Button
        onClick={() => {
          submitSkill(formData, query);
        }}
      >
        Submit
      </Button>
    </EditModal>
  );
};

export default CategoryEditModal;
