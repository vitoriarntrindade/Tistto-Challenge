import React from "react";


function TaskItem({ task, onEdit, onDelete, onViewDetails }) {
  return (
    <div>
      <div className="title">
        <h3 className="taskItem">{task}</h3>
      </div>
      <p>{task.id}</p>
      <button
        type="button"
        className="btn"
        onClick={() => onViewDetails(task.id)}
      >
        Ver mais
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
