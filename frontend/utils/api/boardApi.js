export const getBoardsApi = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/boards`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching boards', error);
  }
};

export const getBoardApi = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${id}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching board', error);
  }
};

export const saveBoardApi = async (name) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding board', error);
  }
};

export const editBoardApi = async (id, name) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      },
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error editing board', error);
  }
};

export const deleteBoardApi = async (id) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/boards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting board', error);
  }
};
