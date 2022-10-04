import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { get, put } from '@utils/api_methods';
import Button from '@components/common/TestButton';
import { useUI } from '@components/ui/context';

interface Skill {
  id: string;
  name: string;
}

interface FormData {
  title: string;
  content: string;
  homework: string;
  skill_id: string;
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
const CurriculumHomework = React.memo(function CurriculumHomework(props: { homework: string; handler: any }) {
  return (
    <div>
      <h3>Homework</h3>
      <div>
        <textarea placeholder='Input' value={props.homework} onChange={props.handler('homework')} />
        <div>
          <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
            {props.homework}
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

  const [skills, setSkills] = useState<Skill[]>([]);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    homework: '',
    skill_id: '',
  });

  useEffect(() => {
    if (router.isReady) {
      const getSkillsUrl = process.env.CSR_API_URI + '/skills';
      const getSkills = async (url: string) => {
        setSkills(await get(url));
      };
      getSkills(getSkillsUrl);

      const getFormDataUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
      const getFormData = async (url: string) => {
        setFormData(await get(url));
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

  const submitCurriculum = async (data: any, query: any) => {
    const submitCurriculumUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
    await put(submitCurriculumUrl, data);
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
      <CurriculumHomework homework={formData.homework} handler={handler} />
      <div>
        <h3>Skill</h3>
        <select defaultValue={formData.skill_id} onChange={handler('skill_id')}>
          {skills.map((skill: Skill) => {
            if (skill.id == formData.skill_id) {
              return (
                <option key={skill.id} value={skill.id} selected>
                  {skill.name}
                </option>
              );
            } else {
              return (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      <Button
        onClick={() => {
          submitCurriculum(formData, query);
          closeModal();
        }}
      >
        Submit
      </Button>
    </>
  );
}
