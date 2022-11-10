import {batch} from 'react-redux';
import { AppDispatch, GetStateType } from '../redux/store';
import { selectErrorByKey, selectLoadingByKey } from '../redux/app/selectors';
import { selectToken } from '../redux/auth/selectors';
import { _setError, _setFetching } from '../redux/app/actions';
import { hasOwnProperty } from '../types/typeHelpers';
import { logOut } from '../redux/auth/actions';
import { APIerrorLogger } from './errorLogger';

function fetchHandler(key: string, callback: (
  dispatch: AppDispatch,
  getState: GetStateType,
  auth: string) => Promise<boolean | undefined>) {
  return async function (dispatch: AppDispatch, getState: GetStateType) {
    try {
      const loading = selectLoadingByKey(getState(), key);
      const error = selectErrorByKey(getState(), key);
      const auth = selectToken(getState());
      if (!loading && (!!auth || key === 'loginUser')) {
        batch(() => {
          if (error) {
            dispatch(_setError(key, null));
          }
          dispatch(_setFetching(key, true));
        });
        const response = await callback(dispatch, getState, auth);
        batch(() => {
          dispatch(_setFetching(key, false));
          if (!response) {
            console.log("message.error ========> !response", key);
            dispatch(_setError(key, 'message_nothingFound'));
          }
        });
      }
    } catch (e: any) {
      const errorMsg = APIerrorLogger(e);
      let content = errorMsg ? errorMsg : 'message_error';
      if (key !== 'loginUser' && hasOwnProperty(e, "response") && e?.response && e?.response.status === 401) {
        dispatch(logOut())
      }
      batch(() => {
        dispatch(_setError(key, content));
        dispatch(_setFetching(key, false));
      });
    }
  };
}

export default fetchHandler;
