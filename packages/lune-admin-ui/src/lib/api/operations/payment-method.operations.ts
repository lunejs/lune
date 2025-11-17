import { graphql } from '../codegen';

export const COMMON_PAYMENT_METHOD_FRAGMENT = graphql(`
  fragment CommonPaymentMethod on PaymentMethod {
    id
    name
    enabled
    handler {
      code
      args
    }
  }
`);

export const COMMON_PAYMENT_HANDLER_FRAGMENT = graphql(`
  fragment CommonPaymentHandler on PaymentHandler {
    name
    code
    args
  }
`);

export const GET_ALL_PAYMENT_METHODS_QUERY = graphql(`
  query GetAllPaymentMethods {
    paymentMethods {
      ...CommonPaymentMethod
    }
  }
`);

export const GET_ALL_PAYMENT_HANDLERS_QUERY = graphql(`
  query GetAllPaymentHandlers {
    paymentHandlers {
      ...CommonPaymentHandler
    }
  }
`);

export const CREATE_PAYMENT_METHOD_MUTATION = graphql(`
  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
    createPaymentMethod(input: $input) {
      apiErrors {
        code
        message
      }
      paymentMethod {
        id
      }
    }
  }
`);

export const UPDATE_PAYMENT_METHOD_MUTATION = graphql(`
  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {
    updatePaymentMethod(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_PAYMENT_METHOD_MUTATION = graphql(`
  mutation RemovePaymentMethod($id: ID!) {
    removePaymentMethod(id: $id)
  }
`);
