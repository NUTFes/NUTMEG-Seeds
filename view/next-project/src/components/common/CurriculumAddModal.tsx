import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import { get, post } from '@utils/api_methods';

interface Skill {
  id: string;
  name: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: any;
  children?: React.ReactNode;
  skills: Skill[];
  setNewCurriculums: Function;
}

interface Curriculum {
  title: string;
  content: string;
  homework: string;
  skill_id: number;
}


const ProjectAddModal = (props: ModalProps) => {
  const router = useRouter();
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [skills, setSkills] = useState<Skill[]>([{ id: '', name: '' }]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    homework: '',
    skill_id: 0,
  });

  useEffect(() => {
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
  const submitCurriculum = async (data: Curriculum) => {
    // フォームデータの送信
    const postUrl = process.env.CSR_API_URI + '/curriculums';
    const postReq = await post(postUrl, data);
    const postRes = await postReq.json();
    console.log(postRes)
    // 最新のcurriculumsを取得
    const getCurriculumUrl = process.env.CSR_API_URI + '/api/v1/get_curriculum_for_reload_index/' + postRes.id;
    const getRes = await get(getCurriculumUrl);
    const newCurriculums: Curriculum = getRes[0]
    console.log(newCurriculums)
    props.setNewCurriculums([...curriculums, newCurriculums])
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Curriculum</h2>
      <div>
        <h3>Curriculum Title</h3>
        <input type='text' placeholder='Input' value={formData.title} onChange={handler('title')} />
      </div>
      <div>
        <h3>Content</h3>
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
        <select defaultValue={formData.skill_id} onChange={handler('skill_id')}>
          <option value='0'>Select</option>
          {skills.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitCurriculum(formData);
          props.setIsOpen(false)
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default ProjectAddModal;
