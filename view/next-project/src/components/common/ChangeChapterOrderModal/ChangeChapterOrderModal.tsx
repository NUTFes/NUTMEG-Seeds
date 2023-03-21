import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { get, put } from '@utils/api_methods';
import s from './ChangeChapterOrderModal.module.css';
import Button from '@components/common/TestButton';
import Close from '@components/icons/Close';
import { existSameValue } from 'src/utils';
import ChapterCard from '@components/common/ChapterCard';

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

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortedChapters, setSortedChapters] = useState<Chapter[]>([]);
  const [orders, setOrders] = useState<number[]>([]);

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
      setOrders([...Array(json[0].chapter.length)].map((_, i) => i + 1));
    })();
  }, [router]);

  // orderの変更を反映
  const handleOrder =
    (id: number | undefined, index: number) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      // 該当するチャプターのorderを変更
      setSortedChapters(
        sortedChapters.map((chapter: Chapter) =>
          chapter.id === id ? { ...chapter, order: Number(e.target.value) } : chapter,
        ),
      );
      setOrders(orders.map((order: number, i: number) => (i === index ? Number(e.target.value) : order)));
    };

  // orderがチャプター数の範囲外ではないかチェック
  const isOutsideOrder = (chapters: Chapter[]): boolean => {
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].order > sortedChapters.length) {
        return true;
      } else if (chapters[i].order < 1) {
        return true;
      }
    }
    return false;
  };

  // フォームデータの送信とページの表を再レンダリング
  const onSubmit = () => {
    // sortedChapters.map((chapter: Chapter) => {
    //   setOrders((orders) => [...orders, chapter.order]);
    // });
    // existSameValue(orders);

    if (existSameValue(orders)) {
      setSuccess(false);
      setErrorMessage('orderが重複しています');
      return;
    } else if (isOutsideOrder(sortedChapters)) {
      setSuccess(false);
      setErrorMessage('orderがチャプターの範囲外です');
      return;
    } else {
      setSuccess(false);
      setErrorMessage('');
    }

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
                <input
                  value={chapter.order}
                  type='number'
                  min='1'
                  max={sortedChapters?.length}
                  onChange={handleOrder(chapter.id, index)}
                />
              </div>
              <div className={s.chapter}>
                <ChapterCard chapter={chapter} index={index} length={sortedChapters.length} />
              </div>
            </div>
          ))}
          <div className={s.status}>
            {success ? (
              <p className={s.success}>パスワードを更新しました</p>
            ) : (
              <p className={s.error}>{errorMessage}</p>
            )}
          </div>
          <div className={s.modalSubmitButton}>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeChapterOrderModal;
