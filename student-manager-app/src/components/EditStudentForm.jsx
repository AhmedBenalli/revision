import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditStudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    fullName: "", email: "", major: "", level: "", status: "actif"
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/students/${id}`).then((res) => {
      setStudent(res.data);
    }).catch(() => { alert("Erreur de chargement."); navigate("/"); });
  }, [id, navigate]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!student.fullName.trim()) newErrors.fullName = "Requis";
    if (!student.email.trim()) newErrors.email = "Requis";
    else if (!validateEmail(student.email)) newErrors.email = "Email invalide";
    if (!student.major) newErrors.major = "Requis";
    if (!student.level) newErrors.level = "Requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    axios.put(`http://localhost:3000/students/${id}`, student).then(() => {
      alert("Étudiant mis à jour !");
      navigate("/");
    }).catch(() => alert("Erreur de mise à jour."));
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3>✏️ Modifier l'étudiant</h3>
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Nom complet *</label>
                  <input type="text" className="form-control" name="fullName"
                    value={student.fullName} onChange={handleChange} />
                  {errors.fullName && <div className="text-danger small">{errors.fullName}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input type="email" className="form-control" name="email"
                    value={student.email} onChange={handleChange} />
                  {errors.email && <div className="text-danger small">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Filière *</label>
                  <select className="form-select" name="major"
                    value={student.major} onChange={handleChange}>
                    <option value="">Choisir...</option>
                    <option value="Informatique">💻 Informatique</option>
                    <option value="Gestion">📊 Gestion</option>
                    <option value="Marketing">📈 Marketing</option>
                    <option value="Droit">⚖️ Droit</option>
                    <option value="Ingénierie">🔧 Ingénierie</option>
                  </select>
                  {errors.major && <div className="text-danger small">{errors.major}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Niveau *</label>
                  <select className="form-select" name="level"
                    value={student.level} onChange={handleChange}>
                    <option value="">Choisir...</option>
                    <option value="1ère année">1ère année</option>
                    <option value="2ème année">2ème année</option>
                    <option value="3ème année">3ème année</option>
                    <option value="Master 1">Master 1</option>
                    <option value="Master 2">Master 2</option>
                  </select>
                  {errors.level && <div className="text-danger small">{errors.level}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Statut</label>
                  <select className="form-select" name="status"
                    value={student.status} onChange={handleChange}>
                    <option value="actif">🟢 Actif</option>
                    <option value="inactif">⚪ Inactif</option>
                  </select>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-warning">Mettre à jour</button>
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

export default EditStudentForm;