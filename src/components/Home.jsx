import React, { useEffect, useState } from 'react';
import './components.css';
import myimg from './delete1.png'

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }, [tasks]);

  function addTask() {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  }

  function clearAll() {
    setTasks([]);
  }

  function clearOne(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleComplete(id) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  return (
    <div className='Home'>
      <div className="newsletter-form">
        <p className="heading">Make Your Note Now</p>
        <div className="form">
          <label htmlFor="taskInput">Note</label>
          <input
            required
            placeholder="Your idea...."
            name="taskInput"
            id="taskInput"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            aria-label="Enter a new task"
          />
          <button onClick={addTask} aria-label="Add task">ADD</button>
          <button onClick={clearAll} aria-label="Clear all tasks">Clear All</button>
          <div>
            <h1>Tasks:</h1>
            <ul role="list" aria-label="Task list">
              {tasks.length > 0 ? tasks.map((task) => (
                <div className="list" key={task.id}> 
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
                  />
                  <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                    {task.text}
                  </li>
                  <img 
                    src={myimg} 
                    alt="Delete task" 
                    style={{width:"30px" ,height:"30px"}}  
                    onClick={() => clearOne(task.id)}
                    aria-label={`Delete task "${task.text}"`}
                  />
                </div>
              )) : <h4>No element found</h4>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}