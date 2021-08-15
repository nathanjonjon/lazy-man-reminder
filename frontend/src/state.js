import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    needReload: 0,
});

export const setNeedReload = (flag) => {
    setGlobalState('needReload', flag);
};

export { useGlobalState };