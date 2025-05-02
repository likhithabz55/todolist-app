import logo from './logo.svg';
import './App.css';

import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import nature from './assets/nature.jpg'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import LogIn from './components/LogIn.jsx'
import SignUp from './components/SignUp.jsx'
import Task from './components/Task.jsx'
import TaskView from './components/TaskView.jsx'

function App() {

    const [username, setUsername] = useState(null);

    // Handle login
    const handleLogin = (user) => {
        setUsername(user); // Set the username in state when logging in
    };

    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">LogIn</Link>
                    </li>
                    <li>
                        <Link to="/SignUp">SignUp</Link>
                    </li>
                    <li>
                        <Link to="/TaskView">TaskView</Link>
                    </li>
                    <li>
                        <Link to="/Task">Task</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<LogIn onLogin={handleLogin}/>} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/TaskView" element={<TaskView />} />
                <Route path="/Task" element={<Task />} />
            </Routes>
        </Router>
    );
}
export default App;
