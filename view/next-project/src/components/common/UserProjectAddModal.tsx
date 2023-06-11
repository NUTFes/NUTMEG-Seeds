import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import {get, post} from '@utils/api_methods';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  setUserProjects: Function;
  userProjects: UserProject[];
}

interface Role {
  id: string;
  name: string;
}

interface UserProject {
  id: number;
  project: string;
  role: string;
}

interface Project {
  id: number | string;
  name: string;
}

const UserProjectAddModal: FC<ModalProps> = (props) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    user_id: router.query.id,
    project_id: '',
    role_id: '',
  });

  const [projects, setProjects] = useState<Project[]>([{id: '', name: ''}]);
  const [roles, setRoles] = useState<Role[]>([{id: '', name: ''}]);

  useEffect(() => {
    const getProjectsUrl = process.env.CSR_API_URI + '/projects';
    const getProjects = async (url: string) => {
      setProjects(await get(url));
    };
    const getRolesUrl = process.env.CSR_API_URI + '/roles';
    const getRoles = async (url: string) => {
      setRoles(await get(url));
    };
    getProjects(getProjectsUrl);
    getRoles(getRolesUrl);
  }, []);

  const handler = (input: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [input]: e.target.value});
  };

  const submitProject = async (data: any) => {
    const submitUrl = process.env.CSR_API_URI + '/project_users';
    const postReq = await post(submitUrl, data);
    const postRes = await postReq.json();
    const getUserUrl = process.env.CSR_API_URI + '/api/v1/get_project_user_for_reload_view_project/' + data.user_id;
    const getRes = await get(getUserUrl);
    const newProjects: UserProject = getRes[getRes.length - 1];
    props.setUserProjects([...props.userProjects, newProjects]);
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Assign Project</h2>
      <div>
        <h3>Project</h3>
        <select defaultValue={formData.project_id} onChange={handler('project_id')}>
          <option value=''>select</option>
          {projects.map((project: Project) => (
            <option key={project.id} value={project.id}>
              {project.name}
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

export default UserProjectAddModal;
