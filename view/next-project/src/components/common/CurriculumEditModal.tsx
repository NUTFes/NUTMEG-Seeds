import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {get, put} from '@utils/api_methods';
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
  id: string | number;
  title: string;
  content: string;
  homework: string;
  created_at: string;
  updated_at: string;
}

interface CurriculumSkill {
  curriculum: Curriculum;
  skills: Skill[];
}

const CurriculumEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();
  const query = router.query;

  const [skills, setSkills] = useState<Skill[]>([{id: '', name: ''}]);
  const [curriculumSkill, setCurriculumSkill] = useState<CurriculumSkill[]>([{
    curriculum: {
      id: '',
      title: '',
      content: '',
      homework: '',
      created_at: '',
      updated_at: '',
    },
    skills: [{id: '', name: ''}]
  }]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    homework: '',
    skill_id: 0,
  });

  useEffect(() => {
    const getSkillsUrl = process.env.CSR_API_URI + '/skills';
    const getSkills = async (url: string) => {
      setSkills(await get(url));
    };
    getSkills(getSkillsUrl);

    if (router.isReady) {
      const getFormDataUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
      const getFormData = async (url: string) => {
        setFormData(await get(url));
      };
      getFormData(getFormDataUrl);

      const getCurriculumsUrl = process.env.CSR_API_URI + '/api/v1/get_curriculum_for_view/' + query.id;
      const getCurriculumSkill = async (url: string) => {
        const res = await get(url);
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
    const submitCurriculumUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
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
        <div>
          <textarea placeholder='Input' value={formData.content} onChange={handler('content')}/>
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
          <textarea placeholder='Input' value={formData.homework} onChange={handler('homework')}/>
          <div>
            <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
              {formData.homework}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div>
        <h3>Skill</h3>
        {/* {curriculumSkill[0].skills[0].id} */}
        <select defaultValue={formData.skill_id} onChange={handler('skill_id')} multiple>
          {skills.map((data: Skill) => {
            // {curriculumSkill[0].skills.map((skill: Skill) => {
            //   if (data.id === skill.id) {
            //     console.log(skill.name);
            //     return (
            //       <option key={data.id} value={data.id}>{data.name}</option>
            //     );
            //   }else {
            //     console.log(data.name);
            //     return (
            //       <option key={data.id} value={data.id}>{data.name}</option>
            //     );
            //   }
            // })};
              if (curriculumSkill[0].skills.includes(data)) {
                return (
                  <option key={data.id} value={data.id} selected>
                    {data.name}
                  </option>
                );
              } else {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              }
          })}
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
