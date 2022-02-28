import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import { get, post } from '@utils/api_methods';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

interface User {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
}

const ProjectUserAddModal: FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState({
    user_id: '',
    project_id: useRouter().query.id,
    role_id: '',
  });

  const [users, setUsers] = useState<User[]>([{ id: '', name: '' }]);
  const [roles, setRoles] = useState<Role[]>([{ id: '', name: '' }]);

  useEffect(() => {
    const getUsersUrl = process.env.SEEDS_API_URI + '/api/v1/users';
    const getUsers = async (url: string) => {
      setUsers(await get(url));
    };
    const getRolesUrl = process.env.SEEDS_API_URI + '/roles';
    const getRoles = async (url: string) => {
      setRoles(await get(url));
    };
    getUsers(getUsersUrl);
    getRoles(getRolesUrl);
  }, []);

  const handler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const submitProject = async (data: any) => {
    const submitUrl = process.env.SEEDS_API_URI + '/project_users';
    const postRes = await post(submitUrl, data);
  };

  const router = useRouter();

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
          router.reload();
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default ProjectUserAddModal;
