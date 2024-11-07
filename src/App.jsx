import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Task";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //este useEffect abaixo só é executado na primeira e única
  //vez que o usuário acessa a aplicação
  //POR CONTA DELA POSSUIR UMA LISTA VAZIA
  /*useEffect(() => {
    const fetchTasks = async () => {
      // CHAMAR API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      // PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json();

      // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
      //CÓDIGO ABAIXO É PARA CHAMAR API E PEGAR TAREFAS
      //setTasks(data)
    }
    fetchTasks();
  }, []);*/

  function onTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      //PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      //NÃO PRECISO ATUALIZAR A TAREFA
      return task;
    });
    setTasks(newTask);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />

        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
