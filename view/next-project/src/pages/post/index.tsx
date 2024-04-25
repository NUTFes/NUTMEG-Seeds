import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'src/context/AuthProvider';
import { getWithToken } from '@utils/api_methods';
import styles from './RecordCard.module.css';
import ListHeader from '@components/common/ListHeader';
import PostLayout from '@components/layout/PostLayout';
import { RiDraftLine } from 'react-icons/ri';

type Record = {
  id: number;
  title: string;
  content: string;
  homework: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  release: boolean;
};

const RecordCard: React.FC<{ record: Record }> = ({ record }) => {
  const router = useRouter();
  const contentLength = record.content.length;

  return (
    <div className={styles.cardContainer} onClick={() => router.push(`/post/${record.id}`)}>
      <div>
        <RiDraftLine className={styles.cardIcon} />
        <div className={styles.cardTitle}>{record.title}</div>
      </div>
      <div className={styles.cardContentLength}>総文字数: {contentLength} </div>
      <div className={styles.cardUpdated}>最終更新日: {new Date(record.updated_at).toLocaleDateString()}</div>
    </div>
  );
};

const PostPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [drafts, setDrafts] = useState<Record[]>([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (currentUser) {
        const url = `${process.env.CSR_API_URI}/api/v1/get_drafts_for_user/${currentUser.userId}`;
        const drafts = await getWithToken(url, currentUser);
        setDrafts(drafts);
      }
    };
    fetchDrafts();
  }, [currentUser]);

  return (
    <PostLayout>
      <div className={styles.sample}></div>
      <ListHeader title='Drafts' />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' }}>
        {drafts.map((draft) => (
          <RecordCard key={draft.id} record={draft} />
        ))}
      </div>
    </PostLayout>
  );
};

export default PostPage;
