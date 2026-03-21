import React from "react";

function Table({ title, columns }) {
  return (
    <div className="card">
      <div className="card-header">
        <strong>{title} Table</strong>
      </div>

      <div className="card-body p-0">
        <table className="table table-bordered mb-0">
          <thead className="thead-light">
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;