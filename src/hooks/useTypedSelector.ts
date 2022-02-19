import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/redusers';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
