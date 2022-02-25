import React, { FC, useState } from 'react';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

const ProjectAddModal: FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState({
    projectName: '',
    detail: '',
    icon_name: '/group-manager-2',
    github: '',
    remark: '',
  });

  const handler =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData({ ...formData, [input]: e.target.value });
    };

  const submitProject = (data: any) => {
    console.log(data);
  };

  return (
    <AddModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>New Project</h2>
      <div>
        <h3>Project Name</h3>
        <input type='text' placeholder='Input' value={formData.projectName} onChange={handler('projectName')} />
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
      <Button onClick={() => submitProject(formData)}>Submit</Button>
    </AddModal>
  );
};

export default ProjectAddModal;
