function Task({ task, toggleComplete, editTask, deleteTask }) {
    const getPriorityBadge = (priority) => {
      const colors = {
        faible: "bg-success",
        moyenne: "bg-warning",
        élevée: "bg-danger"
      };
      return colors[priority] || "bg-secondary";
    };
  
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    };
  
    return (
      <div className={`card h-100 shadow-sm ${task.completed ? 'bg-light' : ''}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className={`card-title ${task.completed ? 'text-decoration-line-through text-muted' : 'fw-bold'}`}>
              {task.title}
            </h5>
            <span className={`badge ${getPriorityBadge(task.priority)} px-3 py-2`}>
              {task.priority}
            </span>
          </div>
  
          <p className="card-text text-muted">{task.description}</p>
  
          <p className="mb-3">
            <small className="text-muted">
              📅 Échéance : {formatDate(task.dueDate)}
            </small>
          </p>
  
          <div className="d-flex justify-content-between align-items-center">
            <button
              className={`btn btn-sm ${task.completed ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.completed ? '✔️ Terminée' : '◻️ Marquer comme terminée'}
            </button>
            <div className="btn-group">
              <button className="btn btn-sm btn-outline-primary" onClick={() => editTask(task.id)}>
                ✏️ Modifier
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.id)}>
                ❌ Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Task;