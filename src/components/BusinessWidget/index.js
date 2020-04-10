import React from 'react';

// import TextEditor from "../TextEditor";

const BusinessWidget = ({title, data, className, refetch}) => {

  console.log('Business Widget title:', title);
  console.log('Business Widget className:', className);
  console.log('Business Widget refetch:', refetch);
  console.log('Business Widget data:', data);

  return <div />;

  // const {
  //   id,
  //   firstName,
  //   lastName,
  //   presentationName,
  //   bio
  //  } = data;

  // return (
  //   <div className={className}>
  //     <fieldset>
  //       <legend>{title}</legend>

  //       <TextEditor
  //         id={id}
  //         mutation="updateSeller"
  //         input="updateSellerInput"
  //         field="firstName"
  //         legend="Primeiro nome"
  //         value={firstName}
  //         refetch={refetch}
  //       />

  //       <TextEditor
  //         id={id}
  //         mutation="updateSeller"
  //         input="updateSellerInput"
  //         field="lastName"
  //         legend="Sobrenome"
  //         value={lastName}
  //         refetch={refetch}
  //       />

  //       <TextEditor
  //         id={id}
  //         mutation="updateSeller"
  //         input="updateSellerInput"
  //         field="presentationName"
  //         legend="Nome de apresentação"
  //         value={presentationName}
  //         refetch={refetch}
  //       />

  //       <TextEditor
  //         id={id}
  //         mutation="updateSeller"
  //         input="updateSellerInput"
  //         field="bio"
  //         legend="Bio"
  //         value={bio}
  //         refetch={refetch}
  //         multiline
  //       />

  //     </fieldset>
  //   </div>
  // )
}

export default BusinessWidget;