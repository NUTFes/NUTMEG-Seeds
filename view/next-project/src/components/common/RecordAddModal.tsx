import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { get, post } from '@utils/api_methods';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import rehypeRaw from "rehype-raw"

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
  id: string;
  title: string;
}

interface Teacher {
  user_id: string;
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
  user_id: number | any;
  curriculum_id: string;
}

const UserRecordAddModal: FC<ModalProps> = (props) => {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([{ id: '', title: '' }]);
  const [records, setRecords] = useState<Record[]>([]);
  const [users, setUsers] = useState<User[]>([{ id: '', name: '' }]);
  const [teacherData, setTeacherData] = useState<Teacher>({ user_id: '', record_id: '' });
  
  const contentSentence = '# 内容・やったこと\n\n\n' +
                          '<!-- 具体的な内容 -->\n\n\n' +
                          '<!-- ポイント -->\n\n\n' +
                          '<!-- 学習の際の工夫点 -->\n\n\n' +
                          '<!-- 使用した記事 -->\n\n\n';
  const homeworkSentence = '<!-- 次回までの課題 -->\n\n\n' + 
                           '<!-- 参考資料 -->\n\n\n' +
                           '<!-- 次回までに履修しておいた方がいいこと -->\n\n\n';
                           
  const [recordData, setRecordData] = useState<UserRecord>({
    title: '',
    content: contentSentence,
    homework: homeworkSentence,
    user_id: useRouter().query.id,
    curriculum_id: '',
  });

  useEffect(() => {
    const getCurriculumsUrl = process.env.CSR_API_URI + '/curriculums';
    const getCurriculums = async (url: string) => {
      setCurriculums(await get(url));
    };
    getCurriculums(getCurriculumsUrl);

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
  const teacherHandler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherData({ ...teacherData, user_id: e.target.value });
  };

  // フォームデータの送信とページの表を再レンダリング
  const submitRecord = async (recordData: any, teacherData: any) => {
    const submitRecordUrl = process.env.CSR_API_URI + '/records';
    const req = await post(submitRecordUrl, recordData);
    const res = await req.json()
    const submitTeacherUrl = process.env.CSR_API_URI + '/teachers';
    await post(submitTeacherUrl, {user_id: teacherData.user_id, record_id: res.id});

    const getRecordUrl = process.env.CSR_API_URI + '/api/v1/get_record_for_index_reload/' + res.id;
    const getRes = await get(getRecordUrl);
    const newRecord: Record = getRes[0]
    props.setNewRecords([...records, newRecord])
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Record</h2>
      <div>
        <h3>Record title</h3>
        <input type='text' placeholder='Input' value={recordData.title} onChange={recordHandler('title')} />
      </div>
      <div>
        <h3>Content</h3>
        <div>
        <textarea placeholder='Input' value={recordData.content} onChange={recordHandler('content')} />
          <div>
            <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false} rehypePlugins={[rehypeRaw]}>
              {recordData.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div>
        <h3>Homework</h3>
        <div>
        <textarea placeholder='Input' value={recordData.homework} onChange={recordHandler('homework')} />
          <div>
            <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false} rehypePlugins={[rehypeRaw]}>
              {recordData.homework}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div>
        <h3>Teacher</h3>
        <select defaultValue={teacherData.user_id} onChange={teacherHandler('user_id')}>
          <option value=''>Select</option>
          {users.map((data: User) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Student</h3>
        <select defaultValue={recordData.user_id} onChange={recordHandler('user_id')}>
          <option value=''>Select</option>
          {users.map((data: User) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Curriculum</h3>
        <select defaultValue={recordData.curriculum_id} onChange={recordHandler('curriculum_id')}>
          <option value=''>Select</option>
          {curriculums.map((data: Curriculum) => (
            <option key={data.id} value={data.id}>
              {data.title}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitRecord(recordData, teacherData);
          props.setIsOpen(false)
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default UserRecordAddModal;
