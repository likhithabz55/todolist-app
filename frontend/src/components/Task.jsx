import { useState } from 'react'
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

//import DatePicker from 'react-datepicker';
import './Task.css'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DatePicker from "react-datepicker";

function Task() {

    const [taskname,setTaskname] = useState("");
    const [tasks,setTasks] = useState([]);
    const [deadline,setDeadline] = useState(null);
    const [status,setStatus] = useState("Not Started");
    const [message, setMessage] = useState("");

    const location = useLocation();
    const username  = location.state;
    //const username = dataReceived.username;

    //const { state } = useLocation();

    const handleDateChange = (date) => {
            setDeadline(date);
    };

    const navigate = useNavigate();
    const handleViewTask= () => {
        navigate('/TaskView',{state : username})
    };

    const handleAddTask = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (taskname.trim()) {
            //setTasks([...tasks, {task : taskname.trim(),date: deadline, status}]); // Add task to the list
            console.log(deadline);
            const formattedDeadline = deadline ? deadline.toISOString().split('T')[0] : '';
            const newTask = {
                taskName: taskname.trim(),
                deadline: formattedDeadline, // Ensure the date is in a proper format
                status: status,
            };
            console.log(taskname);
            console.log(deadline);
            console.log(status);
            console.log(newTask);
            console.log(username);
            //axios.post(`${process.env.REACT_APP_TASK_SERVICE_URL}/addTask`, {username, taskname : taskname.trim(), deadline : formattedDeadline, status})
            axios.post(`http://localhost/tasks/addTask`, {username, taskname : taskname.trim(), deadline : formattedDeadline, status})
                .then((res) => {
                    console.log(res.data);
                    setMessage(res.data);

                    //setTaskname("");
                    //setDeadline(null);
                    //setStatus("Not Started");
                })
                .catch((err) => {
                        if (err.response) {
                            console.log(err.response.data);  // This will work if `err.response` is available
                        } else {
                            console.error("Error: No response received from server", err);
                        }
                });
        }
    };
    return (
        <div>
            <button className="view-task-button" onClick={handleViewTask}>
                View Tasks
            </button>
            <div className='task-container'>
                <form className="task-form" onSubmit={handleAddTask}>
                    <div className='task-inputs'>
                        <input type="text" value={taskname} placeholder="Enter Task"//value={taskName}
                               onChange={(e) => setTaskname(e.target.value)}/>
                        <div>
                            <label htmlFor="deadline">Deadline:</label>
                            <DatePicker
                                type="Date" id="deadline"
                                selected={deadline}
                                placeholder="Enter Deadline"
                                onChange={handleDateChange}
                                // eslint-disable-next-line react/no-unknown-property
                                dateFormat="yyyy/MM/dd"/>
                        </div>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button type="submit" onClick={handleAddTask}>Add</button>
                    </div>
                </form>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default Task;