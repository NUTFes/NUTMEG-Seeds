import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get, post } from '@utils/api_methods';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

interface Skill {
  id: string;
  name: string;
}

interface UserSkill {
  user_id: string | any;
  skill_id: string;
}

const UserSkillAddModal: FC<ModalProps> = (props) => {
  const [skills, setSkills] = useState<Skill[]>([{ id: '', name: '' }]);
  const [formData, setFormData] = useState<UserSkill>({
    user_id: useRouter().query.id,
    skill_id: '',
  });

  useEffect(() => {
    const getSkillsUrl = 'http://localhost:3000/skills';
    const getSkills = async (url: string) => {
      setSkills(await get(url));
    };
    getSkills(getSkillsUrl);
  }, []);

  const handler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const router = useRouter();
  const submitSkill = async (data: UserSkill) => {
    const submitUrl = 'http://localhost:3000/user_skills';
    const postRes = await post(submitUrl, data);
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Skill</h2>
      <div>
        <h3>Skill</h3>
        <select defaultValue={formData.skill_id} onChange={handler('skill_id')}>
          <option value=''>select</option>
          {skills.map((skill: Skill) => (
            <option value={skill.id}>{skill.name}</option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitSkill(formData);
          router.reload();
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default UserSkillAddModal;
