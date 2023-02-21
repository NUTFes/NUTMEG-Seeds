import React, { FC, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { get, put } from '@utils/api_methods';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import s from './ChapterEditModal.module.css';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';

const SimpleMde = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

interface Teacher {
  id: string;
  user_id: string;
  record_id: string;
}

interface User {
  id: string;
  name: string;
}

interface Curriculum {
  id: number | string;
  title: string;
}

interface Record {
  id: string;
  title: string;
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

  const [curriculums, setCurriculums] = useState<Curriculum[]>([{ id: '', title: '' }]);
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
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    homework: '',
    user_id: '',
    curriculum_id: '',
  });
  const [recordMarkdown, setRecordMarkdown] = useState<string>('');
  const [homeworkMarkdown, setHomeworkMarkdown] = useState<string>('');

  useEffect(() => {
    const getCurriculumsUrl = process.env.CSR_API_URI + '/curriculums';
    const getCurriculums = async (url: string) => {
      setCurriculums(await get(url));
    };
    getCurriculums(getCurriculumsUrl);

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

  const submitRecord = async (data: any, query: any) => {
    const submitRecordUrl = process.env.CSR_API_URI + '/records/' + query.id;
    const submitData = {
      title: data.title,
      content: recordMarkdown,
      homework: homeworkMarkdown,
      user_id: data.user_id,
      curriculum_id: data.curriculum_id,
    };
    await put(submitRecordUrl, submitData);
  };

  const submitTeacher = async (data: any) => {
    const submitTeacherUrl = process.env.CSR_API_URI + '/teachers/' + teacherData.id;
    await put(submitTeacherUrl, data);
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
          <h3 className={s.contentsTitle}>Teacher</h3>
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
          <h3 className={s.contentsTitle}>Curriculum</h3>
          <div className={s.modalContentContents}>
            <select defaultValue={formData.curriculum_id} onChange={handler('curriculum_id')}>
              {curriculums.map((data: Curriculum) => {
                if (data.id == formData.curriculum_id) {
                  return (
                    <option key={data.id} value={data.id} selected>
                      {data.title}
                    </option>
                  );
                } else {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.title}
                    </option>
                  );
                }
              })}
            </select>
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
