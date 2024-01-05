import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/Header";
import {setTitle} from "./redux/slices/UserSlice";
import {useAppDispatch} from "./redux/store";

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setTitle(''))
  }, [])
  return (
      <h1 className='MainText' style={{textAlign: "center"}}>You should select your note</h1>
  );
}

export default App;
