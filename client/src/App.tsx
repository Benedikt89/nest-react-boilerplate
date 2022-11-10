import React from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home';

import './App.css';
import useEffectOnce from './utils/hooks/useEffectOnce';
import { AppStateType } from './redux/store';
import { selectLoadingByKey } from './redux/app/selectors';

function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userData, isAuth } = useSelector((state: AppStateType) => state.auth);
  const isLoading = useSelector((state: AppStateType) => selectLoadingByKey(state, 'getUserDataThunk'));

  useEffectOnce(() => {

  });

  return (
    <>
      <div className="App">
        {!isLoading ? (
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Loading...
          </div>
        )}
      </div>
    </>
  );
}

export default App;
