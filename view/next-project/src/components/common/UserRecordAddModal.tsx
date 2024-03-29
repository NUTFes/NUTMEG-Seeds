import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {get, post} from '@utils/api_methods';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  setUserRecords: Function;
  userRecords: UserRecord[];
}

interface Curriculum {
  id: string;
  title: string;
}

interface Record {
  id: string;
  title: string;
}

interface TeacherData {
  user_id: string;
  record_id: string;
}

interface Record {
  id: string;
  title: string;
}

interface User {
  id: number | string;
  name: string;
}

interface Teacher {
  name: string;
}

interface UserRecord {
  id: string;
  title: string;
  teacher: Teacher;
}

interface FormData {
  title: string;
  content: string;
  homework: string;
  user_id: number | any;
  curriculum_id: string;
}

const UserRecordAddModal: FC<ModalProps> = (props) => {
  const router = useRouter();

  const [curriculums, setCurriculums] = useState<Curriculum[]>([{id: '', title: ''}]);
  const [records, setRecords] = useState<Record[]>([{id: '', title: ''}]);
  const [users, setUsers] = useState<User[]>([{id: '', name: ''}]);
  const [teacherData, setTeacherData] = useState<TeacherData>({user_id: '', record_id: ''});
  const [recordData, setRecordData] = useState<FormData>({
    title: '',
    content: '',
    homework: '',
    user_id: router.query.id,
    curriculum_id: '',
  });

  useEffect(() => {
    const getCurriculumsUrl = process.env.CSR_API_URI + '/curriculums';
    const getCurriculums = async (url: string) => {
      setCurriculums(await get(url));
    };
    getCurriculums(getCurriculumsUrl);

    const getRecordsUrl = process.env.CSR_API_URI + '/records';
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
        setRecordData({...recordData, [input]: e.target.value});
      };
  const teacherHandler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherData({user_id: e.target.value, record_id: records.slice(-1)[0].id + 1});
  };

  const submitRecord = async (recordData: any, teacherData: any) => {
    const submitRecordUrl = process.env.CSR_API_URI + '/records';
    await post(submitRecordUrl, recordData);
    const submitTeacherUrl = process.env.CSR_API_URI + '/teachers';
    await post(submitTeacherUrl, teacherData);
    const getUserRecordUrl = process.env.CSR_API_URI + '/api/v1/get_user_records_for_reload_view/' + router.query.id;
    const getRes = await get(getUserRecordUrl);
    const newRecord: UserRecord = getRes[0].records[getRes[0].records.length - 1];
    props.setUserRecords([newRecord, ...props.userRecords]);
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Record</h2>
      <div>
        <h3>Record title</h3>
        <input type='text' placeholder='Input' value={recordData.title} onChange={recordHandler('title')}/>
      </div>
      <div>
        <h3>Content</h3>
        <textarea placeholder='Input' value={recordData.content} onChange={recordHandler('content')}/>
      </div>
      <div>
        <h3>Homework</h3>
        <textarea placeholder='Input' value={recordData.homework} onChange={recordHandler('homework')}/>
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
          props.setIsOpen(false);
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default UserRecordAddModal;
