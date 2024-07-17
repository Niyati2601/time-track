import React, { useContext } from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { productInputs, userInputs } from './FormSource';
import './style/dark.scss';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const {darkMode} = useContext(ThemeContext);
  return (
    <div className={darkMode? 'app dark': 'app' }>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route  path="users">
        <Route index element={<List />}   />
        <Route path=":id" element={<Single />} />
        <Route path="new" element={<New inputs={userInputs}  title={"Add New User"}/>} />

        </Route>
        <Route  path="products">
        <Route index element={<List />}   />
        <Route path=":productId" element={<Single />} />
        <Route path="new" element={<New inputs={productInputs} title={"Add New Product"} />} />
        </Route>
        <Route path='orders'>
          <Route index element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App
