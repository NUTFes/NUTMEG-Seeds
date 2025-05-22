import React, { FC, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { get, post } from '@utils/api_methods';
import s from './RecordAddModal.module.css';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import RecordAddAnimation from '@components/common/RecordAddAnimation';
import Switch from '@mui/material/Switch';
import { useAuth } from 'src/context/AuthProvider';
import CloseModal from '@components/icons/CloseModal';

const SimpleMde = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  setNewRecords: React.Dispatch<React.SetStateAction<Record[]>>;
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
  user_id: string;
}

interface User {
  id: number | string;
  name: string;
}

interface Skill {
  id: number;
  name: string;
}

const RecordAddModal: FC<ModalProps> = (props) => {
  const { currentUser } = useAuth();
  const [curriculumChapters, setCurriculumChapters] = useState<CurriculumChapters[]>([]);
  const [curriculumChapter, setCurriculumChapter] = useState<CurriculumChapters>();
  const [records, setRecords] = useState<Record[]>([]);
  const [users, setUsers] = useState<User[]>([{ id: '', name: '' }]);
  const [teacherData, setTeacherData] = useState<Teacher>({ user_id: '1' });
  const [isAnimationOpen, setIsAnimationOpen] = useState(false);
  const [newRecordId, setNewRecordId] = useState('');
  // デフォルトで公開状態に変更（true）
  const [release, setRelease] = useState<boolean>(true);
  const { isOpen, setIsOpen } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState('Record Name');
  // デフォルトで公開状態に変更（true）
  const [isActive, setIsActive] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
    setPlaceholder('');
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!recordData.title) {
      setPlaceholder('Record Name');
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const contentSentence = '';
  const homeworkSentence = '';

  const [recordData, setRecordData] = useState<Record>({
    title: '',
    content: contentSentence,
    homework: homeworkSentence,
    user_id: Number(localStorage.getItem('user_id')),
    chapter_id: 1,
    release: true,
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

  const toggleSwitch = () => {
    setRelease(!release);
    setIsActive(!isActive);
  };

  const MAX_TITLE_LENGTH = 36;

  const [titleLength, setTitleLength] = useState(0);

  const handleRecord =
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const value = e.target.value;

    if (input === 'title') {
      if (value.length > MAX_TITLE_LENGTH) {
      } else {
        setRecordData({ ...recordData, [input]: e.target.value });

        setTitleLength(value.length);
      }
    } else {
      setRecordData({ ...recordData, [input]: value });
    }
    };

  const handleTeacher = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherData({ ...teacherData, user_id: e.target.value });
  };

  const handleRecordMarkdown = useCallback((value: string) => {
    setRecordMarkdown(value);
  }, []);
  const handleHomeworkMarkdown = useCallback((value: string) => {
    setHomeworkMarkdown(value);
  }, []);

  const handleCurriculum = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurriculumChapter(
        curriculumChapters.find((curriculumChapter) => curriculumChapter.curriculum.id === Number(e.target.value)),
      );
    },
    [curriculumChapters, setCurriculumChapter],
  );

  const submitRecord = async (recordData: Record, teacherData: Teacher) => {
    const submitRecordUrl = `${process.env.CSR_API_URI}/records`;
    const submitData = {
      record: {
        title: recordData.title,
        content: recordMarkdown,
        homework: homeworkMarkdown,
        user_id: currentUser?.userId,
        chapter_id: recordData.chapter_id,
        release: release,
      },
      teacher: teacherData,
    };

    try {
      const response = await post(submitRecordUrl, submitData);
      if (response.ok) {
        const newRecord = await response.json();
        if (typeof props.setNewRecords === 'function') {
          props.setNewRecords((prevRecords) => [...prevRecords, newRecord]);
        }
        setIsAnimationOpen(true);
        props.setIsOpen(false);
      } else {
        console.error('Failed to add record:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <div className={s.modalContainer}>
      {isAnimationOpen && (
        <RecordAddAnimation
          isOpen={isAnimationOpen}
          setIsOpen={setIsAnimationOpen}
          newRecordId={newRecordId}
          setAddModalOpen={props.setIsOpen}
        />
      )}
      <div className={s.modalInnerContainer}>
        <div className={s.modalContent}>
        <div className={s.addrecordtitle}>
        <h1>AddRecord</h1>
      </div>
          <div className={s.modalHeader}>
            <div className={s.closeButton}>
              <CloseModal onClick={handleCloseModal} color='black' />
            </div>

            <div className={s.modalButtons}>
              <div className={s.releaseToggle}>
                <div className={`${s.toggle} ${isActive ? s.checked : ''}`} onClick={toggleSwitch}>
                  <input type='checkbox' name='check' checked={release} onChange={() => {}} />
                </div>
              </div>
              <div className={s.modalSubmitButton}>
                <Button
                  onClick={() => {
                    submitRecord(recordData, teacherData);
                    setIsAnimationOpen(true);
                  }}
                >
                  Save Draft
                </Button>
              </div>
            </div>
          </div>

          <div className={s.recordContent}>
            <div className={s.editorSection}>
              <div className={s.inputWrap}>
                <input
                  type='text'
                  placeholder={placeholder}
                  value={recordData.title}
                  onChange={handleRecord('title')}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={s.textBox}
                />
                <label className={isFocused ? `${s.label} ${s.focus}` : s.label}>Record Name ( 残りの文字数 : {MAX_TITLE_LENGTH - titleLength} )</label>
              </div>
              <div className={s.mdeWrapper}>
                <div className={s.selectLabel}>Content</div>
                <SimpleMde
                  placeholder='Record Write with Markdown'
                  value={recordMarkdown}
                  onChange={handleRecordMarkdown}
                  className={s.simpleMde}
                />
              </div>
              <div className={s.mdeWrapper}>
                <div className={s.selectLabel}>Homework</div>
                <SimpleMde
                  placeholder='Home Work Write with Markdown'
                  value={homeworkMarkdown}
                  onChange={handleHomeworkMarkdown}
                  className={s.simpleMde}
                />
              </div>
            </div>

            <div className={s.selectSection}>
              <div className={s.teacherSelect}>
                <div className={s.selectWrapper}>
                  <div className={s.selectLabel}>Teacher</div>
                  <select defaultValue={teacherData.user_id} onChange={handleTeacher}>
                    <option value='' hidden>
                      Tap and Choose
                    </option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={s.curriculumSelect}>
                <div className={s.selectWrapper}>
                  <div className={s.selectLabel}>Curriculum</div>
                  <select onChange={handleCurriculum}>
                    <option value='' hidden>
                      Tap and Choose
                    </option>
                    {curriculumChapters.map((curriculum) => (
                      <option key={curriculum.curriculum.id} value={curriculum.curriculum.id}>
                        {curriculum.curriculum.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={s.chapterSelect}>
                <div className={s.selectWrapper}>
                  <div className={s.selectLabel}>Chapter</div>
                  <select onChange={handleRecord('chapter_id')}>
                    <option value='' hidden>
                      Tap and Choose
                    </option>
                    {curriculumChapter?.chapters.map((chapter) => (
                      <option key={chapter.id} value={chapter.id}>
                        {chapter.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordAddModal;
