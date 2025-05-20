import React, { FC, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { get, put } from '@utils/api_methods';
import Button from '@components/common/TestButton';
// ↓ RecordAddModal で使用しているアイコンに合わせる
import CloseModal from '@components/icons/CloseModal';
import s from './RecordEditModal.module.css';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';

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

interface RecordData {
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
  record: RecordData | any;
  curriculum: Curriculum | any;
  curriculum_title: string;
  teacher: string;
  user: string;
  skill: string;
}

const RecordEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;

  // -------------- State --------------
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

  // Recordのフォームデータ
  const [formData, setFormData] = useState<RecordData>({
    title: '',
    content: '',
    homework: '',
    user_id: 0,
    chapter_id: 0,
    release: false,
  });

  // Markdown用
  const [recordMarkdown, setRecordMarkdown] = useState<string>('');
  const [homeworkMarkdown, setHomeworkMarkdown] = useState<string>('');

  // RecordAddModal同様、公開/非公開を切り替えるカスタムトグル
  const [release, setRelease] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  // タイトルの最大文字数（RecordAddModalに合わせる）
  const MAX_TITLE_LENGTH = 36;
  const [titleLength, setTitleLength] = useState(0);

  // フォーカス時のラベルアニメーション対応
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState('Record Name');

  // -------------- useEffect --------------
  useEffect(() => {
    // カリキュラム一覧取得
    const getCurriculumChaptersUrl = process.env.CSR_API_URI + '/api/v1/get_curriculums_chapter_for_index';
    get(getCurriculumChaptersUrl).then((data) => {
      setCurriculumChapters(data);
      setCurriculumChapter(data[0]); // 初期値で一旦先頭をセット
    });

    // ユーザ一覧取得
    const getUsersUrl = process.env.CSR_API_URI + '/api/v1/users';
    get(getUsersUrl).then((res) => setUsers(res));

    // レコード詳細の取得
    if (router.isReady && id) {
      const getFormDataUrl = `${process.env.CSR_API_URI}/records/${id}`;
      get(getFormDataUrl).then((res) => {
        setFormData(res);
        setRecordMarkdown(res.content);
        setHomeworkMarkdown(res.homework);
        setRelease(res.release);
        setTitleLength(res.title.length);
      });

      // Teacher情報の取得
      const getTeacherDataUrl = `${process.env.CSR_API_URI}/api/v1/get_teacher_by_record/${id}`;
      get(getTeacherDataUrl).then((res) => {
        setTeacherData(res);
      });

      // Record + Curriculum + Teacherまとめて取るAPI
      const getRecordUrl = `${process.env.CSR_API_URI}/api/v1/record/${id}`;
      get(getRecordUrl).then((res) => {
        setRecord(res);
      });
    }
  }, [id, router.isReady]);

  // -------------- Handler --------------

  // トグル（公開/非公開）の切り替え
  const toggleSwitch = () => {
    setRelease(!release);
    setIsActive(!isActive);
  };

  // input系共通ハンドラ
  const handler =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      // タイトルの文字数制御
      if (input === 'title') {
        if (value.length <= MAX_TITLE_LENGTH) {
          setFormData({ ...formData, title: value });
          setTitleLength(value.length);
        }
      } else {
        setFormData({ ...formData, [input]: value });
      }
    };

  // Teacher選択
  const teacherHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // teacherDataにも記録
    setTeacherData({ ...teacherData, user_id: e.target.value, record_id: String(id) });
  };

  // Curriculum選択
  const handleCurriculum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = curriculumChapters.find((c) => c.curriculum.id === Number(e.target.value));
    if (selected) {
      setCurriculumChapter(selected);
    }
  };

  // Record内容のMarkdown編集
  const recordMarkdownHandler = useCallback((value: string) => {
    setRecordMarkdown(value);
  }, []);

  // Homework内容のMarkdown編集
  const homeworkMarkdownHandler = useCallback((value: string) => {
    setHomeworkMarkdown(value);
  }, []);

  // フォーカス時のラベルアニメーション
  const handleFocus = () => {
    setIsFocused(true);
    setPlaceholder('');
  };
  const handleBlur = () => {
    setIsFocused(false);
    if (!formData.title) {
      setPlaceholder('Record Name');
    }
  };

  // -------------- Submit --------------
  const submitRecord = async () => {
    // レコードの更新
    const submitRecordUrl = `${process.env.CSR_API_URI}/records/${id}`;
    const submitData = {
      record: {
        title: formData.title,
        content: recordMarkdown,
        homework: homeworkMarkdown,
        user_id: formData.user_id,
        chapter_id: formData.chapter_id,
        release: release,
      },
    };
    await put(submitRecordUrl, submitData);
  };

  const submitTeacher = async () => {
    // Teacherの更新
    // 既に teacher.id があればPUT、なければPOSTの可能性もありますが、
    // ここではPUT前提に。
    const submitTeacherUrl = `${process.env.CSR_API_URI}/teachers/${teacherData.id}`;
    const submitData: Teacher = {
      user_id: teacherData.user_id,
      record_id: teacherData.record_id,
    };
    await put(submitTeacherUrl, submitData);
    router.reload();
  };

  // 閉じる
  const handleClose = () => {
    props.setIsOpen(false);
  };

  return (
    <>
      {props.isOpen && (
        <div className={s.modalContainer}>
          <div className={s.modalInnerContainer}>
            <div className={s.modalContent}>
              <div className={s.editrecordtitle}>
                <h1>EditRecord</h1>
              </div>
              {/* ヘッダー */}
              <div className={s.modalHeader}>
                <div className={s.closeButton}>
                  <CloseModal onClick={handleClose} color='black' />
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
                        submitRecord();
                        submitTeacher();
                      }}
                    >
                      Save Draft
                    </Button>
                  </div>
                </div>
              </div>

              {/* コンテンツ */}
              <div className={s.recordContent}>
                {/* 左側エディタセクション */}
                <div className={s.editorSection}>
                  {/* タイトル入力 */}
                  <div className={s.inputWrap}>
                    <input
                      type='text'
                      placeholder={placeholder}
                      value={formData.title}
                      onChange={handler('title')}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={s.textBox}
                    />
                    <label className={isFocused ? `${s.label} ${s.focus}` : s.label}>
                      Record Name ( 残りの文字数 : {MAX_TITLE_LENGTH - titleLength} )
                    </label>
                  </div>

                  {/* Record内容(Markdown) */}
                  <div className={s.mdeWrapper}>
                    <div className={s.selectLabel}>Content</div>
                    <SimpleMde
                      placeholder='Record Write with Markdown'
                      value={recordMarkdown}
                      onChange={recordMarkdownHandler}
                      className={s.simpleMde}
                    />
                  </div>

                  {/* Homework(Markdown) */}
                  <div className={s.mdeWrapper}>
                    <div className={s.selectLabel}>Homework</div>
                    <SimpleMde
                      placeholder='Home Work Write with Markdown'
                      value={homeworkMarkdown}
                      onChange={homeworkMarkdownHandler}
                      className={s.simpleMde}
                    />
                  </div>
                </div>

                {/* 右側セレクトセクション */}
                <div className={s.selectSection}>
                  {/* Teacher */}
                  <div className={s.teacherSelect}>
                    <div className={s.selectWrapper}>
                      <div className={s.selectLabel}>Teacher</div>
                      <select
                        // teacherData.user_id を反映
                        value={teacherData.user_id || ''}
                        onChange={teacherHandler}
                      >
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

                  {/* Curriculum */}
                  <div className={s.curriculumSelect}>
                    <div className={s.selectWrapper}>
                      <div className={s.selectLabel}>Curriculum</div>
                      <select
                        // 選択中のカリキュラムIDを反映
                        value={curriculumChapter?.curriculum.id ?? ''}
                        onChange={handleCurriculum}
                      >
                        <option value='' hidden>
                          Tap and Choose
                        </option>
                        {curriculumChapters.map((c) => (
                          <option key={c.curriculum.id} value={c.curriculum.id}>
                            {c.curriculum.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Chapter */}
                  <div className={s.chapterSelect}>
                    <div className={s.selectWrapper}>
                      <div className={s.selectLabel}>Chapter</div>
                      <select
                        // formData.chapter_id を反映
                        value={formData.chapter_id || ''}
                        onChange={handler('chapter_id')}
                      >
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
              {/* コンテンツここまで */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecordEditModal;
