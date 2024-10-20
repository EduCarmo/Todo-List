import { useState, useEffect } from 'react';
import Todo from "./components/Todo"
import "./App.css";
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';
import axios from 'axios';


function App() {
  
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");


  //URL do backend do Spring Boot
  const API_URL = 'http://localhost:8080/api/tarefas';
  const CRIAR_TAREFA = API_URL + "/criarTarefa"
  //const DELETAR_TAREFA = API_URL + "/deletarTarefa"

  //Função para buscar todas as tarefas (GET)

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL+"/listarTarefa");
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas', error);
    }
  };

  //Função para adicionar nova Tarefa (POST)
  const addTodo = async (text, category) => {
    const newTodo = {
      text,
      category,
      isCompleted: false,
    };
    try {
      const response = await axios.post(CRIAR_TAREFA, newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Erro ao adiconar tarefa', error);
    }

  };

  //Função para Remover uma Tarefa
  const removeTodo = async (id) => {

    try {
      await axios.delete(`${API_URL}/deletarTarefa/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Erro ao remover tarefa', error);
    }
  };

  //Função Editar Tarefa
  // Função para Editar Tarefa (PUT)
const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/editarTarefa/${id}`, updatedTodo);
    // Atualiza a lista de tarefas com a tarefa atualizada
    setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
  } catch (error) {
    console.error('Erro ao editar tarefa', error);
  }
};



  //Função para completar Tarefa
  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };


  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === 'All'
              ? true
              : filter === 'Completed'
              ? todo.isCompleted
              : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === 'Asc'
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
              updateTodo={updateTodo}

            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;