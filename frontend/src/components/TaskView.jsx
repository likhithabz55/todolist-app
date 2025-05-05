import { useState, useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import './TaskView.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function TaskView() {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");
    const [statusFilter, setStatusFilter] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);  // Track the task being edited
    const [newStatus, setNewStatus] = useState("");  // Track the new status
    const [newDeadline, setNewDeadline] = useState(new Date());

    const location = useLocation();
    const username  = location.state;
    console.log("username : ", username)
    //const queryParams = new URLSearchParams(location.search);
    //const username = queryParams.get('username');

    const fetchTasks = async (username) => {
        if (username) {
            console.log(process.env.REACT_APP_TASK_SERVICE_URL);
            console.log("username : ", username);
            const response = await axios.get(`/tasks/viewTasks`, {
                params: {username: username}
            })
                .then((response) => {
                    console.log('API response data:', response.data);
                    setTasks(response.data);
                })
                .catch((err) => {
                    console.error('Error fetching tasks:', err);
                    setMessage('Failed to load tasks. Please try again.');
                })
        }
    };

    // Fetch tasks based on a specific status
    const fetchFilteredTasks = (status,username) => {
        //axios.get(`${process.env.REACT_APP_TASK_SERVICE_URL}/viewTasks`, {
        axios.get(`/tasks/viewTasks`, {
            params: {
                username: username,
                status: status
            }
        })
        .then(response => {
            console.log('API response data:', response.data);
            setTasks(response.data);
        })
        .catch(err => {
            console.error('Error fetching tasks:', err);
            setMessage('Failed to load tasks. Please try again.');
        });
    };

    const navigate = useNavigate();
    const handleAddTask = () => {
        navigate('/Task',{state : username})
    };

    useEffect(() => {
        fetchTasks(username);
    }, [username]);

    const handleEditClick = (task) => {
        setTaskToEdit(task);  // Set the task being edited
        setNewStatus(task.status);
        console.log("testing");// Set initial status
        console.log(task.taskname);
        console.log(task.status);
        console.log(task.deadline);
        //setNewDeadline(new Date(task.deadline));  // Set initial deadline
        const parsedDate = new Date(task.deadline);
        if (!isNaN(parsedDate)) {
            setNewDeadline(parsedDate); // Set deadline if valid
        } else {
            setNewDeadline(new Date());  // Default to current date if invalid
        }
        setIsEditing(true);  // Show the modal
    };
    const closeEditModal = () => {
        setIsEditing(false);
        setTaskToEdit(null);
    };
    const handleStatusChange = (event) => {
        const selectedStatus = event.target.value;
        setStatusFilter(selectedStatus);
        if (selectedStatus) {
            fetchFilteredTasks(selectedStatus,username);
        } else {
            // If no filter is selected, revert to the default task fetch
            fetchTasks(username);
        }
    };

    const handleTaskUpdate = (e) => {
       e.preventDefault();
        if(taskToEdit) {
           const updatedTask = {
                taskname : taskToEdit.taskname,//changed
                status: newStatus,
                deadline: newDeadline.toISOString().split('T')[0], // Convert to string format YYYY-MM-DD
            };
           console.log(updatedTask.taskname);
           console.log(updatedTask.deadline);
           console.log(updatedTask.status);
           //axios.post(`${process.env.REACT_APP_TASK_SERVICE_URL}/updateTask`, {
           axios.post(`/tasks/updateTask`, {
               username: username,
               taskname : updatedTask.taskname,
               deadline : updatedTask.deadline,
               status : updatedTask.status,
           })
           .then(res =>{
               console.log('API response data:', res.data);
               //console.log('Task updated successfully:', response);
               setTasks(prevTasks => prevTasks.map(task => task.id === taskToEdit.id ? { ...task, ...updatedTask } : task));
               //setTaskToEdit(null); // Close modal or reset
               //fetchTasks(username);
               closeEditModal();
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
            <button className="add-task-button" onClick={handleAddTask}>
                Add Task
            </button>
            <div className='parent-container'>
                <div className="view-container">
                    {tasks.length > 0 ? (
                        <table className="task-table">
                            <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.taskname}</td>
                                    <td>{new Date(task.deadline).toLocaleDateString()}</td>
                                    <td>{task.status}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(task)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        !message && <p>No tasks found.</p>
                    )}
                </div>
                    {isEditing && (
                        <div className="edit-modal">
                            <div className="modal-content">
                                <h3>Edit Task</h3>
                                <form onSubmit={handleTaskUpdate}>
                                    <label htmlFor="status">Status</label>
                                    <select id="status" value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}>
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        console.log(newStatus);
                                    </select>
                                    <label htmlFor="deadline">Deadline</label>
                                    <DatePicker
                                        type="date"
                                        id="deadline"
                                        selected={newDeadline instanceof Date && !isNaN(newDeadline) ? newDeadline : new Date()}
                                        onChange={(date) => setNewDeadline(date)}
                                        dateFormat="yyyy/MM/dd"
                                    />
                                    <button type="submit" onClick = {handleTaskUpdate}>Save Changes</button>
                                    <button type="button" onClick={closeEditModal}>Cancel</button>
                                </form>
                            </div>
                        </div>
            )}
                <div className="filter-container">
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={handleStatusChange}>
                        <option value="">Upcoming</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="All">All</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default TaskView;