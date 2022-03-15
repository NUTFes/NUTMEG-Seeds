import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get, put } from '@utils/api_methods';
import EditModal from '@components/common/EditModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  userInfo?: any;
  userDetaiInfo?: any;
}

interface UserDetail {
  id: string;
  user_id: string;
  grade_id: string;
  department_id: string;
  bureau_id: string;
  icon_name: string;
  github: string;
  slack: string;
  biography: string;
  pc_name: string;
  pc_os: string;
  pc_cpu: string;
  pc_ram: string;
  pc_storage: string;
}

interface Grade {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

interface Bureau {
  id: string;
  name: string;
}

const UserEditModal: FC<ModalProps> = (props: ModalProps) => {
  const router = useRouter();
  const query = router.query;

  const detail = props.userDetaiInfo
  const userDetail: UserDetail = {
    id: detail.id,
    user_id: detail.user_id,
    grade_id: detail.grade.id,
    department_id: detail.department.id,
    bureau_id: detail.bureau.id,
    icon_name: detail.icon_name,
    github: detail.github,
    slack: detail.github,
    biography: detail.biography,
    pc_name: detail.pc_name,
    pc_os: detail.pc_os,
    pc_cpu: detail.pc_cpu,
    pc_ram: detail.pc_ram,
    pc_storage: detail.pc_storage
  }

  const [gradeList, setGradeList] = useState<Grade[]>([])
  const [departmentList, setDepartmentList] = useState<Department[]>([])
  const [bureauList, setBureauList] = useState<Bureau[]>([])
  const [userDetailData, setUserDetailData] = useState<UserDetail>(userDetail)

  useEffect(() => {
      const getGradeListUrl = process.env.CSR_API_URI + '/grades';
      const getGradeList = async (url: string) => {
        setGradeList(await get(url));
      };
      getGradeList(getGradeListUrl);

      const getDepartmentListUrl = process.env.CSR_API_URI + '/departments'
      const getDepartmentList = async (url: string) => {
        setDepartmentList(await get(url))
      }
      getDepartmentList(getDepartmentListUrl)

      const getBureauListUrl = process.env.CSR_API_URI + '/bureaus'
      const getBureauList = async (url: string) => {
        setBureauList(await get(url))
      }
      getBureauList(getBureauListUrl)
  }, [query, router]);

  const handler =
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setUserDetailData({ ...userDetailData, [input]: e.target.value });
    };

  const submitUserDetail = async (data: any) => {
    console.log(data)
    const submitUserDetailUrl = process.env.CSR_API_URI + '/user_details/' + data.id;
    const res = await put(submitUserDetailUrl, data);
    console.log(res)
  };

  return (
    <EditModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Edit User Info</h2>
      <div>
        <h3>Grade</h3>
        <select defaultValue={userDetailData.grade_id} onChange={handler('grade_id')}>
          <option value=''>select</option>
          {gradeList.map((grade: Grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Department</h3>
        <select defaultValue={userDetailData.department_id} onChange={handler('department_id')}>
          <option value=''>select</option>
          {departmentList.map((department: Department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Bureau</h3>
        <select defaultValue={userDetailData.bureau_id} onChange={handler('bureau_id')}>
          <option value=''>select</option>
          {bureauList.map((bureau: Bureau) => (
            <option key={bureau.id} value={bureau.id}>
              {bureau.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>GitHub</h3>
        <input placeholder='Input' value={userDetailData.github} onChange={handler('github')} />
      </div>
      <div>
        <h3>Slack</h3>
        <input type='text' placeholder='Input' value={userDetailData.slack} onChange={handler('slack')} />
      </div>
      <div>
        <h3>Biography</h3>
        <textarea placeholder='Input' value={userDetailData.biography} onChange={handler('biography')} />
      </div>
      <Button
        onClick={() => {
          submitUserDetail(userDetailData);
          router.reload();
        }}
      >
        Submit
      </Button>
    </EditModal>
  );
};

export default UserEditModal;
