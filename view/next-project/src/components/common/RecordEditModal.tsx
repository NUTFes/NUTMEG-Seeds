import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {get, put} from '@utils/api_methods';
import EditModal from '@components/common/EditModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  defaultParams: DefaultParams;
}

interface CurriculumDetail {
  id: number;
  title: string;
  content: string;
  homework: string;
  skill_id: number;
  created_at: string;
  updated_at: string;
}

interface RecordDetail {
  id: number;
  title: string;
  content: string;
  homework: string;
  user_id: number;
  curriculum_id: number;
  created_at: string;
  updated_at: string;
}

interface DefaultParams {
  curriculum: CurriculumDetail;
  record: RecordDetail;
  teacher: string;
  user: string;
  skill: string;
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
  id: number | string;
  title: string;
}

interface Record {
  id: string;
  title: string;
}

interface RecordCurriculumTeacher {
  record: Record | any;
  curriculum: Curriculum | any;
  curriculum_title: string;
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
    curriculum_title: '',
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
    const getCurriculumsUrl = process.env.CSR_API_URI + '/curriculums';
    const getCurriculums = async (url: string) => {
      setCurriculums(await get(url));
    };
    getCurriculums(getCurriculumsUrl);

    const getUsersUrl = process.env.CSR_API_URI + '/api/v1/users';
    const getUsers = async (url: string) => {
      setUsers(await get(url));
    };
    getUsers(getUsersUrl);

    if (router.isReady) {
      const getFormDataUrl = process.env.CSR_API_URI + '/records/' + query.id;
      const getFormData = async (url: string) => {
        setFormData(await get(url));
      };
      getFormData(getFormDataUrl);

      const getTeacherDataUrl = process.env.CSR_API_URI + '/api/v1/get_teacher_by_record/' + query.id;
      const getTeacherData = async (url: string) => {
        setTeacherData(await get(url));
      };
      getTeacherData(getTeacherDataUrl);

      const getRecordUrl = process.env.CSR_API_URI + '/api/v1/record/' + query.id;
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
  const teacherHandler = (input: string, query: any) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherData({id: "1", user_id: e.target.value, record_id: query.id.toString()});
  };

  const submitRecord = async (data: any, query: any) => {
    const submitRecordUrl = process.env.CSR_API_URI + '/records/' + query.id;
    await put(submitRecordUrl, data);
  };

  const submitTeacher = async (data: any, query: any) => {
    console.log(data);
    const submitTeacherUrl = process.env.CSR_API_URI + '/teachers/' + teacherData.id;
    await put(submitTeacherUrl, data);
    router.reload();
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
        <div>
          <textarea placeholder='Input' value={formData.content} onChange={handler('content')}/>
          <div>
            <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
              {formData.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div>
        <h3>Homework</h3>
        <div>
          <textarea placeholder='Input' value={formData.homework} onChange={handler('homework')}/>
          <div>
            <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
              {formData.homework}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div>
        <h3>Teacher</h3>
        <select defaultValue={teacherData.user_id} onChange={teacherHandler('user_id', query)}>
          {users.map((data: User) => {
            if (data.id == teacherData.user_id) {
              return(
                <option key={data.id} value={data.id} selected>
                  {data.name}
                </option>
              )
            }else{
              return(
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              )
            }
          })}
        </select>
      </div>
      <div>
        <h3>Curriculum</h3>
        <select defaultValue={formData.curriculum_id} onChange={handler('curriculum_id')}>
          {curriculums.map((data: Curriculum) => {
            if (data.id == props.defaultParams.curriculum.id) {
              return(
                <option key={data.id} value={data.id} selected>
                  {data.title}
                </option>
              )
            }else{
              return(
                <option key={data.id} value={data.id}>
                  {data.title}
                </option>
              )
            }

            <option key={data.id} value={data.id}>
              {data.title}
            </option>
          })}
        </select>
      </div>
      <Button
        onClick={() => {
          submitRecord(formData, query);
          submitTeacher(teacherData, query);
        }}
      >
        Submit
      </Button>
      </EditModal>
  );
};

export default RecordEditModal;
