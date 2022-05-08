import React, { VFC, useState, useEffect } from 'react';
import { get, post } from '@utils/api_methods';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';

type ModalProps = {
  newSkills?: ViewSkill[] | any;
  isOpen: boolean;
  setIsOpen: Function;
  setNewSkills?: Function | any;
}

type ViewSkill = {
  id: number;
  name: string;
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

const SkillAddModal: VFC<ModalProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([{id: 0, name: ''}])
  const [skillData, setSkillData] = useState<Skill>({name: '', detail: '', category_id: 0});
  // 選択肢の取得
  useEffect(() => {
    console.log(props.newSkills)
    const getCategoriesUrl = process.env.CSR_API_URI + '/categories'
    const getCategoires = async (url: string) => {
      setCategories(await get(url));
    };
    getCategoires(getCategoriesUrl);
  }, []);

  const recordHandler =
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setSkillData({ ...skillData, [input]: e.target.value });
  }

  // フォームデータの送信とページの表を再レンダリング
  const submitSkill = async (skillData: any) => {
    const submitSkillUrl = process.env.CSR_API_URI + '/skills';
    const req = await post(submitSkillUrl, skillData);
    const res = await req.json()

    const getSkillUrl = process.env.CSR_API_URI + '/api/v1/get_skill_for_reload_index/' + res.id;
    const getRes = await get(getSkillUrl);
    const newSkill: Skill = getRes[0]
    console.log(newSkill)
    props.setNewSkills([...props.newSkills, newSkill])
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Skill</h2>
      <div>
        <h3>Name</h3>
        <input type='text' placeholder='Input' value={skillData.name} onChange={recordHandler('name')} />
      </div>
      <div>
        <h3>Detail</h3>
        <input type='text' placeholder='Input' value={skillData.detail} onChange={recordHandler('detail')} />
      </div>
      <div>
        <h3>Category</h3>
        <select onChange={recordHandler('category_id')}>
          <option value=''>Select</option>
          {categories.map((data: Category) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitSkill(skillData);
          console.log(skillData)
          props.setIsOpen(false)
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default SkillAddModal;
