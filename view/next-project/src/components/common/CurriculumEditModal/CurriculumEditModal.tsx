import React, { FC, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get, put } from '@utils/api_methods';
import s from './CurriculumEditModal.module.css';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useUI } from '@components/ui/context';

const SimpleMde = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface Curriculum {
  id?: number;
  title: string;
  skill_ids: number[];
  graduation_assignment: string;
  created_at?: string;
  updated_at?: string;
}

interface Skill {
  id: string;
  name: string;
}

interface FormData {
  title: string;
  graduation_assignment: string;
}

interface CurriculumskillId {
  curriculum_id: string | number;
  skill_id: string | number;
}

interface Props {
  curriculum: Curriculum;
  onClose: () => void;
}

const CurriculumEditModal: FC<Props> = (props) => {
  const router = useRouter();
  const query = router.query;

  const [curriculum, setCurriculum] = useState<Curriculum>(props.curriculum);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [curriculumSkillIds, setCurriculumSkillIds] = useState<CurriculumskillId[]>([
    { curriculum_id: '', skill_id: '' },
  ]);
  const [graduationAssignmentMarkdown, setGraduationAssignment] = useState<string>(
    props.curriculum.graduation_assignment,
  );

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
        return curriculumSkillId.curriculum_id == query.slug;
      });
      setCurriculumSkillIds(setData);
    };
    getCurriculumSkillIds(getCurriculumSkillIdsUrl);
  }, [query, router]);

  const handler =
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setCurriculum({ ...curriculum, [input]: e.target.value });
    };

  // graduationAssignment編集用ハンドラー
  const handleGraduationAssignment = useCallback((value: string) => {
    setGraduationAssignment(value);
  }, []);

  // selectで複数選択した値をsetCurriculumSkillIdsに更新
  const handleSkills = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedSkillIds = selectedOptions.map((option) => option.value);
    const newCurriculumSkillIds = selectedSkillIds.map((skillId) => {
      return { curriculum_id: query.id, skill_id: skillId } as CurriculumskillId;
    });
    setCurriculumSkillIds(newCurriculumSkillIds);
  };

  const submit = async () => {
    const submitData = {
      curriculum: curriculum,
      curriculum_skill: curriculumSkillIds,
    };
    const submitCurriculumUrl = process.env.CSR_API_URI + '/curriculums/' + query.id;
    await put(submitCurriculumUrl, submitData);
    router.reload();
  };

  return (
    <div className={s.modalContainer}>
      <div className={s.modalInnerContainer}>
        <div className={s.modalContent}>
          <div className={s.modalContentClose}>
            <button className={s.modalContentCloseIcon} onClick={props.onClose}>
              <Close width={24} height={24} color={'var(--accent-4)'} />
            </button>
          </div>
          <div className={s.modalName}>
            <h2>Edit Curriculum</h2>
          </div>
          <h3 className={s.contentsTitle}>Curriculum Name</h3>
          <div className={s.modalContentContents}>
            <input type='text' placeholder='Input' value={curriculum.title} onChange={handler('title')} />
          </div>
          <h3 className={s.contentsTitle}>Graduation Assignment</h3>
          <SimpleMde
            value={graduationAssignmentMarkdown}
            onChange={handleGraduationAssignment}
            className={s.graduationAssignmentMde}
          />
          <div>
            <h3>Skill</h3>
            <select onChange={handleSkills} multiple>
              {skills.map((data) => {
                const isContain = curriculumSkillIds.some((curriculumSkillId: CurriculumskillId) => {
                  return curriculumSkillId.skill_id === data.id && curriculumSkillId.curriculum_id == query.slug;
                });

                return (
                  <option key={data.id} value={data.id} selected={isContain}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={s.modalSubmitButton}>
            <Button onClick={submit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumEditModal;
