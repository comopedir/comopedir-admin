import React from 'react';

const Param = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const ParamMany = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>
      <ul>
          {value.map(
            item => <li key={item}>{item}</li>
          )}
        </ul>
    </td>
  </tr>
);

const ParamPictures = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>
      {value.map(
        item => (
          <div key={item.id}>
            <img
              src={item.thumbnails.large.url}
              width="200"
              alt="Imagem restaurante."
            />
          </div>
        )
      )}
    </td>
  </tr>
);

const AirtableBusinessWidget = ({data, className, refetch}) => {

  const {
    airtableId,
    approved,
    categories,
    channels,
    city,
    email,
    instagram,
    name,
    phone,
    pictures,
    services,
    state,
    website,
    whatsapp,
  } = data;

  return (
    <table className={className}>
    <thead>
      <tr>
        <td>Parâmetro</td>
        <td>Valor</td>
      </tr>
    </thead>
    <tbody>
      <Param name="Nome do Estabelecimento" value={name} />
      <Param name="ID interno no Airtable:" value={airtableId} />
      <Param name="Aprovado?" value={approved} />
      <Param name="Local" value={`${city}/${state}`} />
      <Param name="E-mail" value={email} />
      <Param name="Instagram" value={instagram} />
      <Param name="Telefone para pedidos" value={phone} />
      <Param name="Whatsapp" value={whatsapp} />
      <Param name="Website" value={website} />
      <ParamMany name="Serviços" value={services} />
      <ParamMany name="Categorias" value={categories} />
      <ParamMany name="Canais" value={channels} />
      <ParamPictures name="Imagens" value={pictures} />
      <tr>
        <td colSpan="2">
          <input type="button" value="Importar" />
        </td>
      </tr>
    </tbody>
  </table>
  );
}

export default AirtableBusinessWidget;