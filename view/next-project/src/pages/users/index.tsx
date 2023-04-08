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
  const UserContainer = styled.div`
    display: flex;
  `;
  const AccountColorCircle = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 3px solid #818181; //色の設定は個人で
    box-sizing: border-box;

    position: absolute;
    top: 10%;
    left: 16.5%;
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
  const UserDetail = styled.div`
    font-size: 1.4rem;
    padding: 10px 0;
  `;
  const AccountPosition = styled.div`
    padding: 20px 0;
  `;
  const GlassFolderTabLine = styled.div`
    // width: 140px;
    // height: 14px;
    // background: #505050;
    // clip-path: polygon(0% 100%, 10% 0%, 90% 0%, 100% 100%);
    // border-top: solid 1px #505050;
    //  border-top: solid 1px #505050;
    // position: absolute;
    // z-index: 50;
  `;
  const GlassFolderTab = styled.div`
    position: relative;
    width: 150px;
    height: 21px;
    background: #505050;
    clip-path: polygon(0% 100%, 10% 0%, 90% 0%, 100% 100%);
  `;
  const GlassFolderTabInner = styled.div`
    display: block;
    position: absolute;
    top: 1px; bottom: 0px;
    left: 1px; right: 1px;
    content: '';
    background: #FFDDBD;
    clip-path: polygon(0% 100%, 10% 0%, 90% 0%, 100% 100%);
  `;
  const FolderLine = styled.div`
    position: absolute;
    top: -7px;
    left: -7px;
    width: 100%;
    height: 100%;
    border: 3px solid #000;
    content: '';
  `

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
      <div>
        <div>
            <GlassFolderTabLine></GlassFolderTabLine>
            <GlassFolderTab><GlassFolderTabInner/></GlassFolderTab>
        </div>
        <GlassFolderCard width='300px' height='120px' align={'center'}>
            
          <UserContainer>
            <div onMouseEnter={() => onHover(user.id)}>
              <div >
                <AccountCircle height={80} width={80} color={'var(--accent-6)'} />
                <AccountColorCircle></AccountColorCircle>
              </div>
            </div>
            
            <UserInfo>
              <UserNameContainer>{user.name}</UserNameContainer>
              <TypeNameContainer>{user.name}</TypeNameContainer>
            </UserInfo>
          </UserContainer>
        </GlassFolderCard>
        </div>
      );
    }
  };
  console.log(props.users)

  return (
    <MainLayout>
      <UserListContainer>
        {props.users.map((user) => (
          <div key={user.id} onMouseLeave={() => leaveHover(user.id)}>
            {userContent(isHover, user)}
          </div>
        ))}
      </UserListContainer>
    </MainLayout>
  );
}
