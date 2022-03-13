import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {get, put} from '@utils/api_methods';
import EditModal from '@components/common/EditModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

interface Skill {
  id: string;
  name: string;
}

interface CurriculumSkill {
  id: number | string;
  title: string;
  content: string;
  homework: string;
  skill_id: number | string;
  created_at: string;
  updated_at: string;
  skill: string;
}

const CurriculumEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();
  const query = router.query;

  const [skills, setSkills] = useState<Skill[]>([{id: '', name: ''}]);
  const [curriculumSkill, setCurriculumSkill] = useState<CurriculumSkill[]>([{
    id: '',
    title: '',
    content: '',
    homework: '',
    skill_id: '',
    created_at: '',
    updated_at: '',
    skill: '',
  }]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    homework: '',
    skill_id: '',
  });

  useEffect(() => {
    const getSkillsUrl = process.env.SEEDS_API_URI + '/skills';
    const getSkills = async (url: string) => {
      setSkills(await get(url));
    };
    getSkills(getSkillsUrl);

    if (router.isReady) {
      const getFormDataUrl = process.env.SEEDS_API_URI + '/curriculums/' + query.id;
      const getFormData = async (url: string) => {
        setFormData(await get(url));
      };
      getFormData(getFormDataUrl);

      const getCurriculumsUrl = process.env.SEEDS_API_URI + '/api/v1/get_curriculum_for_view/' + query.id;
      const getCurriculumSkill = async (url: string) => {
        setCurriculumSkill(await get(url));
      };
      getCurriculumSkill(getCurriculumsUrl);
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

  const submitCurriculum = async (data: any, query: any) => {
    const submitCurriculumUrl = process.env.SEEDS_API_URI + '/curriculums/' + query.id;
    await put(submitCurriculumUrl, data);
  };

  return (
    <EditModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Edit Curriculum</h2>
      <div>
        <h3>Curriculum Name</h3>
        <input type='text' placeholder='Input' value={formData.title} onChange={handler('title')}/>
      </div>
      <div>
        <h3>Contents</h3>
        <textarea placeholder='Input' value={formData.content} onChange={handler('content')}/>
      </div>
      <div>
        <h3>Homework</h3>
        <input type='text' placeholder='Input' value={formData.homework} onChange={handler('homework')}/>
      </div>
      <div>
        <h3>Skill</h3>
        <select defaultValue={formData.skill_id} onChange={handler('skill_id')}>
          <option value=''>{curriculumSkill[0].skill}</option>
          {skills.map((skill: Skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitCurriculum(formData, query);
          router.reload();
        }}
      >
        Submit
      </Button>
    </EditModal>
  );
};

export default CurriculumEditModal;
