
import React from 'react';
import { Link } from 'react-router-dom';

const AirtableBusinessList = ({data}) => {

  const airtableBusinesses = data.airtableBusinesses.edges.map(
    o => ({
      id: o.node.id,
      name: o.node.name,
      airtableId: o.node.airtableId,
    })
  );
  
  return (
    <table className="list blue">
      <thead>
        <tr>
          <td>Estabelecimento</td>
          <td>Opções</td>
        </tr>
      </thead>
      <tbody>
      {
        airtableBusinesses.map(airtableBusiness => (
          <tr key={airtableBusiness.id}>
            <td>{airtableBusiness.name}</td>
            <td>
              <ul>
                <li><Link to={`/import/business/${airtableBusiness.airtableId}`}>Ver</Link></li>
              </ul>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

export default AirtableBusinessList;