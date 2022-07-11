import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Button from '@components/common/TestButton';
import { get, post } from '@utils/api_methods';
import { useUI } from '@components/ui/context';
import router from 'next/router';

interface Skill {
  id: string;
  name: string;
}

interface FormData {
  title: string;
  content: string;
  homework: string;
  skill_id: number;
}

// Curriculumのcontentをメモ化
const CurriculumContent = React.memo(function CurriculumContent(props: { content: string; handler: any }) {
  return (
    <div>
      <h3>Content</h3>
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

const CurriculumAddModal = () => {
  const { closeModal } = useUI();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    homework: '',
    skill_id: 0,
  });

  useEffect(() => {
    if (router.isReady) {
      const getSkillsUrl = process.env.CSR_API_URI + '/skills';
      const getSkills = async (url: string) => {
        setSkills(await get(url));
      };
      getSkills(getSkillsUrl);
    }
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

  // フォームデータの送信とページの表を再レンダリング
  const submitCurriculum = async (data: FormData) => {
    // フォームデータの送信
    const postUrl = process.env.CSR_API_URI + '/curriculums';
    await post(postUrl, data);
    router.reload();
  };

  return (
    <>
      <h2>New Curriculum</h2>
      <div>
        <h3>Curriculum Title</h3>
        <input type='text' placeholder='Input' value={formData.title} onChange={handler('title')} />
      </div>
      <CurriculumContent content={formData.content} handler={handler} />
      <CurriculumHomework homework={formData.homework} handler={handler} />
      <div>
        <h3>Skill</h3>
        <select defaultValue={formData.skill_id} onChange={handler('skill_id')}>
          <option value='0'>Select</option>
          {skills &&
            skills.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitCurriculum(formData);
          closeModal();
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default CurriculumAddModal;
