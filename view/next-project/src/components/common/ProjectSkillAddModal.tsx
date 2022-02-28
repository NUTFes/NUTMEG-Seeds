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

interface ProjectSkill {
  project_id: string | any;
  skill_id: string;
}

const ProjectSkillAddModal: FC<ModalProps> = (props) => {
  const [skills, setSkills] = useState<Skill[]>([{ id: '', name: '' }]);
  const [formData, setFormData] = useState<ProjectSkill>({
    project_id: useRouter().query.id,
    skill_id: '',
  });

  useEffect(() => {
    const getSkillsUrl = process.env.SEEDS_API_URI + '/skills';
    const getSkills = async (url: string) => {
      setSkills(await get(url));
    };
    getSkills(getSkillsUrl);
  }, []);

  const handler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const router = useRouter();
  const submitSkill = async (data: ProjectSkill) => {
    const submitUrl = process.env.SEEDS_API_URI + '/project_skills';
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
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
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

export default ProjectSkillAddModal;
