import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from 'utils/storage';
import { TPost } from '../../types/post';

interface TPostSlice {
  posts: TPost[];
}

type UpdatePayload = Pick<TPost, 'id' | 'status'>;

const initialState: TPostSlice = loadState('posts') || {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPost: (state, action: PayloadAction<TPost>) => {
      state.posts = state.posts?.concat(action.payload);
    },
    updateStatus: (state, action: PayloadAction<UpdatePayload>) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id)
          return { ...post, status: action.payload.status };
        return post;
      });
    },
    searchByTitle: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((curr) =>
        curr.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    filterByStatus: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(
        (curr) => curr.status === action.payload
      );
    },
  },
});

export const { createPost, updateStatus, searchByTitle, filterByStatus } =
  postSlice.actions;

export default postSlice.reducer;
