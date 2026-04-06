import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "moyenne",
    completed: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.description || !task.dueDate) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    axios.post("http://localhost:3000/tasks", task).then(() => {
      alert("Tâche ajoutée avec succès !");
      navigate("/");
    }).catch(error => {
      console.error("Erreur lors de l'ajout:", error);
      alert("Erreur lors de l'ajout de la tâche.");
    });
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="card-title mb-4">➕ Ajouter une nouvelle tâche</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Titre *</label>
                  <input type="text" className="form-control" name="title"
                    value={task.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea className="form-control" name="description" rows="3"
                    value={task.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date limite *</label>
                  <input type="date" className="form-control" name="dueDate"
                    value={task.dueDate} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Priorité</label>
                  <select className="form-select" name="priority"
                    value={task.priority} onChange={handleChange}>
                    <option value="faible">🟢 Faible</option>
                    <option value="moyenne">🟡 Moyenne</option>
                    <option value="élevée">🔴 Élevée</option>
                  </select>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Enregistrer</button>
                  <button type="button" className="btn btn-secondary"
                    onClick={() => navigate('/')}>Annuler</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskForm;