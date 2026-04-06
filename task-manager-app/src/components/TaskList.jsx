import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Task from "./Task";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const navigate = useNavigate();

  const getTasks = () => {
    axios.get("http://localhost:3000/tasks").then((res) => {
      setTasks(res.data);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Filtrer les tâches
  useEffect(() => {
    let result = tasks;

    if (searchTerm) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(task =>
        statusFilter === "completed" ? task.completed : !task.completed
      );
    }

    if (priorityFilter !== "all") {
      result = result.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(result);
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    const updatedTask = { ...task, completed: !task.completed };
    axios.patch(`http://localhost:3000/tasks/${id}`, updatedTask).then(() => {
      getTasks();
    });
  };

  const deleteTask = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      axios.delete(`http://localhost:3000/tasks/${id}`).then(() => {
        getTasks();
      });
    }
  };

  const editTask = (id) => {
    navigate(`/edit/${id}`);
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="container mt-5 pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Mes Tâches</h2>
          <small className="text-muted">
            📊 {completedCount}/{tasks.length} tâches terminées
          </small>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/add')}>
          ➕ Ajouter une tâche
        </button>
      </div>

      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">📋 Tous les statuts</option>
            <option value="completed">✔️ Terminées</option>
            <option value="active">⏳ En cours</option>
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-select" value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">🎯 Toutes les priorités</option>
            <option value="faible">🟢 Faible</option>
            <option value="moyenne">🟡 Moyenne</option>
            <option value="élevée">🔴 Élevée</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            {tasks.length === 0
              ? "Aucune tâche pour le moment. Commencez par en ajouter une !"
              : "Aucune tâche ne correspond à vos critères de recherche."}
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="col-md-6 col-lg-4">
              <Task task={task} toggleComplete={toggleComplete}
                editTask={editTask} deleteTask={deleteTask} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;