/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const TaskItem = styled.div`
  background-color: ${(props) => (props.completed ? "#b9eda4" : "#fa9c7a")};
  color: ${(props) => (props.completed ? "#155724" : "#721c24")};
  padding: 10px;
  margin: 5px 0;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 5px 5px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const TaskInput = styled.input`
  padding: 5px;
  margin-right: 10px;
  border-radius: 12px;
  border: 2px solid #ccc;
  min-width: 400px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
const Footer = styled.footer`
  background-color: #999;
  padding: 12px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;  
  right: 0; 
  width: 100%;
  font-size: 14px;
  color: #111;
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nextId, setNextId] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1500);
  });

  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTask = {
      id: nextId,
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setNextId(nextId + 1);
  };
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const deleteById = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: "25px", maxWidth: "750px", margin: "auto" }}>
      {isLoggedIn ? (
        <div className=" border shadow p-3 mb-5 bg-white rounded text-center">
          <div className="p-3">
            <h1>Yapılacaklar ;</h1>
          </div>

          <div>
            <TaskInput
              type="text"
              placeholder="Yapılacak görev..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <Button onClick={addTask}>Ekle</Button>
          </div>

          <div className=" border shadow p-3 m-5 bg-white rounded ">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem key={task.id} completed={task.completed}>
                  {task.text}
                  <ButtonContainer>
                    <Button onClick={() => toggleTaskCompletion(task.id)}>
                      {task.completed ? "Tamamlanmadı" : "Tamamlandı"}
                    </Button>
                    <Button onClick={() => deleteById(task.id)}>
                      Görevi Sil
                    </Button>
                  </ButtonContainer>
                </TaskItem>
              ))
            ) : (
              <p>Yapılacak görev listesi boş..</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center ">Giriş yapılıyor...</p>
      )}
      <div>
        <Footer>Made by Yasin AYDIN &copy; {new Date().getFullYear()}</Footer>
      </div>
    </div>
  );
}

export default App;
