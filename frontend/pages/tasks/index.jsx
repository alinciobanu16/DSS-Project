import React from 'react';
import { Box, Container, Typography } from "@mui/material";
import TasksList from "../../components/TasksList";

export default function Tasks() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h1">
          Here are your tasks:
        </Typography>
        <TasksList/>
      </Box>
    </Container>
  );
}
