import React from "react";


function TaskItem({ task, onEdit, onDelete, onViewDetails }) {
  return (
    <div>
      <h3>{task}</h3>
      <p>{task.description}</p>
      <button
        type="button"
        className="btn"
        onClick={() => onViewDetails(task.id)}
      >
        Ver Detalhes
      </button>
      <button type="button" className="btn" onClick={() => onEdit(task.id)}>
        Editar
      </button>

      <button
        type="button"
        className="btn btn__danger"
        onClick={() => onDelete(task.id)}
      >
        Deletar
      </button>
    </div>
  );
}

export default TaskItem;
