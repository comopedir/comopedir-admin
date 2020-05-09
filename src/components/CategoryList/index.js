import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({data}) => {

  const categories = data.categories.edges.map(
    o => ({
      id: o.node.id,
      slug: o.node.slug,
      priority: o.node.priority,
      translations: o.node.translations,
    })
  );

  console.log(categories);
  
  return (
    <table className="list green">
      <thead>
        <tr>
          <td>Categoria</td>
          <td>Prioridade</td>
          <td>Traduções</td>
        </tr>
      </thead>
      <tbody>
      {
        categories.map(category => (
          <tr key={category.id}>
            <td><Link to={`/category/${category.id}`}>{category.slug}</Link></td>
            <td>{category.priority}</td>
            <td>{
              category.translations.map(translation => (
                <div> Yeah </div>
              ))
            }</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

export default CategoryList;