import { configureStore } from '@reduxjs/toolkit';
import aboutUsReducer from './aboutUsSlice';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import portfolioReducer from './portfolioSlice.ts';
import blogReducer from './blogSlice.ts';
import teamMemberReducer from './teamMemberSlice.ts';
import footerSliderReducer from './footerSliderSlice.ts';


export const store = configureStore({
  reducer: {
    aboutUs: aboutUsReducer,
    auth: authReducer,
    profile: profileReducer,
    portfolio: portfolioReducer,
    blog: blogReducer,
    teamMember: teamMemberReducer,
    footerSlider: footerSliderReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
