import { useState } from 'react';

/* eslint-disable react/prop-types */
const Todo = ({ todo, removeTodo, completeTodo, updateTodo }) => {
  // Estados para controlar o modo de edição, o texto e a categoria
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newCategory, setNewCategory] = useState(todo.category);

  // Função para alternar o modo de edição
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Função para salvar as edições
  const handleSave = () => {
    updateTodo(todo.id, { ...todo, text: newText, category: newCategory });
    setIsEditing(false);
  };

  return (
    <div
      className="todo"
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "",
      }}
    >
      <div className="content">
        {isEditing ? (
          // Inputs para editar o texto e a categoria
          <>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Editar texto"
            />

            
            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
              <option value="Trabalho">Trabalho</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Outro">Outro</option>
            </select>

          </>
        ) : (
          // Exibição normal do texto e da categoria
          <>
            <p>{todo.text}</p>
            <p>({todo.category})</p>
          </>
        )}
      </div>
      <div>
        {isEditing ? (
          // Botão para salvar as alterações
          <button className="salvar" onClick={handleSave}>
            Salvar
          </button>
        ) : (
          // Botão para entrar no modo de edição
          <button className="editar" onClick={handleEdit}>
            Editar
          </button>
        )}
        <button className="complete" onClick={() => completeTodo(todo.id)}>
          Completar
        </button>
        <button className="remove" onClick={() => removeTodo(todo.id)}>
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
