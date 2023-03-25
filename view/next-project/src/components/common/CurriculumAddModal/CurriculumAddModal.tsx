import React, { FC, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get, post } from '@utils/api_methods';
import s from './CurriculumAddModal.module.css';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useUI } from '@components/ui/context';

const SimpleMde = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface Skill {
  id: string;
  name: string;
}

interface Curriculum {
  id?: number;
  title: string;
  skill_ids?: string[] | number[];
  graduationAssignment: string;
}

const CurriculumAddModal: FC = () => {
  const router = useRouter();
  const { closeModal } = useUI();

  const graduationAssignmentSentence = '# 卒業課題の概要 \n\n\n' + '# 詳細 \n\n\n';
  const [graduationAssignmentMarkdown, setGraduationAssignment] = useState<string>(graduationAssignmentSentence);

  const [curriculum, setCurriculum] = useState<Curriculum>({
    title: '',
    graduationAssignment: graduationAssignmentMarkdown,
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillIds, setSkillIds] = useState<string[]>([]);

  // skillsの取得
  useEffect(() => {
    if (router.isReady) {
      const getSkillsUrl = process.env.CSR_API_URI + '/skills';
      const getSkills = async (url: string) => {
        setSkills(await get(url));
      };
      getSkills(getSkillsUrl);
    }
  }, [router, setSkills]);

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

  // skills用のハンドラー
  const handleSkills = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedSkillIds = selectedOptions.map((option) => option.value);
    setSkillIds(selectedSkillIds);
  };

  // フォームデータの送信とページの表を再レンダリング
  const submit = async () => {
    // カリキュラムの作成
    const submitUrl = process.env.CSR_API_URI + '/curriculums';
    const postCurriculumData = {
      title: curriculum.title,
      graduation_assignment: graduationAssignmentMarkdown,
    };
    const postReq = await post(submitUrl, postCurriculumData);
    const postRes = await postReq.json();

    // CuriiculumSkillの作成
    const postCurriculumSkillUrl = process.env.CSR_API_URI + '/curriculum_skills';
    const curriculumSkillData = skillIds.map((skillId) => {
      return {
        curriculum_id: postRes.id,
        skill_id: skillId,
      };
    });
    const postData = { curriculum_skill: curriculumSkillData };
    await post(postCurriculumSkillUrl, postData);

    closeModal();
    router.reload();
  };

  return (
    <div className={s.modalContainer}>
      <div className={s.modalInnerContainer}>
        <div className={s.modalContent}>
          <div className={s.modalContentClose}>
            <button className={s.modalContentCloseIcon} onClick={closeModal}>
              <Close width={24} height={24} color={'var(--accent-4)'} />
            </button>
          </div>
          <div className={s.modalName}>
            <h2>New Curriculum</h2>
          </div>
          <h3 className={s.contentsTitle}>Curriculum Name</h3>
          <div className={s.modalContentContents}>
            <input type='text' placeholder='Input' value={curriculum.title} onChange={handler('title')} />
          </div>
          <h3 className={s.contentsTitle}>Graduation Assignment</h3>
          <SimpleMde
            value={graduationAssignmentMarkdown}
            onChange={handleGraduationAssignment}
            className={s.homeworkMde}
          />
          <div>
            <h3>Skill</h3>
            <select defaultValue='0' onChange={handleSkills} multiple>
              {skills.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
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

export default CurriculumAddModal;
