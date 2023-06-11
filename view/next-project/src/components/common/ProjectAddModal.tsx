import React, { FC, useState } from 'react';
import { get, post } from '@utils/api_methods';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import { useRouter } from 'next/router';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  projects: Project[];
  setProjects: Function;
}

interface Project {
  id: number;
  name: string;
  detail: string;
  icon_name: string;
  github: string;
  remark: string;
}

const ProjectAddModal: FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    icon_name: '/group-manager-2',
    github: '',
    remark: '',
  });

  const handler =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData({ ...formData, [input]: e.target.value });
    };

  const router = useRouter();
  const submitProject = async (data: any) => {
    const submitProjectUrl = process.env.CSR_API_URI + '/projects';
    const postReq = await post(submitProjectUrl, data);
    const postRes = await postReq.json();
    const getProjectUrl = process.env.CSR_API_URI + '/projects/' + postRes.id;
    const getRes = await get(getProjectUrl);
    const newProject: Project = getRes;
    props.setProjects([...props.projects, newProject]);
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Project</h2>
      <div>
        <h3>Project Name</h3>
        <input type='text' placeholder='Input' value={formData.name} onChange={handler('name')} />
      </div>
      <div>
        <h3>Detail</h3>
        <textarea placeholder='Input' value={formData.detail} onChange={handler('detail')} />
      </div>
      <div>
        <h3>GitHub</h3>
        <input type='text' placeholder='Input' value={formData.github} onChange={handler('github')} />
      </div>
      <div>
        <h3>Remark</h3>
        <textarea placeholder='Input' value={formData.remark} onChange={handler('remark')} />
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

export default ProjectAddModal;
