export const getListApi = async (boardId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists/${listId}`,
    );
    const data = await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching list', error);
  }
};

export const getListsApi = async (boardId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching lists', error);
  }
};

export const saveListApi = async (boardId, name) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists`,
      {
        method: 'POST',
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
    throw new Error('Error adding list', error);
  }
};

export const editListApi = async (boardId, listId, name) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists/${listId}`,
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
    throw new Error('Error editing list', error);
  }
};

export const deleteListApi = async (boardId, listId) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${boardId}/lists/${listId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
