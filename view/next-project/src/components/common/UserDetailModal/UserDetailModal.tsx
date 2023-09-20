import React from 'react';
import s from './UserDetailModal.module.css';
import styled from 'styled-components';

type User = {
    id: number;
    provider: string;
    uid: string;
    allow_password_change: boolean;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

interface Type {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }

type UserDetail = {
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

type Project = {
    id: number;
    project: string;
    role: string;
};

type Record = {
    id: number;
    title: string;
    teacher: User;
};

type Skill = {
    id: number;
    name: string;
    category: string;
};

type UserDetailModalProps = {
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
    }
    const MemberHeaderContainer = styled.div`
    z-index: 30;
    position: absolute;
    top: 0;
    left: 0;
    text-align:center;
  `;
  const MemberFooterContainer = styled.div`
    z-index: 30;
    position: absolute;
    right: 0;
    bottom: 0;
    text-align:center;
  `;

    return (
        <div className={s.modalContainer} onClick={handleOutsideClick}>
            
            <div className={s.modalInnerContainer}>

                <div className={s.modalTakumi}>

                    <MemberHeaderContainer>
                        <img className={s.imgg} src='MemberModalHeader.svg' />
                    </MemberHeaderContainer>

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

                    <MemberFooterContainer>
                        <img className={s.imgg} src='MemberModalFooter.svg' />
                    </MemberFooterContainer>

                </div>
                
            </div>
            
        </div>
    );
}

export default UserDetailModal;
