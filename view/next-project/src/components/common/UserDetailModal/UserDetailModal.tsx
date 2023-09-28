import React from 'react';
import s from './UserDetailModal.module.css';

interface User {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

interface Type {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

interface UserDetail {
  icon_name: string;
  github: string;
  slack: string;
  biography: string;
  pc_name: string;
  pc_os: string;
  pc_cpu: string;
  pc_ram: string;
  pc_storage: string;
  type: Type;
};

interface Project {
  id: number;
  project: string;
  role: string;
};

interface Record {
  id: number;
  title: string;
  teacher: User;
};

interface Skill {
  id: number;
  name: string;
  category: string;
};

interface UserDetailModalProps {
  onClose: () => void;
  user: User;
  userDetail: UserDetail;
  userProject?: Project[] | null;
  userSkill?: Skill[] | null;
  userRecord?: Record[] | null;
};

const UserDetailModal: React.FC<UserDetailModalProps> = (props) => {
    const { user, userDetail, userProject, userSkill, userRecord } = props;

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    return (
        <div className={s.modalContainer} onClick={handleOutsideClick}>
            
            <div className={s.modalInnerContainer}>

                <div className={s.modalTakumi}>
      
                    <img className={s.img_header} src='MemberModalHeader.svg' />

                    <div className={s.modalContent}>

                        <div className={s.modalDetail}>

                            <div className={s.wrapper}>
                                <div className={s.box1}>
                                    <img className={s.img} src={'NoUser.svg'} />
                                </div>
                                <div className={s.box2}>
                                    <h1 className={s.username}>{user.name}</h1>
                                    <h4 className={s.userrole}>{userDetail.type.name}</h4>
                                </div>
                            </div>

                            {userProject && (
                            <div className={s.userProjects}>
                                <h3>Projects</h3>
                                <div className={s.box3}>
                                    {userProject.map(project => (
                                        <div key={project.id} className={s.card}>
                                                <p>{project.project}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            )}

                            {userSkill && (
                            <div className={s.userSkills}>
                                <h3>Skills</h3>
                                <div className={s.box4}>
                                    {userSkill.map(skill => (
                                        <div key={skill.id} className={s.card}>
                                            <p>{skill.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            )}

                            {userRecord && (
                            <div className={s.userRecords}>
                                <h3>Records</h3>
                                <div className={s.box5}>
                                    {userRecord.map(record => (
                                        <div key={record.id} className={s.record_card}>
                                            <p>{record.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            )}
                        </div>
                    
                    </div>

                    <img className={s.img_footer} src='MemberModalFooter.svg' />

                </div>
                
            </div>
            
        </div>
    );
}

export default UserDetailModal;
