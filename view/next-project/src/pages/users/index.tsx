import { useRouter } from 'next/router';
import { get } from '@utils/api_methods';
import UsersLayout from '@components/layout/UsersLayout';
import styled from 'styled-components';
import AccountCircle from '@components/icons/AccountCircle';
import UserBackgroundAnimation from '@components/common/UsersBackgroundAnimation/UsersBackgroundAnimation';
import MemberSearchButton from '@components/common/MemberSearchButton';
import React, { useState } from 'react';
import OpenUserDetailModal from '@components/common/UserDetailModal/UserDetailModal';
interface Props {
  userDetails: UserDetails[];
}
interface UserDetails {
  user: User;
  detail: UserDetail;
  type: Type;
  projects: Project[];
  records: Record[];
  skills: Skill[];
}

interface Project {
  id: number;
  project: string;
  role: string;
}

interface Record {
  id: number;
  title: string;
  teacher: User;
}

interface Skill {
  id: number;
  name: string;
  category: string;
}
interface User {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
interface Grade {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
interface Department {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
interface Bureau {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
interface Type {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
interface UserDetail {
  grade: Grade;
  department: Department;
  bureau: Bureau;
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
}
export async function getServerSideProps() {
  const getUrl = process.env.SSR_API_URI + '/api/v1/get_users_for_member_page';
  const json = await get(getUrl);
  return {
    props: {
      userDetails: json,
    },
  };
}
export default function UserList(props: Props) {
  const accountCircleColor = '#636363';
  const UserListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 200px;
    width: 100%;
  `;
  const UserMargin = styled.div`
    height: 150px;
  `;
  const UserContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    padding: 20px;
    // width: 100vw;
  `;
  const UserCardListContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    over-flow: normal;
  `;
  const Card = styled.div`
    position: relative;
    width: 270px;
    height: 80px;
    display: inline-block;
  `;
  const AccountCircleContainer = styled.div`
    border: solid 4px;
    border-color: ${accountCircleColor};
    border-radius: 9999px;
    width: 68px;
    height: 68px;
  `;
  const UserInfo = styled.div`
    display: column
    width: 120px;
    height: 100px;
    padding: 10px;
  `;
  const UserNameContainer = styled.div`
    font-size: 2rem;
    text-decoration: underline;
    padding: 5px;
  `;
  const TypeNameContainer = styled.div`
    font-size: 1.5rem;
    padding: 5px;
  `;
  const PictureContainer = styled.div`
    width: 270px;
    height: 135px;
    position: absolute;
    z-index: 1;
    width: fit-content;
    margin-top: -37px;
    margin-left: -20px;
  `;
  const PictureFilter = styled.div`
    width: 270px;
    height: 110px;
    position: absolute;
    top: 22px;
    z-index: -1;
    backdrop-filter: blur(4px);
  `;
  const PictureTabFilter = styled.div`
    width: 100px;
    height: 20px;
    position: absolute;
    top: 2px;
    z-index: -1;
    backdrop-filter: blur(4px);
    clip-path: polygon(0% 100%, 17.5% 0%, 82.5% 0%, 100% 100%);
  `;
  const UserInfoContainer = styled.div`
    position: absolute;
    z-index: 2;
    display: flex;
  `;
  const MemberPageTitle = styled.div`
    position: fixed;
    top: 11%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 50px;
    font-weight: 700;
    font-size: 25px;
    z-index: 9;
    color: #ffffff;
    text-align: center;
  `;
  const TopSearchButton = styled.div`
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
  `;
  const BottomSearchButton = styled.div`
    position: fixed;
    bottom: 2%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
  `;
  const router = useRouter();
  const [isOpenUserDetailModal, setIsOpenUserDetailModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentDetail, setCurrentDetail] = useState<UserDetail | null>(null);
  const [currentProjects, setCurrentProjects] = useState<Project[] | null>(null);
  const [currentRecords, setCurrentRecords] = useState<Record[] | null>(null);
  const [currentSkills, setCurrentSkills] = useState<Skill[] | null>(null);
  const onOpen = () => {
    setIsOpenUserDetailModal(true);
  };
  const onClose = () => {
    setIsOpenUserDetailModal(false);
  };

  const handleCardClick = (userDetail: UserDetails) => {
    setCurrentUser(userDetail.user);
    setCurrentDetail(userDetail.detail);
    setCurrentProjects(userDetail.projects);
    setCurrentRecords(userDetail.records);
    setCurrentSkills(userDetail.skills);
    setIsOpenUserDetailModal(true);
  };

  const userContent = (userDetail: any) => {
    return (
      <UserContainer>
        <UserCardListContainer>
          <Card>
            <PictureContainer>
              <img src='UserButton.svg' />
              <PictureTabFilter />
              <PictureFilter />
            </PictureContainer>
            <UserInfoContainer>
              <AccountCircleContainer>
                <AccountCircle height={60} width={60} color={'var(--accent-6)'} />
              </AccountCircleContainer>
              <UserInfo>
                <UserNameContainer>{userDetail.user.name ? userDetail.user.name : ''}</UserNameContainer>
                <TypeNameContainer>{userDetail.detail.type.name ? userDetail.detail.type.name : ''}</TypeNameContainer>
              </UserInfo>
            </UserInfoContainer>
          </Card>
        </UserCardListContainer>
      </UserContainer>
    );
  };
  return (
    <UsersLayout>
      <MemberPageTitle>Members</MemberPageTitle>
      <TopSearchButton>
        <MemberSearchButton title={'Search'} />
      </TopSearchButton>
      <UserMargin />
      <UserBackgroundAnimation />
      <UserCardListContainer>
        <UserListContainer>
          {props.userDetails.map((userDetail) => (
            <div key={userDetail.user.id} onClick={() => handleCardClick(userDetail)}>
              {userContent(userDetail)}
            </div>
          ))}
        </UserListContainer>
          {isOpenUserDetailModal && currentUser && currentDetail && 
          <OpenUserDetailModal onClose={onClose} user={currentUser} userDetail={currentDetail} userProject={currentProjects} userSkill={currentSkills} userRecord={currentRecords}/>}
      </UserCardListContainer>
      <BottomSearchButton>
        <MemberSearchButton title={'Search'} />
      </BottomSearchButton>
    </UsersLayout>
  );
}
