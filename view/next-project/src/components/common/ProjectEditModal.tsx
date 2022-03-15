import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get, put } from '@utils/api_methods';
import EditModal from '@components/common/EditModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

const ProjectEditModal: FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    icon_name: '/group-manager-2',
    github: '',
    remark: '',
  });
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (router.isReady) {
      const getFormDataUrl = process.env.CSR_API_URI + '/projects/' + query.id;
      const getFormData = async (url: string) => {
        setFormData(await get(url));
      };
      getFormData(getFormDataUrl);
    }
  }, [query, router]);

  const handler =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData({ ...formData, [input]: e.target.value });
    };

  const submitProject = async (data: any, query: any) => {
    const submitProjectUrl = process.env.CSR_API_URI + '/projects/' + query.id;
    await put(submitProjectUrl, data);
  };

  return (
    <EditModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Edit Project</h2>
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
          submitProject(formData, query);
          router.reload();
        }}
      >
        Submit
      </Button>
    </EditModal>
  );
};

export default ProjectEditModal;
