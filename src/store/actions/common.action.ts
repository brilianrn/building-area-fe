import { SET_COMMON_IS_ACTIVE_SIDEBAR } from '../../constants';

export const setIsActiveSidebar = (payload: boolean) => {
  return { type: SET_COMMON_IS_ACTIVE_SIDEBAR, payload };
};
