import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useCustomDispatch = (action: any) => {
  const dispatch = useDispatch<AppDispatch>();

  dispatch(action);
};

//export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCustomSelector: TypedUseSelectorHook<RootState> = (selector: any) => {
  return useSelector(selector);
};
