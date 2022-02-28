import { useState } from 'react';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import ListHeader from '@components/common/ListHeader';
import GlassCard from '@components/common/GlassCard';
import styled from 'styled-components';
import HeaderLogo from '@components/icons/HeaderLogo';
import AccountCircle from '@components/icons/AccountCircle';
import Button from '@components/common/TransButton';
import { join } from 'path/posix';

type Projects = {
  id: number;
  name: string;
  detail: string;
  icon_name: string;
  github: string;
  remark: string;
};

type Props = {
  projects: Projects[];
};

export async function getStaticProps() {
  const getUrl = 'http://seeds_api:3000/projects';
  const json = await get(getUrl);
  return {
    props: {
      projects: json,
    },
  };
}

export default function ProjectList(props: Props) {
  // 初期状態で詳細を非表示にするための処理
  let initialState: any = new Object();
  for (const project of props.projects) {
    initialState[project.id] = false;
  }
  console.log(initialState)
  // マウスホバーしているかをuseStateで管理
  let [isHover, setIsHover] = useState(initialState);

  const ProjectListContainer = styled.div`
    display: flex;
    gap: 60px 60px;
    flex-wrap: wrap;
    justify-content: center;
  `;
  const ProjectNameContainer = styled.div`
    font-size: 20px;
  `;
  const FocusProjectNameContainer = styled.div`
    font-size: 20px;
    font-weight: bold;
  `;
  const ProjectDetail = styled.div`
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
  const projectContent = (isHover: any, project: Projects) => {
    if (isHover[project.id]) {
      return (
        <GlassCard width='275px' height='250px' align={'center'} background='white'>
          <FocusProjectNameContainer>{project.name}</FocusProjectNameContainer>
          <ProjectDetail>{project.detail}</ProjectDetail>
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
          <div onMouseEnter={() => onHover(project.id)}>
            <HeaderLogo height={120} width={120} color={'black'} />
          </div>
          <ProjectNameContainer>{project.name}</ProjectNameContainer>
        </GlassCard>
      );
    }
  };

  return (
    <MainLayout>
      <ListHeader title='Project' />
      <ProjectListContainer>
        {props.projects.map((project) => (
          <div key={project.id} onMouseLeave={() => leaveHover(project.id)}>{projectContent(isHover, project)}</div>
        ))}
      </ProjectListContainer>
    </MainLayout>
  );
}
