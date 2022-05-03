import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {get, post} from '@utils/api_methods';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  setUserSkills: Function;
  userSkills: UserSkill[];
}

interface Skill {
  id: string;
  name: string;
}

interface UserSkill {
  id: number;
  name: string;
  category: string;
}

interface FormData {
  user_id: string | any;
  skill_id: string;
}

const UserSkillAddModal: FC<ModalProps> = (props) => {
  const [skills, setSkills] = useState<Skill[]>([{id: '', name: ''}]);
  const [formData, setFormData] = useState<FormData>({
    user_id: useRouter().query.id,
    skill_id: '',
  });

  useEffect(() => {
    const getSkillsUrl = process.env.CSR_API_URI + '/skills';
    const getSkills = async (url: string) => {
      setSkills(await get(url));
    };
    getSkills(getSkillsUrl);
  }, []);

  const handler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [input]: e.target.value});
  };

  const router = useRouter();
  const submitSkill = async (data: FormData) => {
    const submitUrl = process.env.CSR_API_URI + '/user_skills';
    const postRes = await post(submitUrl, data);
    const getUserSkillUrl = process.env.CSR_API_URI + '/api/v1/get_user_skills_for_reload_view/' + data.user_id;
    const getRes = await get(getUserSkillUrl);
    console.log(getRes)
    const newSkills: UserSkill = getRes[getRes.length - 1];
    props.setUserSkills([...props.userSkills, newSkills]);
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Skill</h2>
      <div>
        <h3>Skill</h3>
        <select defaultValue={formData.skill_id} onChange={handler('skill_id')}>
          <option value=''>select</option>
          {skills.map((skill: Skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitSkill(formData);
          props.setIsOpen(false);
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default UserSkillAddModal;
