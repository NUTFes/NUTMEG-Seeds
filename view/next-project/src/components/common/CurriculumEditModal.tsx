import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { get, put } from '@utils/api_methods';
import Button from '@components/common/TestButton';
import { useUI } from '@components/ui/context';

interface Skill {
  id: string | number;
  name: string;
}

interface FormData {
  title: string;
  content: string;
  graduation_assignment: string;
}

interface CurriculumskillId {
  curriculum_id: string | number;
  skill_id: string | number;
}

// Curriculumのcontentをメモ化
const CurriculumContent = React.memo(function CurriculumContent(props: { content: string; handler: any }) {
  return (
    <div>
      <h3>Contents</h3>
      <div>
        <textarea placeholder='Input' value={props.content} onChange={props.handler('content')} />
        <div>
          <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
            {props.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
});

// CurriculumのHomeworkをメモ化
const CurriculumHomework = React.memo(function CurriculumHomework(props: {
  graduation_assignment: string;
  handler: any;
}) {
  return (
    <div>
      <h3>Homework</h3>
      <div>
        <textarea
          placeholder='Input'
          value={props.graduation_assignment}
          onChange={props.handler('graduation_assignment')}
        />
        <div>
          <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
            {props.graduation_assignment}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
});

export default function CurriculumEditModal() {
  const { closeModal } = useUI();

  const router = useRouter();
  const query = router.query;

  const [skills, setSkills] = useState<Skill[]>([{ id: '', name: '' }]);
  const [curriculumSkillIds, setCurriculumSkillIds] = useState<CurriculumskillId[]>([
    { curriculum_id: '', skill_id: '' },
  ]);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    graduation_assignment: '',
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
      const setData = res.filter((curriculumSkillId: CurriculumskillId) => {
        return curriculumSkillId.curriculum_id == query.id;
      });
      setCurriculumSkillIds(setData);
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
    };
    const submitCurriculumUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
    await put(submitCurriculumUrl, submitData);
    router.reload();
  };

  return (
    <>
      <h2>Edit Curriculum</h2>
      <div>
        <h3>Curriculum Name</h3>
        <input type='text' placeholder='Input' value={formData.title} onChange={handler('title')} />
      </div>
      <CurriculumContent content={formData.content} handler={handler} />
      <CurriculumHomework graduation_assignment={formData.graduation_assignment} handler={handler} />
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
          closeModal();
        }}
      >
        Submit
      </Button>
    </>
  );
}
