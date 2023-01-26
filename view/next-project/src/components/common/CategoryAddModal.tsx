import React, { VFC, useState } from 'react';
import { useRouter } from 'next/router';
import { get, post } from '@utils/api_methods';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';

type ModalProps = {
  newCategories?: ViewCategory[] | any;
  isOpen: boolean;
  setIsOpen: Function;
  setNewCategories?: Function | any;
}

type ViewCategory = {
  id: number;
  name: string;
  category_id: number;
  created_at: string;
}

type Category = {
  id?: number;
  name: string;
}

const CategoryAddModal: VFC<ModalProps> = (props) => {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState<Category>({name: ''})

  const categoryHandler =
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setCategoryData({ ...categoryData, [input]: e.target.value });
  }

  // フォームデータの送信とページの表を再レンダリング
  const submitCategory = async (categoryData: any) => {
    const submitCategoryUrl = process.env.CSR_API_URI + '/categories';
    const req = await post(submitCategoryUrl, categoryData);
    const res = await req.json()

    const getCategoryUrl = process.env.CSR_API_URI + '/categories/' + res.id;
    const getRes = await get(getCategoryUrl);
    const newCategory: Category = getRes[0]
    console.log(newCategory)
    props.setNewCategories([...props.newCategories, newCategory])
    router.reload();
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Category</h2>
      <div>
        <h3>Name</h3>
        <input type='text' placeholder='Input' value={categoryData.name} onChange={categoryHandler('name')} />
      </div>
      <Button
        onClick={() => {
          submitCategory(categoryData);
          props.setIsOpen(false)
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default CategoryAddModal;
