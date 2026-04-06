import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Student from "./Student";
import Statistics from "./Statistics";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [majorFilter, setMajorFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showStats, setShowStats] = useState(true);
  const navigate = useNavigate();

  const getStudents = () => {
    axios.get("http://localhost:3000/students").then((res) => {
      setStudents(res.data);
    });
  };

  useEffect(() => { getStudents(); }, []);

  useEffect(() => {
    let result = students;

    if (searchTerm) {
      result = result.filter(s =>
        s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.major.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (majorFilter !== "all") result = result.filter(s => s.major === majorFilter);
    if (levelFilter !== "all") result = result.filter(s => s.level === levelFilter);
    if (statusFilter !== "all") result = result.filter(s => s.status === statusFilter);

    setFilteredStudents(result);
  }, [students, searchTerm, majorFilter, levelFilter, statusFilter]);

  const toggleStatus = (id) => {
    const student = students.find(s => s.id === id);
    const updated = { ...student, status: student.status === 'actif' ? 'inactif' : 'actif' };
    axios.patch(`http://localhost:3000/students/${id}`, updated).then(() => getStudents());
  };

  const deleteStudent = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      axios.delete(`http://localhost:3000/students/${id}`).then(() => getStudents());
    }
  };

  const exportToCSV = () => {
    const headers = ['Nom Complet', 'Email', 'Filière', 'Niveau', 'Statut'];
    const csvData = filteredStudents.map(s => [s.fullName, s.email, s.major, s.level, s.status]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `etudiants_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueMajors = [...new Set(students.map(s => s.major))];
  const uniqueLevels = [...new Set(students.map(s => s.level))];

  return (
    <div className="container mt-5 pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📚 Gestion des Étudiants</h2>
          <small className="text-muted">{students.length} étudiant(s) inscrit(s)</small>
        </div>
        <div className="btn-group">
          <button className="btn btn-outline-success" onClick={exportToCSV}>📥 Exporter CSV</button>
          <button className="btn btn-outline-info" onClick={() => setShowStats(!showStats)}>
            {showStats ? '📊 Masquer stats' : '📈 Afficher stats'}
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/add')}>➕ Ajouter</button>
        </div>
      </div>

      {showStats && students.length > 0 && <Statistics students={students} />}

      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="🔍 Rechercher..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}>
            <option value="all">🎯 Toutes les filières</option>
            {uniqueMajors.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}>
            <option value="all">📚 Tous les niveaux</option>
            {uniqueLevels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">🔄 Tous</option>
            <option value="actif">🟢 Actifs</option>
            <option value="inactif">⚪ Inactifs</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {filteredStudents.map(student => (
          <div key={student.id} className="col-md-6 col-lg-4">
            <Student student={student} toggleStatus={toggleStatus}
              editStudent={(id) => navigate(`/edit/${id}`)} deleteStudent={deleteStudent} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;