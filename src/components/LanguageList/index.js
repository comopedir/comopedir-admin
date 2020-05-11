import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const LanguageList = ({data}) => {
  let history = useHistory();
  const { handleSubmit } = useForm();

  const languages = data.languages.edges.map(
    o => ({
      id: o.node.id,
      isoCode: o.node.isoCode,
      name: o.node.name,
    })
  );

  const onSubmit = async () => {  
    history.push(`/language/new`);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="list green">
        <thead>
          <tr>
            <td>Linguagem</td>
            <td>Código</td>
          </tr>
        </thead>
        <tbody>
        {
          languages.map(language => (
            <tr key={language.id}>
              <td><Link to={`/language/${language.id}`}>{language.name}</Link></td>
              <td>{language.isoCode}</td>
            </tr>
          ))
        }
          <tr>
            <td colSpan="2">
              <input type="submit" value="Criar" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default LanguageList;