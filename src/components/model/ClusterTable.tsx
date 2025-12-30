import React from 'react';
import { ClusterRow } from "../../types";
import './modelMainTab.css';

type Props = {
  clusterTable: ClusterRow[];
};

function ClusterTable({ clusterTable }: Props) {
  return (
    <table className="cluster-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Count</th>
          <th>Severity</th>
          <th>Type</th>
          <th>Name</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>

      <tbody>
        {clusterTable.map((row, index) => (
          <tr
            key={index}
            className={row.roadType === "junction" ? "junction" : ""}
          >
            <td className="num">{index + 1}</td>
            <td className="num">{row.count}</td>
            <td className="num severity">
              {row.severityIndex.toFixed(1)}
            </td>
            <td>{row.roadType}</td>
            <td>{row.name}</td>
            <td className="num">
              {Number(row.latitude).toFixed(6)}
            </td>
            <td className="num">
              {Number(row.longitude).toFixed(6)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ClusterTable;