
import React from 'react';
import { Link } from 'react-router-dom';

const AirtableBusinessList = ({data, businessData}) => {
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
          <td>Status</td>
          <td>Opções</td>
        </tr>
      </thead>
      <tbody>
      {
        airtableBusinesses.map(airtableBusiness => {
          const importedFilter = businessData.businesses.edges.filter(business => business.node.airtableId === airtableBusiness.airtableId);
          return (
            <tr key={airtableBusiness.id}>
              <td>{airtableBusiness.name}</td>
              <td className={importedFilter.length > 0 ? 'active' : ''}>
                {importedFilter.length > 0 ? (
                  <Link to={`/config/${importedFilter[0].node.id}`}>Importado</Link>
                ) : ''}
              </td>
              <td>
                <ul>
                  <li><Link to={`/import/business/${airtableBusiness.airtableId}`}>Ver</Link></li>
                </ul>
              </td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
  )
}

export default AirtableBusinessList;