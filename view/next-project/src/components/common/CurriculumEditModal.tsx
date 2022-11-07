import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { get, put } from '@utils/api_methods';
import EditModal from '@components/common/EditModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

interface Skill {
  id: string | number;
  name: string;
}

interface Curriculum {
  title: string;
  content: string;
  homework: string;
  skill_ids: string[];
}

interface CurriculumskillId {
  curriculum_id: string | number;
  skill_id: string | number;
}

const CurriculumEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();
  const query = router.query;

  const [skills, setSkills] = useState<Skill[]>([{ id: '', name: '' }]);

  const [curriculumSkillIds, setCurriculumSkillIds] = useState<CurriculumskillId[]>([
    { curriculum_id: '', skill_id: '' },
  ]);

  const [formData, setFormData] = useState<Curriculum>({
    title: '',
    content: '',
    homework: '',
    skill_ids: []
  });

  useEffect(() => {
    const getSkillsUrl = process.env.CSR_API_URI + '/skills';
    const getSkills = async (url: string) => {
      const res = await get(url);
      setSkills(res);
    };
    getSkills(getSkillsUrl);

    const getCurriculumSkillIdsUrl = process.env.CSR_API_URI + '/curriculum_skills';
    const getCurriculumSkillIds = async (url: string) => {
      const res = await get(url);
      setCurriculumSkillIds(res);
    };
    getCurriculumSkillIds(getCurriculumSkillIdsUrl);

    if (router.isReady) {
      const getFormDataUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
      const getFormData = async (url: string) => {
        const res = await get(url);
        setFormData(res);
      };
      getFormData(getFormDataUrl);
    }
  }, [query, router]);

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

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skillId = e.target.value as string;
    setFormData({ ...formData, skill_ids: [skillId] });
  };

  const submitCurriculum = async (data: any, ids: any, query: any) => {
    const submitCurriculumUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
    console.log(data.title, data.content, data.homework, data.skill_ids);
    await put(submitCurriculumUrl, data);

    // const submitCurriculumSkillUrl = process.env.CSR_API_URI + '/curriculum_skills/1';
    // await put(submitCurriculumSkillUrl, {curriculum_id: 1, skill_id: 2});
  };

  return (
    <EditModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Edit Curriculum</h2>
      <div>
        <h3>Curriculum Name</h3>
        <input type='text' placeholder='Input' value={formData.title} onChange={handler('title')} />
      </div>
      <div>
        <h3>Contents</h3>
        <div>
          <textarea placeholder='Input' value={formData.content} onChange={handler('content')} />
          <div>
            <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
              {formData.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div>
        <h3>Homework</h3>
        <div>
          <textarea placeholder='Input' value={formData.homework} onChange={handler('homework')} />
          <div>
            <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
              {formData.homework}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div>
        <h3>Skill</h3>
        <select onChange={handleSkillChange} multiple>
          {skills.map((data: Skill, index) => {
            const isContain = curriculumSkillIds.some((curriculumSkillId: CurriculumskillId) => {
              return curriculumSkillId.skill_id === data.id && curriculumSkillId.curriculum_id == query.id;
            });

            return (
              <option key={data.id} value={data.id} selected={isContain}>
                {data.name}
              </option>
            );
          })}
        </select>
      </div>
      <Button
        onClick={() => {
          submitCurriculum(formData, curriculumSkillIds, query);
          router.reload();
        }}
      >
        Submit
      </Button>
    </EditModal>
  );
};

export default CurriculumEditModal;
