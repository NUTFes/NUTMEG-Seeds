import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import { get, post } from '@utils/api_methods';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

interface Project {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
}

const UserProjectAddModal: FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState({
    user_id: useRouter().query.id,
    project_id: '',
    role_id: '',
  });

  const [projects, setProjects] = useState<Project[]>([{ id: '', name: '' }]);
  const [roles, setRoles] = useState<Role[]>([{ id: '', name: '' }]);

  useEffect(() => {
    const getProjectsUrl = process.env.SEEDS_API_URI + '/projects';
    const getProjects = async (url: string) => {
      setProjects(await get(url));
    };
    const getRolesUrl = process.env.SEEDS_API_URI + '/roles';
    const getRoles = async (url: string) => {
      setRoles(await get(url));
    };
    getProjects(getProjectsUrl);
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
        <h3>Project</h3>
        <select defaultValue={formData.project_id} onChange={handler('project_id')}>
          <option value=''>select</option>
          {projects.map((project: Project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>
      <div>
        <h3>Role</h3>
        <select defaultValue={formData.role_id} onChange={handler('role_id')}>
          <option value=''>Select</option>
          {roles.map((data) => (
            <option key={data.id} value={data.id}>{data.name}</option>
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

export default UserProjectAddModal;
