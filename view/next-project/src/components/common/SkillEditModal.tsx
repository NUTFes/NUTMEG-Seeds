import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { get, put } from '@utils/api_methods';
import EditModal from '@components/common/EditModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  skillCategory: SkillCategory;
  setSkillDetail: Function;
}

interface SkillCategory {
  name: string;
  detail: string;
  category_name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Type {
  id: number;
  name: string;
}

const SkillEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();
  const query = router.query;

  const [categories, setCategories] = useState<Category[]>([{ id: 0, name: '' }]);
  const [types, setTypes] = useState<Type[]>([{ id: 0, name: '' }]);
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    category_id: 0,
    type_id: 0,
  });

  useEffect(() => {
    const getCategoriesUrl = process.env.CSR_API_URI + '/categories';
    const getCategoires = async (url: string) => {
      setCategories(await get(url));
    };
    getCategoires(getCategoriesUrl);

    const getTypesUrl = process.env.CSR_API_URI + '/types';
    const getTypes = async (url: string) => {
      setTypes(await get(url));
    };
    getTypes(getTypesUrl);

    if (router.isReady) {
      const getFormDataUrl = process.env.CSR_API_URI + '/skills/' + query.id;
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
    const submitSkillUrl = process.env.CSR_API_URI + '/skills/' + query.id;
    const postRes = await put(submitSkillUrl, data);
    const getSkillDetailUrl = process.env.CSR_API_URI + '/api/v1/get_skill_for_view/' + query.id;
    const getRes = await get(getSkillDetailUrl);
    const newSkill: SkillCategory = getRes;
    props.setSkillDetail(newSkill);
    router.reload();
  };

  return (
    <EditModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Edit Skill</h2>
      <div>
        <h3>Name</h3>
        <input type='text' placeholder='Input' value={formData.name} onChange={handler('name')} />
      </div>
      <div>
        <h3>Detail</h3>
        <input type='text' placeholder='Input' value={formData.detail} onChange={handler('detail')} />
      </div>
      <div>
        <h3>Category</h3>
        <select defaultValue={formData.category_id} onChange={handler('category_id')}>
          {categories.map((data: Category) => {
            if (data.id == formData.category_id) {
              return (
                <option key={data.id} value={data.id} selected>
                  {data.name}
                </option>
              );
            } else {
              return (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div>
        <h3>Type</h3>
        <select defaultValue={formData.type_id} onChange={handler('type_id')}>
          {types.map((data: Type) => {
            if (data.id == formData.type_id) {
              return (
                <option key={data.id} value={data.id} selected>
                  {data.name}
                </option>
              );
            } else {
              return (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              );
            }
          })}
        </select>
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

export default SkillEditModal;
