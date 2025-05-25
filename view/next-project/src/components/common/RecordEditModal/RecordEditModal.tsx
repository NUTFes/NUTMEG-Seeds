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
  recordId?: string | string[]; // recordIdをPropsとして受け取る
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
  curriculum_id?: number; // 追加: データ取得時に明示的にcurriculum_idも持つようにする
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
  const recordId = props.recordId || id; // recordIdをpropsから取得、なければrouterから取得

  // -------------- State --------------
  const [curriculumChapters, setCurriculumChapters] = useState<CurriculumChapters[]>([]);
  const [curriculumChapter, setCurriculumChapter] = useState<CurriculumChapters>();
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<number | null>(null);
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
    curriculum_id: 0,
  });

  // 表示用State
  const [displayCurriculumId, setDisplayCurriculumId] = useState<string | number>('');
  const [displayTeacherId, setDisplayTeacherId] = useState<string>('');

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

  // データが読み込まれたかどうか
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // ボタンホバー状態を管理するstate
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // デバッグ用に状態を出力
  useEffect(() => {
    if (isInitialized) {
      console.log("[Debug] Current State:");
      console.log("[Debug] - Curriculum ID (internal):", selectedCurriculumId);
      console.log("[Debug] - Curriculum ID (display):", displayCurriculumId);
      console.log("[Debug] - Teacher ID:", displayTeacherId);
      console.log("[Debug] - Chapter ID:", formData.chapter_id);
      console.log("[Debug] - Current chapter data:", curriculumChapter?.chapters?.find(c => c.id === formData.chapter_id));
    }
  }, [selectedCurriculumId, displayCurriculumId, displayTeacherId, formData.chapter_id, curriculumChapter, isInitialized]);

  // -------------- useEffect --------------
  // 初回および表示時のデータ取得・設定
  useEffect(() => {
    if (!props.isOpen) return; // モーダルが閉じている場合は何もしない
    
    console.log("[Initialize] Modal is now open, starting initialization");
    setIsDataLoaded(false);
    setIsInitialized(false);
    
    // データ初期化処理
    const initializeModal = async () => {
      try {
        console.log("[Initialize] Fetching data for record ID:", recordId);
        
        // レコード情報と関連データの取得
        let recordData, teacherData, recordWithRelations;
        let curriculumsData: CurriculumChapters[] = [];
        let usersData: User[] = [];

        // データ取得のためのURL
        const getCurriculumChaptersUrl = process.env.CSR_API_URI + '/api/v1/get_curriculums_chapter_for_index';
        const getUsersUrl = process.env.CSR_API_URI + '/api/v1/users';
        
        // ユーザ一覧とカリキュラム情報の取得
        [curriculumsData, usersData] = await Promise.all([
          get(getCurriculumChaptersUrl),
          get(getUsersUrl)
        ]);
        
        console.log("[Initialize] Loaded curriculum chapters:", curriculumsData.length);
        console.log("[Initialize] Loaded users:", usersData.length);
        
        // Stateを更新
        setCurriculumChapters(curriculumsData);
        setUsers(usersData);
        
        // 編集モード（既存レコードの取得）
        if (recordId) {
          console.log("[Initialize] Fetching existing record data for ID:", recordId);
          
          const recordUrl = `${process.env.CSR_API_URI}/records/${recordId}`;
          const teacherUrl = `${process.env.CSR_API_URI}/api/v1/get_teacher_by_record/${recordId}`;
          // エラーが出ているAPIエンドポイントを修正
          const recordWithRelationsUrl = `${process.env.CSR_API_URI}/api/v1/get_record_for_view/${recordId}`;
          
          try {
            [recordData, teacherData, recordWithRelations] = await Promise.all([
              get(recordUrl),
              get(teacherUrl),
              get(recordWithRelationsUrl)
            ]);
            
            // 結果のログ出力
            console.log("[Initialize] Record data:", recordData);
            console.log("[Initialize] Teacher data:", teacherData);
            console.log("[Initialize] Record with relations:", recordWithRelations);
            
            // Record関連データをセット
            setRecord(recordWithRelations);
            
            // Teacher情報をセット - 動作確認済み
            if (teacherData && teacherData.user_id) {
              console.log("[Initialize] Setting teacher ID:", teacherData.user_id);
              setTeacherData(teacherData);
              setDisplayTeacherId(teacherData.user_id);
            }
            
            // カリキュラムデータの処理 - ここが改善ポイント
            let curriculumId: number | undefined = undefined;
            
            // レコードの基本情報をセット
            if (recordData) {
              console.log("[Initialize] Setting form data. Chapter ID:", recordData.chapter_id);
              setFormData(recordData);
              setRecordMarkdown(recordData.content || '');
              setHomeworkMarkdown(recordData.homework || '');
              setTitleLength(recordData.title ? recordData.title.length : 0);
              
              // 公開状態の設定
              const isReleased = recordData.release === true;
              setRelease(isReleased);
              setIsActive(isReleased);
            }
            
            // recordWithRelationsからカリキュラム情報を取得
            if (recordWithRelations && recordWithRelations.curriculum && recordWithRelations.curriculum.id) {
              curriculumId = Number(recordWithRelations.curriculum.id);
              console.log("[Initialize] Found curriculum from relations. ID:", curriculumId);
              
              // Teacherと同様に直接表示値を設定
              setSelectedCurriculumId(curriculumId);
              setDisplayCurriculumId(curriculumId);
              
              // 対応するカリキュラムをcurriculumChaptersから検索
              const matchingCurriculum = curriculumsData.find(
                c => c.curriculum.id === curriculumId
              );
              
              if (matchingCurriculum) {
                console.log("[Initialize] Found matching curriculum:", matchingCurriculum.curriculum.title);
                console.log("[Initialize] Has chapters:", matchingCurriculum.chapters?.length || 0);
                setCurriculumChapter(matchingCurriculum);
                
                // formDataの更新では直接curriculumIdを使用 (nullの場合はundefinedに)
                if (curriculumId !== undefined) {
                  setFormData(prev => ({
                    ...prev,
                    curriculum_id: curriculumId
                  }));
                }
              } else {
                console.warn("[Initialize] Curriculum not found in available curricula");
              }
            } else {
              console.log("[Initialize] No curriculum data in record relation");
            }
          } catch (error) {
            console.error("[Initialize] Error fetching record data:", error);
          }
          
        } else {
          // 新規作成モードの場合
          console.log("[Initialize] New record mode");
        }
        
        // 初期化完了
        setIsDataLoaded(true);
        setIsInitialized(true);
        console.log("[Initialize] Initialization completed");
        
      } catch (error) {
        console.error("[Initialize] データ取得エラー:", error);
        setIsDataLoaded(true);
        setIsInitialized(true);
      }
    };
    
    initializeModal();
    
  }, [props.isOpen, recordId]);

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
        
        // chapter_idの場合、数値に変換
        if (input === 'chapter_id') {
          const numValue = value ? Number(value) : 0;
          console.log("[Handler] Chapter ID changed to:", numValue);
        }
      }
    };

  // Teacher選択
  const teacherHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log("[Handler] Teacher selected:", value);
    setDisplayTeacherId(value);
    setTeacherData({ ...teacherData, user_id: value, record_id: String(recordId) });
  };

  // Curriculum選択
  const handleCurriculum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      console.log("[Handler] No curriculum selected");
      setSelectedCurriculumId(null);
      setDisplayCurriculumId('');
      setCurriculumChapter(undefined);
      setFormData(prev => ({...prev, chapter_id: 0, curriculum_id: undefined}));
      return;
    }
    
    const selectedId = Number(value);
    console.log("[Handler] Curriculum selected:", selectedId);
    
    const selected = curriculumChapters.find((c: CurriculumChapters) => c.curriculum.id === selectedId);
    if (selected) {
      console.log("[Handler] Found curriculum:", selected.curriculum.title);
      console.log("[Handler] Has chapters:", selected.chapters?.length || 0);
      
      setSelectedCurriculumId(selectedId);
      setDisplayCurriculumId(selectedId);
      setCurriculumChapter(selected);
      
      // カリキュラム変更時はchapter_idをリセットし、curriculum_idを設定
      setFormData(prev => ({
        ...prev, 
        chapter_id: 0,
        curriculum_id: selectedId
      }));
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

  // ボタンの有効/無効を判定する関数
  const isSubmitDisabled = () => {
    return !displayCurriculumId || !formData.chapter_id || !displayTeacherId || displayTeacherId === '';
  };

  // Save Draftボタンが無効な理由を取得する関数
  const getDisableReason = () => {
    const missingItems = [];
    
    if (!displayTeacherId || displayTeacherId === '') {
      missingItems.push('Teacherを選択してください');
    }
    if (!displayCurriculumId) {
      missingItems.push('Curriculumを選択してください');
    }
    if (!formData.chapter_id) {
      missingItems.push('Chapterを選択してください');
    }

    return missingItems.join('、');
  };

  // -------------- Submit --------------
  const submitRecord = async () => {
    // 送信データの準備
    const recordSubmitData: any = {
      title: formData.title,
      content: recordMarkdown,
      homework: homeworkMarkdown,
      user_id: formData.user_id,
      release: release,
    };
    
    // チャプターIDが選択されている場合は含める
    // 0やundefinedの場合もAPI側でNULLとして処理されるので明示的に含める
    recordSubmitData.chapter_id = formData.chapter_id || 0;
    console.log("[Submit] Including chapter_id:", recordSubmitData.chapter_id);
    
    // 選択されているカリキュラムIDがある場合は明示的に含める
    // これにより、バックエンドでカリキュラムとチャプターの関連付けが正しく行われる
    if (selectedCurriculumId) {
      recordSubmitData.curriculum_id = selectedCurriculumId;
      console.log("[Submit] Including curriculum_id:", selectedCurriculumId);
    }
    
    // レコードの更新
    const submitRecordUrl = `${process.env.CSR_API_URI}/records/${recordId}`;
    const submitData = {
      record: recordSubmitData
    };
    
    console.log("[Submit] Sending record data:", JSON.stringify(submitData));
    
    try {
      const response = await put(submitRecordUrl, submitData);
      console.log('[Submit] Record updated:', response);
      return true;
    } catch (error) {
      console.error('[Submit] Error updating record:', error);
      return false;
    }
  };

  const submitTeacher = async () => {
    // Teacherの更新
    if (!teacherData.user_id) {
      console.error('[Submit] Teacher user_id is required');
      return false;
    }
    
    try {
      const submitTeacherUrl = `${process.env.CSR_API_URI}/teachers/${teacherData.id}`;
      const submitData: Teacher = {
        user_id: teacherData.user_id,
        record_id: String(recordId),
      };
      console.log("[Submit] Sending teacher data:", JSON.stringify(submitData));
      
      const response = await put(submitTeacherUrl, submitData);
      console.log('[Submit] Teacher updated:', response);
      return true;
    } catch (error) {
      console.error('[Submit] Error updating teacher:', error);
      return false;
    }
  };

  // 変更を保存して編集画面を閉じる
  const handleSubmit = async () => {
    console.log('[Submit] Submit button clicked');
    console.log('[Submit] Current form state:', {
      title: formData.title,
      content: (recordMarkdown || '').substring(0, 50) + '...', // 長すぎるので省略
      homework: (homeworkMarkdown || '').substring(0, 50) + '...', // 長すぎるので省略
      user_id: formData.user_id,
      chapter_id: formData.chapter_id,
      curriculum_id: selectedCurriculumId || formData.curriculum_id,
      release: release,
      teacher_user_id: teacherData.user_id,
      displayCurriculum: displayCurriculumId,
      displayTeacher: displayTeacherId
    });
    
    const recordSuccess = await submitRecord();
    const teacherSuccess = await submitTeacher();
    
    if (recordSuccess && teacherSuccess) {
      console.log('[Submit] All updated successfully, closing modal and reloading page');
      // 成功したらモーダルを閉じる
      props.setIsOpen(false);
      // ページをリロード
      router.reload();
    } else {
      console.error('[Submit] Update failed');
      alert('更新に失敗しました。再度お試しください。');
    }
  };

  // 閉じる
  const handleClose = () => {
    props.setIsOpen(false);
  };

  // Chapterドロップダウンのオプション表示
  const renderChapterOptions = () => {
    if (!curriculumChapter || !curriculumChapter.chapters || curriculumChapter.chapters.length === 0) {
      return null;
    }
    
    return curriculumChapter.chapters.map((chapter: Chapter) => (
      <option key={chapter.id} value={chapter.id}>
        {chapter.title}
      </option>
    ));
  };
  
  // カリキュラムが選択されているか
  const hasCurriculum = displayCurriculumId !== '' && displayCurriculumId !== 0;
  
  // チャプタードロップダウンのプレースホルダーテキスト
  const getChapterPlaceholderText = () => {
    if (!hasCurriculum) {
      return 'カリキュラムを選択してください';
    }
    
    if (!curriculumChapter || !curriculumChapter.chapters || curriculumChapter.chapters.length === 0) {
      return 'チャプターがありません';
    }
    
    return 'チャプターを選択してください';
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
                  <div className={s.modalSubmitButton} style={{ position: 'relative' }}>
                    <div
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                    >
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled()}
                      >
                        Save Draft
                      </Button>
                    </div>
                    {isSubmitDisabled() && isButtonHovered && (
                      <div style={{ 
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '6px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        zIndex: 1000,
                        marginTop: '4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}>
                        {getDisableReason()}
                        <div style={{
                          position: 'absolute',
                          top: '-5px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '5px solid transparent',
                          borderRight: '5px solid transparent',
                          borderBottom: '5px solid #333'
                        }} />
                      </div>
                    )}
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
                        value={displayTeacherId}
                        onChange={teacherHandler}
                      >
                        <option value=''>Tap and Choose</option>
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
                        value={displayCurriculumId}
                        onChange={handleCurriculum}
                      >
                        <option value=''>Tap and Choose</option>
                        {curriculumChapters.map((c: CurriculumChapters) => (
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
                        value={formData.chapter_id || ''}
                        onChange={handler('chapter_id')}
                      >
                        <option value=''>
                          {getChapterPlaceholderText()}
                        </option>
                        {renderChapterOptions()}
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
