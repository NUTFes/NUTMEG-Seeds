import { useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import GlassCard from '@components/common/GlassCard';
import styled from 'styled-components';
import HeaderLogo from '@components/icons/HeaderLogo';
import AccountCircle from '@components/icons/AccountCircle';
import Button from '@components/common/TransButton';
import { join } from 'path/posix';

type Users = {
  id: number;
  email: string;
  name: string;
};

type Props = {
  users: Users[];
};

export async function getStaticProps() {
  const getUrl = 'http://seeds_api:3000/api/v1/users';
  const json = await get(getUrl);
  return {
    props: {
      users: json,
    },
  };
}

export default function UserList(props: Props) {
  // 初期状態で詳細を非表示にするための処理
  console.log(props);
  let initialState: any = new Object();
  for (const user of props.users) {
    initialState[user.id] = false;
  }
  // マウスホバーしているかをuseStateで管理
  let [isHover, setIsHover] = useState(initialState);

  const UserListContainer = styled.div`
    display: flex;
    gap: 60px 60px;
    flex-wrap: wrap;
    justify-content: center;
  `;
  const UserNameContainer = styled.div`
    font-size: 2rem;
  `;
  const FocusUserNameContainer = styled.div`
    font-size: 2rem;
    font-weight: 500;
  `;
  const UserDetail = styled.div`
    font-size: 1.4rem;
    padding: 10px 0;
  `;
  const AccountPosition = styled.div`
    padding: 20px 0;
  `;

  // プロジェクトのカードにマウスホバーした時の処理
  const onHover = (id: number) => {
    // マウスホバーしたプロジェクトのisHoverをTrueにする
    setIsHover({ ...isHover, [id]: true });
  };
  // プロジェクトのカードからマウスホバーが外れた時の処理
  const leaveHover = (id: number) => {
    setIsHover({ ...isHover, [id]: false });
  };

  const router = useRouter();

  // マウスホバー時のプロジェクト
  const userContent = (isHover: any, user: Users) => {
    if (isHover[user.id]) {
      return (
        <GlassCard width='275px' height='250px' align={'center'} justify={'center'} background='white' gap='30px'>
          <FocusUserNameContainer>{user.name}</FocusUserNameContainer>
          <div>
            <Button height='30px' text='More' onClick={() => router.push('/users/' + user.id)} />
          </div>
        </GlassCard>
      );
    } else {
      return (
        <GlassCard width='275px' height='250px' align={'center'}>
          <div onMouseEnter={() => onHover(user.id)}>
            <AccountCircle height={120} width={120} color={'green'} />
          </div>
          <UserNameContainer>{user.name}</UserNameContainer>
        </GlassCard>
      );
    }
  };

  return (
    <MainLayout>
      <UserListContainer>
        {props.users.map((user) => (
          <div key={user.id} onMouseLeave={() => leaveHover(user.id)}>{userContent(isHover, user)}</div>
        ))}
      </UserListContainer>
    </MainLayout>
  );
}
