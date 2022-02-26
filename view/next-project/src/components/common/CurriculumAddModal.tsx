import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import { post } from '@utils/api_methods';

interface Skills {
  id: number;
  name: string;
  detail: string;
  category_id: number;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: any;
  children?: React.ReactNode;
  skills: Skills[];
}

interface Curriculums {
  title: string;
  content: string;
  homework: string;
  skill_id: number;
}

const submitProject = async (data: Curriculums) => {
  console.log('******');
  console.log(data);
  console.log('******');
  const postUrl = 'http://localhost:3000/curriculums';
  const postReq = await post(postUrl, data);
};

const ProjectAddModal = (props: ModalProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    homework: '',
    skill_id: 1,
  });
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

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Curriculum</h2>
      <div>
        <h3>Curriculum Title</h3>
        <input type='text' placeholder='Input' value={formData.title} onChange={handler('title')} />
      </div>
      <div>
        <h3>Content</h3>
        <textarea placeholder='Input' value={formData.content} onChange={handler('content')} />
      </div>
      <div>
        <h3>Homework</h3>
        <textarea placeholder='Input' value={formData.homework} onChange={handler('homework')} />
      </div>
      <div>
        <h3>Skill</h3>
        <select defaultValue={formData.skill_id} onChange={handler('skill_id')}>
          {props.skills.map((data) => (
            <option value={data.id}>{data.name}</option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitProject(formData);
          router.reload();
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default ProjectAddModal;
