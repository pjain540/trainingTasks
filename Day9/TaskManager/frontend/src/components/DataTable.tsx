import React, { useState, useEffect } from 'react';
import { getAllTasks } from '@/api/api';

const DataTable = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getAllTasks();
        setTasks(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mx-4 mt-4">{error}</div>;

  return (
    <div className="glass-card overflow-hidden">
      <div className="table-responsive">
        <table className="table table-dark table-hover mb-0 align-middle">
          <thead>
            <tr>
              <th className="px-4 py-3 text-color-muted small fw-bold text-uppercase opacity-50">Operation Name</th>
              <th className="py-3 text-color-muted small fw-bold text-uppercase opacity-50">Status</th>
              <th className="py-3 text-color-muted small fw-bold text-uppercase opacity-50">Assigned To</th>
              <th className="py-3 text-color-muted small fw-bold text-uppercase opacity-50">Assigned By</th>
              <th className="px-4 py-3 text-color-muted small fw-bold text-uppercase opacity-50 text-end">Created At</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={task._id || idx} border-transparent="true">
                <td className="px-4 py-3 fw-bold">{task.title}</td>
                <td className="py-3">
                   <div className="d-flex align-items-center gap-3">
                      <span className={`badge bg-opacity-10 py-2 px-3 rounded-pill small ${
                        task.status === 'completed' ? 'bg-success text-success' : 
                        task.status === 'on progress' ? 'bg-primary text-primary' :
                        task.status === 'on review' ? 'bg-warning text-warning' :
                        task.status === 'pending' ? 'bg-info text-info' :
                        'bg-secondary text-white'
                      }`} style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>
                        {task.status}
                      </span>
                   </div>
                </td>
                <td className="py-3 small text-color-muted">{task.assignedTo?.name || 'Unassigned'}</td>
                <td className="py-3 small text-color-muted">{task.assignedBy?.name || 'N/A'}</td>
                <td className="px-4 py-3 text-end">
                   <span className="small text-color-muted">
                    {new Date(task.createdAt).toLocaleDateString()}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
