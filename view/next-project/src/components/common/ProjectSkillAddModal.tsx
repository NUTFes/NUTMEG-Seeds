import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {get, post} from '@utils/api_methods';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  setSkills: Function;
  skills: Skill[];
}

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface ProjectSkill {
  project_id: string | any;
  skill_id: string;
}

const ProjectSkillAddModal: FC<ModalProps> = (props) => {
  const [skillList, setSkillList] = useState<Skill[]>([{id: '', name: '', category: ''}]);
  const [formData, setFormData] = useState<ProjectSkill>({
    project_id: useRouter().query.id,
    skill_id: '',
  });

  useEffect(() => {
    const getSkillsUrl = process.env.CSR_API_URI + '/skills';
    const getSkillList = async (url: string) => {
      setSkillList(await get(url));
    };
    getSkillList(getSkillsUrl);
  }, []);

  const handler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [input]: e.target.value});
  };

  const router = useRouter();
  const submitSkill = async (data: ProjectSkill) => {
    const submitUrl = process.env.CSR_API_URI + '/project_skills';
    const postReq = await post(submitUrl, data);
    const postRes = await postReq.json();
    const getSkillUrl = process.env.CSR_API_URI + '/api/v1/get_project_skill_for_reload_view_skills/' + postRes.id;
    const getRes = await get(getSkillUrl);
    const newSkills: Skill = getRes[0];
    props.setSkills([...props.skills, newSkills]);
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Skill</h2>
      <div>
        <h3>Skill</h3>
        <select defaultValue={formData.skill_id} onChange={handler('skill_id')}>
          <option value=''>select</option>
          {skillList.map((skill: Skill) => (
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

export default ProjectSkillAddModal;
