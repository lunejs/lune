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
    fulfillment {
      id
      createdAt
      type
      amount
      total
      details {
        ... on InStorePickupFulfillment {
          id
          pickedUpAt
          readyAt
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
        ... on ShippingFulfillment {
          id
          method
          carrier
          trackingCode
          shippedAt
          deliveredAt
          shippingMethod {
            id
            name
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
    fulfillment {
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
  query CountOrders {
    orders {
      count
    }
  }
`);

export const MARK_ORDER_AS_SHIPPED_MUTATION = graphql(`
  mutation MarkAsShipped($orderId: ID!, $input: MarkOrderAsShippedInput!) {
    markOrderAsShipped(id: $orderId, input: $input) {
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

export const MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION = graphql(`
  mutation MarkAsReadyForPickup($orderId: ID!) {
    markOrderAsReadyForPickup(id: $orderId) {
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

export const MARK_ORDER_AS_DELIVERED_MUTATION = graphql(`
  mutation MarkAsDelivered($orderId: ID!) {
    markOrderAsDelivered(id: $orderId) {
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
