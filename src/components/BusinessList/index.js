import React from 'react';
import { Link } from 'react-router-dom';

const BusinessList = ({data}) => {

  const businesses = data.businesses.edges.map(
    o => ({
      id: o.node.id,
      name: o.node.name,
      slug: o.node.slug,
    })
  );
  
  return (
    <table className="list yellow">
      <thead>
        <tr>
          <td>Estabelecimento</td>
          <td>Opções</td>
        </tr>
      </thead>
      <tbody>
      {
        businesses.map(business => (
          <tr key={business.id}>
            <td>{business.name}</td>
            <td>
              <ul>
                <li><Link to={`/config/${business.id}`}>Configurações</Link></li>
              </ul>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

export default BusinessList;