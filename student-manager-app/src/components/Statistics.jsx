import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Statistics({ students }) {
  const totalStudents = students.length;
  const activeCount = students.filter(s => s.status === 'actif').length;
  const inactiveCount = totalStudents - activeCount;

  // Répartition par filière
  const majorsCount = students.reduce((acc, student) => {
    acc[student.major] = (acc[student.major] || 0) + 1;
    return acc;
  }, {});

  const majorsData = Object.entries(majorsCount).map(([name, value]) => ({ name, value }));

  // Répartition par niveau
  const levelsCount = students.reduce((acc, student) => {
    acc[student.level] = (acc[student.level] || 0) + 1;
    return acc;
  }, {});

  const levelsData = Object.entries(levelsCount).map(([name, value]) => ({ name, value }));

  const statusData = [
    { name: 'Actifs', value: activeCount },
    { name: 'Inactifs', value: inactiveCount }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const STATUS_COLORS = ['#28a745', '#6c757d'];

  return (
    <div className="mb-4">
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h2 className="display-4 text-primary">{totalStudents}</h2>
              <p className="text-muted">Total étudiants</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h2 className="display-4 text-success">{activeCount}</h2>
              <p className="text-muted">Étudiants actifs</p>
              <small className="text-muted">
                {totalStudents > 0 ? ((activeCount/totalStudents)*100).toFixed(1) : 0}% du total
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h2 className="display-4 text-secondary">{inactiveCount}</h2>
              <p className="text-muted">Étudiants inactifs</p>
              <small className="text-muted">
                {totalStudents > 0 ? ((inactiveCount/totalStudents)*100).toFixed(1) : 0}% du total
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>📊 Répartition par filière</h6>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={majorsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>🥧 Répartition par niveau</h6>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={levelsData} dataKey="value" outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {levelsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>📈 Répartition par statut</h6>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" outerRadius={80}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;