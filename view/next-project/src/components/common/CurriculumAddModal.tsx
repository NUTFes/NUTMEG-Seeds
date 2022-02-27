import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import { get, post } from '@utils/api_methods';

interface Skill {
  id: string;
  name: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: any;
  children?: React.ReactNode;
  skills: Skill[];
}

interface Curriculum {
  title: string;
  content: string;
  homework: string;
  skill_id: number;
}

const submitProject = async (data: Curriculum) => {
  const postUrl = process.env.SEEDS_API_URI + '/curriculums';
  const postReq = await post(postUrl, data);
};

const ProjectAddModal = (props: ModalProps) => {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([{ id: '', name: '' }]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    homework: '',
    skill_id: 0,
  });

  useEffect(() => {
    const getSkillsUrl = process.env.SEEDS_API_URI + '/skills';
    const getSkills = async (url: string) => {
      setSkills(await get(url));
    };
    getSkills(getSkillsUrl);
  }, []);

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
          <option value='0'>Select</option>
          {skills.map((data) => (
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
