import { useLocation } from 'react-router-dom';

export const useCustomQueryParams = () =>
    Object.fromEntries(new URLSearchParams(useLocation().search));
