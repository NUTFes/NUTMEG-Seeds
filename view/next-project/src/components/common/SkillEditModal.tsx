import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {get, put} from '@utils/api_methods';
import EditModal from '@components/common/EditModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  skillCategory: SkillCategory;
}

interface SkillCategory {
  id: number;
  name: string;
  detail: string;
  category_id: number;
  category_name: string;
  created_at: string;
}

type Skill = {
  name: string;
  detail: string;
  category_id: number;
}

type Category = {
  id: number;
  name: string;
}

const SkillEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();
  const query = router.query;

  const [categories, setCategories] = useState<Category[]>([{id: 0, name: ''}])
  const [skillData, setSkillData] = useState<Skill>({name: '', detail: '', category_id: 0});
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    category_id: '',
  });

  useEffect(() => {
    const getCategoriesUrl = process.env.CSR_API_URI + '/categories';
    const getCategoires = async (url: string) => {
      setCategories(await get(url));
    };
    getCategoires(getCategoriesUrl);

    if (router.isReady) {
      const getFormDataUrl = process.env.CSR_API_URI + '/skills/' + query.id;
      const getFormData = async (url: string) => {
        setFormData(await get(url));
      };
      getFormData(getFormDataUrl);
      const getSkillDataUrl = process.env.CSR_API_URI + '/api/v1/skills/' + query.id;
      const getSkillData = async (url: string) => {
        setSkillData(await get(url));
      };
      getSkillData(getSkillDataUrl);
    }
  }, [query, router]);

  const handler =
    (input: string) => (
      e:
        React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormData({...formData, [input]: e.target.value});
  };

  const submitSkill = async (data: any, query: any) => {
    const submitSkillUrl = process.env.CSR_API_URI + '/skills/' + query.id;
    await put(submitSkillUrl, data);
  };

  return (
    <EditModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Edit Skill</h2>
      <div>
        <h3>Name</h3>
        <input type='text' placeholder='Input' value={formData.name} onChange={handler('name')}/>
      </div>
      <div>
        <h3>Detail</h3>
        <input type='text' placeholder='Input' value={formData.detail} onChange={handler('detail')}/>
      </div>
      <div>
        <h3>Category</h3>
        <select defaultValue={formData.category_id} onChange={handler('category_id')}>
          <option value=''>{props.skillCategory.category_name}</option>
          {categories.map((data: Category) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitSkill(formData, query);
          router.reload();
        }}
      >
        Submit
      </Button>
      </EditModal>
  );
};

export default SkillEditModal;
