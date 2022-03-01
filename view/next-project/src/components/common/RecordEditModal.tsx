import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {get, put} from '@utils/api_methods';
import EditModal from '@components/common/EditModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

interface Teacher {
  id: string;
  user_id: string;
  record_id: string;
}

interface User {
  id: string;
  name: string;
}

interface Curriculum {
  id: string;
  title: string;
}

interface Record {
  id: string;
  title: string;
}

interface RecordCurriculumTeacher {
  record: Record | any;
  curriculum: Curriculum | any;
  teacher: string;
  user: string;
  skill: string;
}

const RecordEditModal: FC<ModalProps> = (props) => {
  const router = useRouter();
  const query = router.query;

  const [curriculums, setCurriculums] = useState<Curriculum[]>([{id: '', title: ''}]);
  const [users, setUsers] = useState<User[]>([{id: '', name: ''}]);
  const [teacherData, setTeacherData] = useState<Teacher>({id: '', user_id: '', record_id: ''});
  const [record, setRecord] = useState<RecordCurriculumTeacher>({
    record: null,
    curriculum: null,
    teacher: '',
    user: '',
    skill: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    homework: '',
    user_id: '',
    curriculum_id: '',
  });

  useEffect(() => {
    const getCurriculumsUrl = process.env.SEEDS_API_URI + '/curriculums';
    const getCurriculums = async (url: string) => {
      setCurriculums(await get(url));
    };
    getCurriculums(getCurriculumsUrl);

    const getUsersUrl = process.env.SEEDS_API_URI + '/api/v1/users';
    const getUsers = async (url: string) => {
      setUsers(await get(url));
    };
    getUsers(getUsersUrl);

    if (router.isReady) {
      const getFormDataUrl = process.env.SEEDS_API_URI + '/records/' + query.id;
      const getFormData = async (url: string) => {
        setFormData(await get(url));
      };
      getFormData(getFormDataUrl);

      const getTeacherDataUrl = process.env.SEEDS_API_URI + '/api/v1/get_teacher_by_record/' + query.id;
      const getTeacherData = async (url: string) => {
        setTeacherData(await get(url));
      };
      getTeacherData(getTeacherDataUrl);

      const getRecordUrl = process.env.SEEDS_API_URI + '/api/v1/record/' + query.id;
      const getRecord = async (url: string) => {
        setRecord(await get(url));
      };
      getRecord(getRecordUrl);
    }
  }, [query, router]);

  const handler =
    (input: string) => (
      e:
        React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setFormData({...formData, [input]: e.target.value});
    };
  const teacherHandler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherData({id: "1", user_id: e.target.value, record_id: query.id.toString()});
  };

  const submitRecord = async (data: any, query: any) => {
    const submitRecordUrl = process.env.SEEDS_API_URI + '/records/' + query.id;
    await put(submitRecordUrl, data);
  };

  const submitTeacher = async (data: any, query: any) => {
    console.log(data);
    const submitTeacherUrl = process.env.SEEDS_API_URI + '/teachers/' + teacherData.id;
    await put(submitTeacherUrl, data);
  };

  return (
    <EditModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Edit Record</h2>
      <div>
        <h3>Record Name</h3>
        <input type='text' placeholder='Input' value={formData.title} onChange={handler('title')}/>
      </div>
      <div>
        <h3>Contents</h3>
        <textarea placeholder='Input' value={formData.content} onChange={handler('content')}/>
      </div>
      <div>
        <h3>Homework</h3>
        <input type='text' placeholder='Input' value={formData.homework} onChange={handler('homework')}/>
      </div>
      <div>
        <h3>Teacher</h3>
        <select defaultValue={teacherData.user_id} onChange={teacherHandler('user_id')}>
          <option value={teacherData.user_id}>{record.teacher}</option>
          {users.map((data: User) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Curriculum</h3>
        <select defaultValue={formData.curriculum_id} onChange={handler('curriculum_id')}>
          {curriculums.map((data: Curriculum) => (
            <option key={data.id} value={data.id}>
              {data.title}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitRecord(formData, query);
          submitTeacher(teacherData, query);
          router.reload();
        }}
      >
        Submit
      </Button>
    </EditModal>
  );
};

export default RecordEditModal;
