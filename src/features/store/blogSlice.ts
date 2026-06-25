import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: 'superadmin';
}

interface BlogsState {
  blogs: BlogPost[];
}

const initialState: BlogsState = {
  blogs: [],
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action: PayloadAction<BlogPost>) {
      const exists = state.blogs.some(b => b.id === action.payload.id);
      if (!exists) state.blogs.push(action.payload);
    },
    updateBlog(state, action: PayloadAction<BlogPost>) {
      const idx = state.blogs.findIndex(b => b.id === action.payload.id);
      if (idx !== -1) {
        state.blogs[idx] = { ...action.payload, updatedAt: new Date().toISOString() };
      }
    },
    deleteBlog(state, action: PayloadAction<string>) {
      state.blogs = state.blogs.filter(b => b.id !== action.payload);
    },
  },
});

export const { addBlog, updateBlog, deleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;