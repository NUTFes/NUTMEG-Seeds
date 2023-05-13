import { useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/UsersLayout';
import GlassCard from '@components/common/GlassCard';
import styled from 'styled-components';
import HeaderLogo from '@components/icons/HeaderLogo';
import AccountCircle from '@components/icons/AccountCircle';
import Button from '@components/common/TransButton';
import { join } from 'path/posix';
import GlassFolderCard from '@components/common/GlassFolderCard';
import UserBackgroundAnimation from '@components/common/UsersBackgroundAnimation/UsersBackgroundAnimation'

type Users = {
  id: number;
  email: string;
  name: string;
};

type Props = {
  users: Users[];
};

export async function getServerSideProps() {
  const getUrl = process.env.SSR_API_URI + '/api/v1/users';
  const json = await get(getUrl);
  return {
    props: {
      users: json,
    },
  };
}

export default function UserList(props: Props) {
  // 初期状態で詳細を非表示にするための処理
  let initialState: any = new Object();
  for (const user of props.users) {
    initialState[user.id] = false;
  }
  // マウスホバーしているかをuseStateで管理
  let [isHover, setIsHover] = useState(initialState);

  const accountCircleColor = '#3333ff';

  const UserListContainer = styled.div`
    display: flex;
    justify-content: center;
  `;
  const UserContainer = styled.div`
    display: flex;
    margin-top: 80px;
    padding: 20px;
  `;  
  const Card = styled.div`
    position:relative;
    width: 300px;
    height: 100px;
  `;
  const AccountCircleContainer =styled.div`
    border: solid 4px;
    border-color: ${accountCircleColor};
    border-radius: 9999px;
    width: 88px;
    height: 88px;
  `;
  const UserInfo = styled.div`
    display: column
    width: 120px;
    height: 100px;
    padding: 10px;
  `;
  const UserNameContainer = styled.div`
    font-size: 2rem;
    text-decoration:underline;
    padding: 5px;
  `;
  const TypeNameContainer = styled.div`
    font-size: 1rem;
    padding: 5px;
  `;
  const FocusUserNameContainer = styled.div`
    font-size: 2rem;
    font-weight: 500;
  `;
  const PictureContainer = styled.div`
    width: 300px;
    height: 100px;
    position: absolute;
    z-index: 1;
    backdrop-filter: blur(4px);
    width: fit-content;
    margin-top: -30px;
    margin-left: -20px;
  `;

  const UserInfoContainer = styled.div`
    position: absolute;
    z-index: 2;
    display: flex;
  `;

  const router = useRouter();

  const userContent = (user: Users) => {
    return (
      <UserContainer>
      <Card>
          <PictureContainer>
            <img src='UserButton.svg' />
          </PictureContainer>
          <UserInfoContainer>
            <AccountCircleContainer>
              <AccountCircle height={80} width={80} color={'var(--accent-6)'} />
            </AccountCircleContainer>
            
            <UserInfo>
              <UserNameContainer>{user.name}</UserNameContainer>
              <TypeNameContainer>{user.name}</TypeNameContainer>
            </UserInfo>
          </UserInfoContainer>
        </Card>
      </UserContainer>
    );
  };
  console.log(props.users)

  return (
    <MainLayout>
      <UserBackgroundAnimation />
      <UserListContainer>
        {props.users.map((user) => (
          <div key={user.id}>
            {userContent(user)}
          </div>
        ))}
      </UserListContainer>
    </MainLayout>
  );
}
