import React, { FC, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { get, post } from '@utils/api_methods';
import s from './RecordAddModal.module.css';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';

const SimpleMde = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  setNewRecords: Function;
}

type Record = {
  id: number;
  title: string;
  user_id: string;
  user_name: string;
  teacher_id: string;
  teacher_name: string;
  curriculum_id: number;
  curriculum_title: string;
  skill: string;
  created_at: string;
  updated_at: string;
};

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
  user_id: number | string;
  record_id: string;
}

interface User {
  id: number | string;
  name: string;
}

interface UserRecord {
  title: string;
  content: string;
  homework: string;
  user_id: number | string | undefined;
  chapter_id: number;
}

const RecordAddModal: FC<ModalProps> = (props) => {
  const [curriculumChapters, setCurriculumChapters] = useState<CurriculumChapters[]>([]);
  const [curriculumChapter, setCurriculumChapter] = useState<CurriculumChapters>();
  const [records, setRecords] = useState<Record[]>([]);
  const [users, setUsers] = useState<User[]>([{ id: '', name: '' }]);
  const [teacherData, setTeacherData] = useState<Teacher>({ user_id: 1, record_id: '' });

  const contentSentence =
    '# 内容・やったこと \n\n\n' +
    '# 具体的な内容 \n\n\n' +
    '# ポイント \n\n\n' +
    '# 学習の際の工夫点 \n\n\n' +
    '# 使用した記事 \n\n\n';
  const homeworkSentence =
    '# 次回までの課題 \n\n\n' + '# 参考資料 \n\n\n' + '# 次回までに勉強しておいた方がいいこと\n\n\n';

  const [recordData, setRecordData] = useState<UserRecord>({
    title: '',
    content: contentSentence,
    homework: homeworkSentence,
    user_id: localStorage.getItem('user_id')?.toString(),
    chapter_id: 1,
  });

  const [recordMarkdown, setRecordMarkdown] = useState<string>(contentSentence);
  const [homeworkMarkdown, setHomeworkMarkdown] = useState<string>(homeworkSentence);

  useEffect(() => {
    const getCurriculumChaptersUrl = process.env.CSR_API_URI + '/api/v1/get_curriculums_chapter_for_index';
    const getCurriculumChapters = async (url: string) => {
      const data = await get(url);
      setCurriculumChapters(data);
      setCurriculumChapter(data[0]);
    };
    getCurriculumChapters(getCurriculumChaptersUrl);

    const getRecordsUrl = process.env.CSR_API_URI + '/api/v1/get_records_for_index';
    const getRecords = async (url: string) => {
      setRecords(await get(url));
    };
    getRecords(getRecordsUrl);

    const getUsersUrl = process.env.CSR_API_URI + '/api/v1/users';
    const getUsers = async (url: string) => {
      setUsers(await get(url));
    };
    getUsers(getUsersUrl);
  }, []);

  const recordHandler =
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setRecordData({ ...recordData, [input]: e.target.value });
    };

  const teacherHandler = () => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherData({ ...teacherData, user_id: e.target.value });
  };

  // レコード編集用ハンドラー
  const recordMarkdownHandler = useCallback((value: string) => {
    setRecordMarkdown(value);
  }, []);
  // Homework編集用ハンドラー
  const homeworkMarkdownHandler = useCallback((value: string) => {
    setHomeworkMarkdown(value);
  }, []);

  // カリキュラムとチャプターのセレクトボックスの変更を検知
  const handleCurriculumChapter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurriculumChapter(
        curriculumChapters.find((curriculumChapter) => curriculumChapter.curriculum.id === Number(e.target.value)),
      );
      recordHandler('chapter_id')(e);
    },
    [curriculumChapters, setCurriculumChapter],
  );

  // フォームデータの送信とページの表を再レンダリング
  const submitRecord = async (recordData: any, teacherData: any) => {
    const submitRecordUrl = process.env.CSR_API_URI + '/records';
    const submitData = {
      record: {
        title: recordData.title,
        content: recordMarkdown,
        homework: homeworkMarkdown,
        user_id: recordData.user_id,
        chapter_id: recordData.chapter_id,
      },
      teacher: {
        user_id: teacherData.user_id,
        record_id: 1,
      },
    };
    const req = await post(submitRecordUrl, submitData);
    const res = await req.json();
    const getRecordUrl = process.env.CSR_API_URI + '/api/v1/get_record_for_index_reload/' + res.id;
    const getRes = await get(getRecordUrl);
    const newRecord: Record = getRes[0];
    props.setNewRecords([...records, newRecord]);
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
            <h2>New Record</h2>
          </div>
          <h3 className={s.contentsTitle}>Record Name</h3>
          <div className={s.modalContentContents}>
            <input type='text' placeholder='Input' value={recordData.title} onChange={recordHandler('title')} />
          </div>
          <h3 className={s.contentsTitle}>Contents</h3>
          <SimpleMde value={recordMarkdown} onChange={recordMarkdownHandler} className={s.contentsMde} />
          <h3 className={s.contentsTitle}>Homework</h3>
          <SimpleMde value={homeworkMarkdown} onChange={homeworkMarkdownHandler} className={s.homeworkMde} />
          <h3 className={s.contentsTitle}>Teacher</h3>
          <div className={s.modalContentContents}>
            <select defaultValue={teacherData.user_id} onChange={teacherHandler()}>
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
          <h3 className={s.contentsTitle}>Student</h3>
          <div className={s.modalContentContents}>
            <select defaultValue={recordData.user_id} onChange={recordHandler('user_id')}>
              {users.map((data: User) => {
                if (data.id == recordData.user_id) {
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
            <select defaultValue={1} onChange={handleCurriculumChapter}>
              {curriculumChapters.map((data: CurriculumChapters) => {
                if (data.curriculum.id && data.curriculum.id == recordData.chapter_id) {
                  return (
                    <option key={data.curriculum.id} value={data.curriculum.id} selected>
                      {data.curriculum.title}
                    </option>
                  );
                } else {
                  return (
                    <option key={data.curriculum.id} value={data.curriculum.id}>
                      {data.curriculum.title}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <h3 className={s.contentsTitle}>Chapter</h3>
          <div className={s.modalContentContents}>
            <select defaultValue={1} onChange={recordHandler('chapter_id')}>
              {curriculumChapter?.chapters.map((chapter: Chapter) => {
                if (chapter.id && chapter.id == recordData.chapter_id) {
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
          <div className={s.modalSubmitButton}>
            <Button
              onClick={() => {
                submitRecord(recordData, teacherData);
                props.setIsOpen(false);
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

export default RecordAddModal;
