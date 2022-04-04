import { useEffect, useState } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
//     const [tasks, setTasks] = useState([
//         {
//             id: 1,
//             text: 'Doctors Appointment',
//             day: 'Feb 5th at 2:30',
//             reminder: true,
//         },
//         {
//             id: 2,
//             text: 'Meeting at school',
//             day: 'Feb 6th at 1:30',
//             reminder: true,
//         },
//         {
//             id: 3,
//             text: 'Food Shopping',
//             day: 'Feb 6th at 2:30',
//             reminder: false,
//         },
//   ])

    useEffect(() => {
        fetchTasks().then(tasks => setTasks(tasks))
    }, [])

    async function fetchTasks() {
        const response = await fetch('http://0.0.0.0:8000/tasks/')
        const tasks = await response.json()
        console.log(tasks)
        return tasks
    }

    // Delete task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Add Task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 1000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }

    // Toggle Reminder
    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => 
            task.id === id ? { ...task, reminder: 
                !task.reminder } : task
                )
        )
    }

    return (
        <div className="container">
            <Header 
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}
            />
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? (
            <Tasks tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={toggleReminder} 
            />) 
            : (
            'No Tasks to show'
            )}
        </div>
    );
}

export default App;
