import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get, put } from '@utils/api_methods';
import s from './ChangeChapterOrderModal.module.css';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import ShadowCard from '@components/common/ShadowCard';
import { switchChapterIcon } from '@utils/switchChapterIcon';

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

interface Props {
  closeModal: () => void;
}

const ChangeChapterOrderModal: FC<Props> = (props) => {
  const router = useRouter();

  const [sortedChapters, setSortedChapters] = useState<Chapter[]>([]);
  // チャプターをorder順に並び替えるためのソート関数
  const sort = (array: Chapter[]) => {
    return array.sort((a, b) => a.order - b.order);
  };

  useEffect(() => {
    (async () => {
      const id = router.query.slug;
      const getUrl = `${process.env.CSR_API_URI}/api/v1/get_curriculum_chapter_for_view/${id}`;
      const json = await get(getUrl);
      setSortedChapters(sort(json[0].chapter));
    })();
  }, [router]);

  const handler =
    (id: number | undefined, input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setSortedChapters(
        sortedChapters.map((chapter: Chapter) =>
          chapter.id === id ? { ...chapter, [input]: e.target.value } : chapter,
        ),
      );
    };

  // フォームデータの送信とページの表を再レンダリング
  const updateChapters = () => {
    sortedChapters.map(async (chapter: Chapter) => {
      const submitUrl = `${process.env.CSR_API_URI}/chapters/${chapter.id}`;
      await put(submitUrl, chapter);
    });
    props.closeModal;
    router.reload();
  };

  return (
    <div className={s.modalContainer}>
      <div className={s.modalInnerContainer}>
        <div className={s.modalContent}>
          <div className={s.modalContentClose}>
            <button className={s.modalContentCloseIcon} onClick={props.closeModal}>
              <Close width={24} height={24} color={'var(--accent-4)'} />
            </button>
          </div>
          <div className={s.modalName}>
            <h2>Change Chapter Order</h2>
          </div>
          {sortedChapters?.map((chapter: Chapter, index: number) => (
            <div className={s.chapters} key={index}>
              <div className={s.orderArea}>
                <input value={chapter.order} onChange={handler(chapter.id, 'order')} />
              </div>
              <div className={s.chapter}>
                <ShadowCard>
                  <div className={s.chapterContainer}>
                    <div className={s.chapterIcon}>{switchChapterIcon(sortedChapters.length, index)}</div>
                    <div className={s.chapterInfo}>
                      <span className={s.chapterTitle}>{chapter.title}</span>
                      <span className={s.chapterContent}>{chapter.content}</span>
                    </div>
                  </div>
                </ShadowCard>
              </div>
            </div>
          ))}
          <div className={s.modalSubmitButton}>
            <Button onClick={updateChapters}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeChapterOrderModal;
