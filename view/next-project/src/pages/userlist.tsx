import { useState } from 'react';
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
  name: string;
  detail: string;
  icon_name: string;
  github: string;
  remark: string;
};

type Props = {
  users: Users[];
};

export async function getStaticProps() {
  const getUrl = 'http://seeds_api:3000/users';
  const json = await get(getUrl);
  return {
    props: {
      users: json,
    },
  };
}

export default function UserList(props: Props) {
  // 初期状態で詳細を非表示にするための処理
  let initialState = new Object();
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
    font-size: 20px;
  `;
  const FocusUserNameContainer = styled.div`
    font-size: 20px;
    font-weight: bold;
  `;
  const UserDetail = styled.div`
    font-size: 14px;
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

  // マウスホバー時のプロジェクト
  const userContent = (isHover: any, user: Users) => {
    if (isHover[user.id]) {
      return (
        <GlassCard width='275px' height='250px' align={'center'} background='white'>
          <FocusUserNameContainer>{user.name}</FocusUserNameContainer>
          <UserDetail>{user.detail}</UserDetail>
          <AccountPosition>
            <AccountCircle height={20} width={20} color={'green'} />
            <AccountCircle height={20} width={20} color={'blue'} />
            <AccountCircle height={20} width={20} color={'red'} />
          </AccountPosition>
          <div>
            <Button height='30px' text='More' />
          </div>
        </GlassCard>
      );
    } else {
      return (
        <GlassCard width='275px' height='250px' align={'center'}>
          <HeaderLogo height={120} width={120} color={'black'} />
          <UserNameContainer>{user.name}</UserNameContainer>
        </GlassCard>
      );
    }
  };

  return (
    <MainLayout>
      <UserListContainer>
        {props.users.map((user) => (
          <div onMouseEnter={() => onHover(user.id)} onMouseLeave={() => leaveHover(user.id)}>
            {userContent(isHover, user)}
          </div>
        ))}
      </UserListContainer>
    </MainLayout>
  );
}
