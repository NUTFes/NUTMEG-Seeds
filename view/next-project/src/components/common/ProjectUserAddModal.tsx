import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import {get, post} from '@utils/api_methods';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  setMembers: Function;
  members: Member[];
}

interface User {
  id: number | string;
  name: string;
}

interface Member {
  id: number | string;
  name: string;
  role: string;
}

interface Role {
  id: string;
  name: string;
}

interface ProjectUser {
  project_id: string | any;
  user_id: string;
}

const ProjectUserAddModal: FC<ModalProps> = (props) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    user_id: '',
    project_id: router.query.id,
    role_id: '',
  });

  const [users, setUsers] = useState<User[]>([{id: '', name: ''}]);
  const [roles, setRoles] = useState<Role[]>([{id: '', name: ''}]);


  useEffect(() => {
    const getUsersUrl = process.env.CSR_API_URI + '/api/v1/users';
    const getUsers = async (url: string) => {
      setUsers(await get(url));
    };
    const getRolesUrl = process.env.CSR_API_URI + '/roles';
    const getRoles = async (url: string) => {
      setRoles(await get(url));
    };
    getUsers(getUsersUrl);
    getRoles(getRolesUrl);
  }, []);

  const handler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [input]: e.target.value});
  };

  const submitProject = async (data: ProjectUser) => {
    const submitUrl = process.env.CSR_API_URI + '/project_users';
    const postReq = await post(submitUrl, data);
    const postRes = await postReq.json();
    const getUserUrl = process.env.CSR_API_URI + '/api/v1/get_project_user_for_reload_view_user/' + postRes.id;
    const getRes = await get(getUserUrl);
    const newMembers: Member = getRes[0];
    props.setMembers([...props.members, newMembers]);
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Assign Project</h2>
      <div>
        <h3>Member</h3>
        <select defaultValue={formData.user_id} onChange={handler('user_id')}>
          <option value=''>select</option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Role</h3>
        <select defaultValue={formData.role_id} onChange={handler('role_id')}>
          <option value=''>Select</option>
          {roles.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => {
          submitProject(formData);
          props.setIsOpen(false);
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default ProjectUserAddModal;
