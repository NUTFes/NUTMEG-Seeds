import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import AddModal from '@components/common/AddModal';
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
  const [curriculums, setCurriculums] = useState<FormData[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillIds, setSkillIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    homework: '',
  });

  useEffect(() => {
    if (router.isReady) {
      const getCurriculumsUrl = process.env.CSR_API_URI + '/api/v1/get_curriculums_for_index';
      const getCurriculums = async (url: string) => {
        setCurriculums(await get(url));
      };
      getCurriculums(getCurriculumsUrl);

      const getSkillsUrl = process.env.CSR_API_URI + '/skills';
      const getSkills = async (url: string) => {
        setSkills(await get(url));
      };
      getSkills(getSkillsUrl);
    }
  }, []);

  const skillChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedSkillIds = selectedOptions.map((option) => option.value);
    setSkillIds(selectedSkillIds);
  };

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
  const submitCurriculum = async (data: FormData, ids: string[]) => {
    // フォームデータの送信
    const postUrl = process.env.CSR_API_URI + '/curriculums';
    const postReq = await post(postUrl, data);
    const postRes = await postReq.json();

    // CuriiculumSkillの送信
    const postCurriculumSkillUrl = process.env.CSR_API_URI + '/curriculum_skills';
    const curriculumSkillData = skillIds.map((skillId) => {
      return {
        curriculum_id: postRes.id,
        skill_id: skillId,
      };
    });
    const postData = { curriculum_skill: curriculumSkillData };
    const postCurriculumSkillReq = await post(postCurriculumSkillUrl, postData);

    // 最新のcurriculumsを取得
    const getCurriculumUrl = process.env.CSR_API_URI + '/api/v1/get_curriculum_for_reload_index/' + postRes.id;
    const getRes = await get(getCurriculumUrl);
    const newCurriculums: FormData = getRes[0];
    props.setNewCurriculums([...curriculums, newCurriculums]);

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
        <select defaultValue='0' onChange={skillChangeHandler} multiple>
          {skills.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitCurriculum(formData, skillIds);
          closeModal();
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default CurriculumAddModal;
