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
import Projects from './pages/projects/Projects';
import ProjectsSingle from './pages/single/ProjectsSingle';
import Categories from './pages/projects/Categories';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import { Toaster } from "react-hot-toast";
import Feedback from './pages/projects/Feedback';



function App() {
  const {darkMode} = useContext(ThemeContext);
  
  return (
    <div className={darkMode? 'app dark': 'app' }>
      <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route  path="users">
        <Route index element={<List />}   />
        <Route path=":id" element={<Single />} />
        <Route path="new" element={<New inputs={userInputs}  title={"Add New User"}/>} />

        </Route>
        <Route  path="projects">
        <Route index element={<Projects />}   />
        <Route path=":id" element={<ProjectsSingle />} />
        <Route path="new" element={<New inputs={productInputs} title={"Add New Product"} />} />
        </Route>
        <Route path='categories'>
          <Route index element={<Categories />} />
        </Route>
        <Route path='feedback'>
          <Route index element={<Feedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App
