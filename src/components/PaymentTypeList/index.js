import React from 'react';
import { Link } from 'react-router-dom';

const PaymentTypeList = ({data}) => {

  const paymentTypes = data.paymentTypes.edges.map(
    o => ({
      id: o.node.id,
      slug: o.node.slug,
      priority: o.node.priority,
      translations: o.node.translations,
    })
  );
  
  return (
    <table className="list green">
      <thead>
        <tr>
          <td>Tipo de pagamento</td>
          <td>Prioridade</td>
          <td>Traduções</td>
        </tr>
      </thead>
      <tbody>
      {
        paymentTypes.map(paymentType => (
          <tr key={paymentType.id}>
            <td><Link to={`/paymentType/${paymentType.id}`}>{paymentType.slug}</Link></td>
            <td>{paymentType.priority}</td>
            <td>{
              paymentType.translations.map(translation => (
                <div key={translation.id}> 
                  <strong>{translation.language.isoCode}:</strong><br />
                  {translation.name}
                </div>
              ))
            }</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

export default PaymentTypeList;