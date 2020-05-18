import gql from 'graphql-tag';

export const AUTHENTICATE = gql`
  mutation($input: AuthInput!) {
    auth(input: $input) {
      token
      role
      person {
        id
        name
        account {
          id
          phoneNumber
          phoneAreaCode
          phoneCountryCode
          email
          status
        }
      }
    }
  }
`;

export const GET_AIRTABLE_BUSINESS = gql`
  query getAirtableBusiness($airtableId: String) {
    airtableBusiness(airtableId: $airtableId) {
      id
      airtableId
      name
      services
      channels
      categories
      pictures
      website
      whatsapp
      phone
      state
      city
      instagram
      email
      approved
    }
  }
`;

export const GET_AIRTABLE_BUSINESSES = gql`
  query allAirtableBusinesses {
    airtableBusinesses(first: 9999) {
      edges {
        node {
          id
          name
          airtableId
        }
      }
    }
  }
`;

export const GET_BUSINESS_BY_AIRTABLE_ID = gql`
query getBusiness($airtableId: String) {
  business(airtableId: $airtableId) {
    id
    airtableId
  }
}
`;

export const GET_BUSINESS = gql`
  query getBusiness($id: String) {
    business(id: $id) {
      id
      network {
        id
        slug
        name
      }
      slug
      name
      addresses {
        business {
          id
        }
        id
        latitude
        longitude
        current
        street
        streetNumber
        complement
        district
        city
        state
        zipCode
        country
        createdAt
        updatedAt
      }
      categories {
        id
        slug
        id
        translations {
          language {
            id
            isoCode
            name
          }
          name
          description
        }
      }
      channels {
        id
        channel {
          id
          name
        }
        value
      }
      services {
        id
        slug
        priority
        translations {
          id
          language {
            id
            isoCode
            name
          }
          name
          description
        }
      }
      paymentTypes {
        id
        slug
        priority
        translations {
          id
          language {
            id
            isoCode
            name
          }
          name
          description
        }
      }
      pictures {
        id
        type
        description
        originId
        raw {
          id
          url
          size
          width
          height
        }
        small {
          id
          url
          size
          width
          height
        }
        large {
          id
          url
          size
          width
          height
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_BUSINESSES = gql`
  query allBusinesses {
    businesses(first: 9999) {
      edges {
        node {
          id
          name
          slug
          airtableId
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query allCategories {
    categories(first: 9999) {
      edges {
        node {
          id
          slug
          priority
          translations {
            id
            language {
              id
              isoCode
              name
            }
            name
            description
          }
        }
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query getCategory($id: String) {
    category(id: $id) {
      id
      slug
      priority
      translations {
        id
        language {
          id
          isoCode
          name
        }
        name
        description
      }
    }
  }
`;

export const GET_PAYMENT_TYPES = gql`
  query allPaymentTypes {
    paymentTypes(first: 9999) {
      edges {
        node {
          id
          slug
          priority
          translations {
            id
            language {
              id
              isoCode
              name
            }
            name
            description
          }
        }
      }
    }
  }
`;

export const GET_PAYMENT_TYPE = gql`
  query getPaymentType($id: String) {
    paymentType(id: $id) {
      id
      slug
      priority
      translations {
        id
        language {
          id
          isoCode
          name
        }
        name
        description
      }
    }
  }
`;

export const GET_LANGUAGES = gql`
  query allLanguages {
    languages(first: 9999) {
      edges {
        node {
          id
          isoCode
          name
        }
      }
    }
  }
`;

export const GET_LANGUAGE = gql`
  query getLanguage($id: String) {
    language(id: $id) {
      id
      isoCode
      name
    }
  }
`;