import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get, del } from '@utils/api_methods';
import DeleteModal from '@components/common/DeleteModal';
import Button from '@components/common/TestButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

const ProjectDeleteModal: FC<ModalProps> = (props) => {
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

  const DeleteProject = async (query: any) => {
    const deleteProjectUrl = process.env.CSR_API_URI + '/api/auth/' + query.id;
    await del(deleteProjectUrl);
  };

  return (
    <DeleteModal show={props.isOpen} setShow={props.setIsOpen}>
      <h2>Delete Project</h2>
      <h3>Are you sure?</h3>
      <Button
        onClick={() => {
          DeleteProject(query);
          router.back();
        }}
      >
        Delete
      </Button>
    </DeleteModal>
  );
};

export default ProjectDeleteModal;
