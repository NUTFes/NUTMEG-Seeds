import React, { FC, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { get, post } from '@utils/api_methods';
import s from './ChapterAddModal.module.css';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useUI } from '@components/ui/context';

const SimpleMde = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface Chapter {
  id?: number;
  title: string;
  content: string;
  homework: string;
  curriculum_id: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

const ChapterAddModal: FC = () => {
  const router = useRouter();
  const { closeModal } = useUI();

  const contentSentence =
    '# 内容・やったこと \n\n\n' +
    '# 具体的な内容 \n\n\n' +
    '# ポイント \n\n\n' +
    '# 学習の際の工夫点 \n\n\n' +
    '# 使用した記事 \n\n\n';
  const homeworkSentence =
    '# 次回までの課題 \n\n\n' + '# 参考資料 \n\n\n' + '# 次回までに勉強しておいた方がいいこと\n\n\n';

  const [chapter, setChapter] = useState<Chapter>({
    title: '',
    content: contentSentence,
    homework: homeworkSentence,
    curriculum_id: router.query.slug as string,
    order: 0,
  });

  const [chapterMarkdown, setChapterMarkdown] = useState<string>(contentSentence);
  const [homeworkMarkdown, setHomeworkMarkdown] = useState<string>(homeworkSentence);

  // orderの初期値を設定
  useEffect(() => {
    (async () => {
      const id = router.query.slug;
      const getUrl = `${process.env.CSR_API_URI}/api/v1/get_curriculum_chapter_for_view/${id}`;
      const json = await get(getUrl);
      setChapter({ ...chapter, order: json[0].chapter.length + 1 });
    })();
  }, []);

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

  // コンテンツ編集用ハンドラー
  const chapterMarkdownHandler = useCallback((value: string) => {
    setChapterMarkdown(value);
  }, []);
  // Homework編集用ハンドラー
  const homeworkMarkdownHandler = useCallback((value: string) => {
    setHomeworkMarkdown(value);
  }, []);

  // フォームデータの送信とページの表を再レンダリング
  const submitChapter = async () => {
    const submitUrl = process.env.CSR_API_URI + '/chapters';
    await post(submitUrl, chapter);
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
            <h2>New Chapter</h2>
          </div>
          <h3 className={s.contentsTitle}>Chapter Name</h3>
          <div className={s.modalContentContents}>
            <input type='text' placeholder='Input' value={chapter.title} onChange={handler('title')} />
          </div>
          <h3 className={s.contentsTitle}>Contents</h3>
          <SimpleMde value={chapterMarkdown} onChange={chapterMarkdownHandler} className={s.contentsMde} />
          <h3 className={s.contentsTitle}>Homework</h3>
          <SimpleMde value={homeworkMarkdown} onChange={homeworkMarkdownHandler} className={s.homeworkMde} />
          <div className={s.modalSubmitButton}>
            <Button onClick={submitChapter}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterAddModal;
