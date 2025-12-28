import { graphql } from '../codegen';

export const COMMON_ORDER_FRAGMENT = graphql(`
  fragment CommonOrder on Order {
    id
    createdAt
    code
    state
    subtotal
    total
    totalQuantity
    appliedDiscounts {
      code
      applicationLevel
      applicationMode
      discountedAmount
    }
    lines {
      items {
        id
        lineSubtotal
        lineTotal
        quantity
        unitPrice
        appliedDiscounts {
          code
          applicationMode
          discountedAmount
        }
        variant {
          id
          sku
          optionValues {
            id
            name
          }
          assets(input: { take: 1 }) {
            items {
              id
              source
            }
          }
          product {
            id
            name
            slug
            assets(input: { take: 1 }) {
              items {
                id
                source
              }
            }
          }
        }
      }
    }
    customer {
      id
      email
      firstName
      lastName
      phoneNumber
    }
    shippingAddress {
      streetLine1
      streetLine2
      city
      postalCode
      phoneNumber
      references
      country
      countryCode
      state
      stateCode
    }
    deliveryMethod {
      id
      createdAt
      type
      amount
      total
      details {
        ... on DeliveryMethodPickup {
          id
          address {
            streetLine1
            streetLine2
            city
            postalCode
            phoneNumber
            references
            country
            countryCode
            state
            stateCode
          }
          location {
            id
            name
          }
        }
        ... on DeliveryMethodShipping {
          id
          method
          shippingMethod {
            id
            name
          }
        }
      }
    }
    fulfillments {
      items {
        id
        createdAt
        state
        type
        metadata
        lines {
          count
          items {
            id
            quantity
            orderLine {
              id
              lineTotal
              appliedDiscounts {
                code
                applicationMode
                discountedAmount
              }
              variant {
                id
                sku
                optionValues {
                  id
                  name
                }
                assets(input: { take: 1 }) {
                  items {
                    id
                    source
                  }
                }
                product {
                  id
                  name
                  slug
                  assets(input: { take: 1 }) {
                    items {
                      id
                      source
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    payments {
      id
      createdAt
      state
      amount
      method
      transactionId
    }
    cancellation {
      id
      createdAt
      reason
    }
  }
`);

export const COMMON_LIST_ORDER_FRAGMENT = graphql(`
  fragment CommonListOrder on Order {
    id
    code
    state
    total
    subtotal
    totalQuantity
    placedAt
    customer {
      id
      firstName
      lastName
      email
    }
    lines {
      count
    }
    deliveryMethod {
      type
    }
  }
`);

export const GET_ORDER_QUERY = graphql(`
  query GetOrderById($id: ID!) {
    order(id: $id) {
      ...CommonOrder
    }
  }
`);

export const GET_ALL_ORDERS_QUERY = graphql(`
  query GetAllOrders($input: OrderListInput) {
    orders(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonListOrder
      }
    }
  }
`);

export const COUNT_ORDERS_QUERY = graphql(`
  query CountOrders($input: OrderListInput) {
    orders(input: $input) {
      count
    }
  }
`);

export const MARK_ORDER_AS_COMPLETED_MUTATION = graphql(`
  mutation MarkAsCompleted($orderId: ID!) {
    markOrderAsCompleted(id: $orderId) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);

export const CANCEL_ORDER_MUTATION = graphql(`
  mutation CancelOrder($orderId: ID!, $input: CancelOrderInput!) {
    cancelOrder(id: $orderId, input: $input) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);

export const ADD_FULFILLMENT_TO_ORDER_MUTATION = graphql(`
  mutation AddFulfillmentToOrder($id: ID!, $input: AddFulfillmentToOrderInput!) {
    addFulfillmentToOrder(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);

export const MARK_FULFILLMENT_AS_SHIPPED_MUTATION = graphql(`
  mutation MarkFulfillmentAsShipped($fulfillmentId: ID!, $input: MarkFulfillmentAsShippedInput!) {
    markFulfillmentAsShipped(fulfillmentId: $fulfillmentId, input: $input) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);

export const MARK_FULFILLMENT_AS_READY_FOR_PICKUP_MUTATION = graphql(`
  mutation MarkFulfillmentAsReadyForPickup($fulfillmentId: ID!) {
    markFulfillmentAsReadyForPickup(fulfillmentId: $fulfillmentId) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);

export const MARK_FULFILLMENT_AS_DELIVERED_MUTATION = graphql(`
  mutation MarkFulfillmentAsDelivered($fulfillmentId: ID!) {
    markFulfillmentAsDelivered(fulfillmentId: $fulfillmentId) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);

export const MARK_FULFILLMENT_AS_PICKED_UP_MUTATION = graphql(`
  mutation MarkFulfillmentAsPickedUp($fulfillmentId: ID!) {
    markFulfillmentAsPickedUp(fulfillmentId: $fulfillmentId) {
      apiErrors {
        code
        message
      }
      order {
        id
      }
    }
  }
`);
