import { useState } from 'react';
import { useRouter } from 'next/router';
import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import ListHeader from '@components/common/ListHeader';
import GlassCard from '@components/common/GlassCard';
import styled from 'styled-components';
import HeaderLogo from '@components/icons/HeaderLogo';
import Button from '@components/common/TransButton';

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
  console.log(initialState);
  // マウスホバーしているかをuseStateで管理
  let [isHover, setIsHover] = useState(initialState);

  const ProjectListContainer = styled.div`
    display: flex;
    gap: 6rem 6rem;
    flex-wrap: wrap;
    justify-content: center;
  `;
  const ProjectNameContainer = styled.div`
    font-size: 2rem;
  `;
  const FocusProjectNameContainer = styled.div`
    font-size: 2rem;
    font-weight: bold;
  `;
  const ProjectDetail = styled.div`
    font-size: 1.4rem;
    padding: 1rem 0;
    margin: 2rem 0;
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
  const projectContent = (isHover: any, project: Projects) => {
    if (isHover[project.id]) {
      return (
        <GlassCard width='30rem' height='25rem' align={'center'} background='white'>
          <FocusProjectNameContainer>{project.name}</FocusProjectNameContainer>
          <ProjectDetail>{project.detail}</ProjectDetail>
          <div>
            <Button height='3rem' text='More' onClick={() => router.push('/projects/' + project.id)} />
          </div>
        </GlassCard>
      );
    } else {
      return (
        <GlassCard width='30rem' height='25rem' align={'center'}>
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
          <div key={project.id} onMouseLeave={() => leaveHover(project.id)}>
            {projectContent(isHover, project)}
          </div>
        ))}
      </ProjectListContainer>
    </MainLayout>
  );
}
