import { useState, useEffect } from 'react';
import './App.css';
import ToDoForm from "./AddTask";
import ToDo from "./Task";
import axios from 'axios';

const STORE = 'dog-planner-state';

function App() {
  const [dailyAdvice, setDailyAdvice] = useState('...');
  const [dogImage, setDogImage] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const adRes = await axios.get('https://api.adviceslip.com/advice');
        setDailyAdvice(adRes.data?.slip?.advice || 'Нет связи');
      } catch (err) {
        setDailyAdvice('Ошибка');
      }

      try {
        const imgRes = await axios.get('https://random.dog/woof.json');
        setDogImage(imgRes.data?.url || '');
      } catch (err) {
        setDogImage('');
      }
    }
    init();
  }, []);

  useEffect(() => {
    const mem = localStorage.getItem(STORE);
    if (mem) {
      try {
        const parsed = JSON.parse(mem);
        if (Array.isArray(parsed)) setTasks(parsed);
      } catch (e) {
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORE, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([{ id: Date.now().toString(), task: text, complete: false }, ...tasks]);
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, complete: !t.complete } : t))
    );
  };

  return (
    <div className="layout-wrapper">
      <header className="page-header">
        <h1>Список дел</h1>
        <p>Задач в списке: {tasks.length}</p>
      </header>

      <div className="content-grid">
        <main className="main-content">
          <ToDoForm addTask={addTask} />
          <div className="tasks-container">
            {tasks.map((t) => (
              <ToDo
                todo={t}
                key={t.id}
                toggleTask={handleToggle}
                removeTask={removeTask}
              />
            ))}
          </div>
        </main>

        <aside className="sidebar">
          <div className="info-card">
            <h4>Случайный совет</h4>
            <p>{dailyAdvice}</p>
          </div>
          {dogImage && (
            <div className="info-card">
              <h4>Пес дня</h4>
              <img src={dogImage} alt="Собака" className="side-img" />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;