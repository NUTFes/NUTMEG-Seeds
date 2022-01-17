import { get } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import GlassCard from '@components/common/GlassCard';
import styled from 'styled-components';
import HeaderLogo from '@components/icons/HeaderLogo';

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
  const ProjectListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;
  const ProjectNameContainer = styled.div`
    font-size: 20px;
  `;

  return (
    <MainLayout>
      <ProjectListContainer>
        {props.projects.map((project) => (
            <GlassCard width='275px' height='250px' align={'center'}>
              <HeaderLogo height={120} width={120} color={'black'} />
              <ProjectNameContainer>
                {project.name}
              </ProjectNameContainer>
            </GlassCard>
        ))}
      </ProjectListContainer>
    </MainLayout>
  );
}
