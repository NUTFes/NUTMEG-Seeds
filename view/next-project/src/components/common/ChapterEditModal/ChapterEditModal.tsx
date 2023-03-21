import React, { FC, useEffect, useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { put } from '@utils/api_methods';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import s from './ChapterEditModal.module.css';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';

const SimpleMde = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  chapter: Chapter;
  setChapter: Dispatch<SetStateAction<Chapter>>;
  curriculums: Curriculum[];
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

const ChapterEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();

  const [chapterMarkdown, setChapterMarkdown] = useState<string>(props.chapter.content);
  const [homeworkMarkdown, setHomeworkMarkdown] = useState<string>(props.chapter.homework);

  const [chapter, setChapter] = useState<Chapter>({
    title: props.chapter.title,
    content: chapterMarkdown,
    homework: homeworkMarkdown,
    curriculum_id: props.chapter.curriculum_id,
    order: props.chapter.order,
  });

  const handler =
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setChapter({ ...chapter, [input]: e.target.value });
    };

  // チャプター編集用ハンドラー
  const chapterMarkdownHandler = useCallback((value: string) => {
    setChapterMarkdown(value);
  }, []);
  // Homework編集用ハンドラー
  const homeworkMarkdownHandler = useCallback((value: string) => {
    setHomeworkMarkdown(value);
  }, []);

  const submit = async (data: Chapter) => {
    const submitUrl = process.env.CSR_API_URI + '/chapters/' + router.query.id;
    const submitData: Chapter = {
      title: data.title,
      content: chapterMarkdown,
      homework: homeworkMarkdown,
      curriculum_id: data.curriculum_id,
      order: data.order,
    };
    await put(submitUrl, submitData);
    props.setChapter(submitData);
    props.setIsOpen(false);
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
            <h2>Edit Chapter</h2>
          </div>
          <h3 className={s.contentsTitle}>Chapter Name</h3>
          <div className={s.modalContentContents}>
            <input type='text' placeholder='Input' value={chapter.title} onChange={handler('title')} />
          </div>
          <h3 className={s.contentsTitle}>Contents</h3>
          <SimpleMde value={chapter.content} onChange={chapterMarkdownHandler} className={s.contentsMde} />
          <h3 className={s.contentsTitle}>Homework</h3>
          <SimpleMde value={chapter.homework} onChange={homeworkMarkdownHandler} className={s.homeworkMde} />
          <h3 className={s.contentsTitle}>Curriculum</h3>
          <div className={s.modalContentContents}>
            <select defaultValue={chapter.curriculum_id} onChange={handler('curriculum_id')}>
              {props.curriculums.map((data: Curriculum) => {
                if (data.id && data.id == chapter.curriculum_id) {
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
                submit(chapter);
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

export default ChapterEditModal;
