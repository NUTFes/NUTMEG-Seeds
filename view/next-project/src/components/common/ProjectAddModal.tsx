import React, { FC, useState } from 'react';
import { get, post } from '@utils/api_methods';
import AddModal from '@components/common/AddModal';
import Button from '@components/common/TestButton';
import { useRouter } from 'next/router';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
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
    await post(submitProjectUrl, data);
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
          router.reload();
        }}
      >
        Submit
      </Button>
    </AddModal>
  );
};

export default ProjectAddModal;
