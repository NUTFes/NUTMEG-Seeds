import React, { FC, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { get, put } from '@utils/api_methods';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import s from './RecordEditModal.module.css';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import Switch from '@mui/material/Switch';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const SimpleMde = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

interface Curriculum {
  id?: number;
  title: string;
  skill_ids: number[];
  graduation_assignment: string;
  created_at?: string;
  updated_at?: string;
}

interface Chapter {
  id?: number;
  title: string;
  content: string;
  homework: string;
  curriculum_id: number;
  order: number;
  created_at?: string;
  updated_at?: string;
}

interface CurriculumChapters {
  curriculum: Curriculum;
  chapters: Chapter[];
}

interface Teacher {
  id?: string;
  user_id: string;
  record_id: string;
}

interface User {
  id: string;
  name: string;
}

interface Record {
  id?: number;
  title: string;
  content: string;
  homework: string;
  user_id: number;
  chapter_id: number;
  created_at?: string;
  updated_at?: string;
  release?: boolean;
}

interface RecordCurriculumTeacher {
  record: Record | any;
  curriculum: Curriculum | any;
  curriculum_title: string;
  teacher: string;
  user: string;
  skill: string;
}

const RecordEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();
  const query = router.query;

  const [curriculumChapters, setCurriculumChapters] = useState<CurriculumChapters[]>([]);
  const [curriculumChapter, setCurriculumChapter] = useState<CurriculumChapters>();
  const [users, setUsers] = useState<User[]>([{ id: '', name: '' }]);
  const [teacherData, setTeacherData] = useState<Teacher>({ id: '', user_id: '', record_id: '' });
  const [record, setRecord] = useState<RecordCurriculumTeacher>({
    record: null,
    curriculum: null,
    curriculum_title: '',
    teacher: '',
    user: '',
    skill: '',
  });
  const [formData, setFormData] = useState<Record>({
    title: '',
    content: '',
    homework: '',
    user_id: 0,
    chapter_id: 0,
    release: false,
  });
  const [recordMarkdown, setRecordMarkdown] = useState<string>('');
  const [homeworkMarkdown, setHomeworkMarkdown] = useState<string>('');
  const [release, setRelease] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    const getCurriculumChaptersUrl = process.env.CSR_API_URI + '/api/v1/get_curriculums_chapter_for_index';
    const getCurriculumChapters = async (url: string) => {
      const data = await get(url);
      setCurriculumChapters(data);
      setCurriculumChapter(data[0]);
    };
    getCurriculumChapters(getCurriculumChaptersUrl);

    const getUsersUrl = process.env.CSR_API_URI + '/api/v1/users';
    const getUsers = async (url: string) => {
      setUsers(await get(url));
    };
    getUsers(getUsersUrl);

    if (router.isReady) {
      const getFormDataUrl = process.env.CSR_API_URI + '/records/' + query.id;
      const getFormData = async (url: string) => {
        const getRes = await get(url);
        setFormData(getRes);
        setRecordMarkdown(getRes.content);
        setHomeworkMarkdown(getRes.homework);
        setRelease(getRes.release);
      };
      getFormData(getFormDataUrl);

      const getTeacherDataUrl = process.env.CSR_API_URI + '/api/v1/get_teacher_by_record/' + query.id;
      const getTeacherData = async (url: string) => {
        setTeacherData(await get(url));
      };
      getTeacherData(getTeacherDataUrl);

      const getRecordUrl = process.env.CSR_API_URI + '/api/v1/record/' + query.id;
      const getRecord = async (url: string) => {
        setRecord(await get(url));
      };
      getRecord(getRecordUrl);
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

  // レコード編集用ハンドラー
  const recordMarkdownHandler = useCallback((value: string) => {
    setRecordMarkdown(value);
  }, []);
  // Homework編集用ハンドラー
  const homeworkMarkdownHandler = useCallback((value: string) => {
    setHomeworkMarkdown(value);
  }, []);

  const teacherHandler = (query: any) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherData({ id: '1', user_id: e.target.value, record_id: query.id.toString() });
  };

  // カリキュラムのセレクトボックスの変更を検知
  const handleCurriculum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurriculumChapter(
      curriculumChapters.find((curriculumChapter) => curriculumChapter.curriculum.id === Number(e.target.value)),
    );
  };

  const handleReleaseChange = (event: { target: { checked: any } }) => {
    setRelease(event.target.checked);
  };

  const submitRecord = async (data: Record, query: any) => {
    const submitRecordUrl = process.env.CSR_API_URI + '/records/' + query.id;
    const submitData = {
      record: {
        title: data.title,
        content: recordMarkdown,
        homework: homeworkMarkdown,
        user_id: data.user_id,
        chapter_id: data.chapter_id,
        release: release,
      },
    };
    console.log(submitData);
    await put(submitRecordUrl, submitData);
  };

  const submitTeacher = async (data: Teacher) => {
    const submitTeacherUrl = process.env.CSR_API_URI + '/teachers/' + teacherData.id;
    const submitData: Teacher = {
      user_id: data.user_id,
      record_id: data.record_id,
    };
    await put(submitTeacherUrl, submitData);
    router.reload();
  };

  return (
    <div className={s.modalContainer}>
      <div className={s.modalInnerContainer}>
        <div className={s.modalContent}>
          <div className={s.modalContentClose}>
            <button
              className={s.modalContentCloseIcon}
              onClick={() => {
                props.setIsOpen(false);
              }}
            >
              <Close width={24} height={24} color={'var(--accent-4)'} />
            </button>
          </div>
          <div className={s.modalName}>
            <h2>Edit Record</h2>
          </div>
          <h3 className={s.contentsTitle}>Record Name</h3>
          <div className={s.modalContentContents}>
            <input type='text' placeholder='Input' value={formData.title} onChange={handler('title')} />
          </div>
          <h3 className={s.contentsTitle}>Contents</h3>
          <SimpleMde value={recordMarkdown} onChange={recordMarkdownHandler} className={s.contentsMde} />
          <h3 className={s.contentsTitle}>Homework</h3>
          <SimpleMde value={homeworkMarkdown} onChange={homeworkMarkdownHandler} className={s.homeworkMde} />

          <Accordion
            expanded={accordionOpen}
            onChange={() => setAccordionOpen(!accordionOpen)}
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary sx={{ padding: 0 }}>
              {accordionOpen ? 'ー' : '＋'} Teacher・Curriculum・Chapter（※変更する場合のみ）
            </AccordionSummary>
            <AccordionDetails>
              <>
                <h3 className={s.contentsTitleAccordion}>Teacher</h3>
                <div className={s.modalContentContents}>
                  <select defaultValue={teacherData.user_id} onChange={teacherHandler(query)}>
                    {users.map((data: User) => {
                      if (data.id == teacherData.user_id) {
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
                <h3 className={s.contentsTitleAccordion}>Curriculum</h3>
                <div className={s.modalContentContents}>
                  <select onChange={handleCurriculum}>
                    {formData.chapter_id === null && <option value={formData.chapter_id}>no curriculum</option>}
                    {curriculumChapters.map((data: CurriculumChapters) => {
                      return (
                        <option key={data.curriculum.id} value={data.curriculum.id}>
                          {data.curriculum.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <h3 className={s.contentsTitleAccordion}>Chapter</h3>
                <div className={s.modalContentContents}>
                  <select onChange={handler('chapter_id')}>
                    {formData.chapter_id === null && <option value={formData.chapter_id}>no chapter</option>}
                    {curriculumChapter?.chapters.map((chapter: Chapter) => {
                      if (formData.chapter_id !== null && chapter.id === formData.chapter_id) {
                        return (
                          <option key={chapter.id} value={chapter.id} selected>
                            {chapter.title}
                          </option>
                        );
                      } else {
                        return (
                          <option key={chapter.id} value={chapter.id}>
                            {chapter.title}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </>
            </AccordionDetails>
          </Accordion>

          <div className={s.modalContentContents}>
            <label htmlFor='release-switch'>公開する</label>
            <Switch
              checked={release}
              onChange={handleReleaseChange} // 適切なハンドラー関数を設定
              color='primary'
            />
          </div>
          <div className={s.modalSubmitButton}>
            <Button
              onClick={() => {
                submitRecord(formData, query);
                submitTeacher(teacherData);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordEditModal;
