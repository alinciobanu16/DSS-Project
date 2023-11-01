import React from 'react';
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import StickyBar from '../components/StickyBar';
import Board from '../components/Board';
import { getBoardsApi } from '../utils/api/boardApi';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Home({ data }) {
  const [boards, setBoards] = useState(data);

  const updateBoardName = (boardId, newName) => {
    const updatedBoards = boards.map((board) => {
      if (board._id === boardId) {
        return { ...board, name: newName };
      }
      return board;
    });

    setBoards(updatedBoards);
  };

  const addNewBoard = async () => {
    const boards = await getBoardsApi();
    setBoards(boards);
  };

  const deleteBoard = (boardId) => {
    const updatedBoards = boards.filter((board) => board._id !== boardId);
    setBoards(updatedBoards);
  };

  return (
    <div>
      <StickyBar mode="board" addNewBoard={addNewBoard} title="Boards" />
      <Box display="flex" justifyContent="center" p={2}>
        <Grid container spacing={2} style={{ maxWidth: '100%' }}>
          {boards?.map((board) => (
            <Board
              key={board._id}
              name={board.name}
              id={board._id}
              updateBoardName={updateBoardName}
              deleteBoard={deleteBoard}
            />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getBoardsApi();

  return {
    props: {
      data: data,
    },
  };
}
