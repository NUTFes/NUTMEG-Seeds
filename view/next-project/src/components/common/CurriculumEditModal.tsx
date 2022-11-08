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

  // selectで複数選択した値をsetCurriculumSkillIdsに更新
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedSkillIds = selectedOptions.map((option) => option.value);
    const newCurriculumSkillIds = selectedSkillIds.map((skillId) => {
      return { curriculum_id: query.id, skill_id: skillId } as CurriculumskillId;
    });
    setCurriculumSkillIds(newCurriculumSkillIds);
  };

  const submitCurriculum = async (data: any, ids: any, query: any) => {
    const submitData = {
      curriculum: data,
      curriculum_skill: ids,
    }

    const submitCurriculumUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
    console.log(submitData.curriculum_skill);
    await put(submitCurriculumUrl, submitData);

    router.reload();
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
        <select onChange={handleSelect} multiple>
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
        }}
      >
        Submit
      </Button>
    </EditModal>
  );
};

export default CurriculumEditModal;
