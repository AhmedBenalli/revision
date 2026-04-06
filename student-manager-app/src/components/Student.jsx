function Student({ student, toggleStatus, editStudent, deleteStudent }) {
    const getMajorBadge = (major) => {
      const colors = {
        'Informatique': 'bg-primary',
        'Gestion': 'bg-success',
        'Marketing': 'bg-info',
        'Droit': 'bg-warning',
        'Ingénierie': 'bg-danger'
      };
      return colors[major] || 'bg-secondary';
    };
  
    const getMajorIcon = (major) => {
      const icons = {
        'Informatique': '💻',
        'Gestion': '📊',
        'Marketing': '📈',
        'Droit': '⚖️',
        'Ingénierie': '🔧'
      };
      return icons[major] || '📚';
    };
  
    return (
      <div className={`card h-100 shadow-sm ${student.status === 'inactif' ? 'bg-light' : ''}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 className="card-title fw-bold">{student.fullName}</h5>
              <p className="text-muted small">✉️ {student.email}</p>
            </div>
            <span className={`badge ${student.status === 'actif' ? 'bg-success' : 'bg-secondary'}`}>
              {student.status === 'actif' ? '🟢' : '⚪'} {student.status}
            </span>
          </div>
  
          <div className="mb-3">
            <span className={`badge ${getMajorBadge(student.major)} me-2`}>
              {getMajorIcon(student.major)} {student.major}
            </span>
            <span className="badge bg-outline-secondary">
              🎓 {student.level}
            </span>
          </div>
  
          <div className="d-flex justify-content-between align-items-center">
            <button
              className={`btn btn-sm ${student.status === 'actif' ? 'btn-outline-warning' : 'btn-outline-success'}`}
              onClick={() => toggleStatus(student.id)}
            >
              {student.status === 'actif' ? '⏸️ Désactiver' : '▶️ Activer'}
            </button>
            <div className="btn-group">
              <button className="btn btn-sm btn-outline-primary" onClick={() => editStudent(student.id)}>
                ✏️ Modifier
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteStudent(student.id)}>
                ❌ Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Student;