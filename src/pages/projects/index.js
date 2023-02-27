import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProjectListToolbar } from '../../components/projects/project-list-toolbar';
import { ProjectCard } from '../../components/projects/project-card';
import { DashboardLayout } from '../../components/dashboard/index';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const ProjectPage = () => {
  const projectReducer = useSelector(state => state.projectReducer)
  const [projects, setProjects] = useState(projectReducer.projects)

  useEffect(() => {
    setProjects(projectReducer.projects);
  }, [projectReducer])

  const hendleSearch = (data) => {
    setProjects(data)
  }

  return (
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <ProjectListToolbar projects={projects} search={hendleSearch} />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {projects.map((project) => (
                <Grid
                  item
                  key={project.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}

export default ProjectPage;
