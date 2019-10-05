import { gql } from "apollo-boost";

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export { EXCHANGE_RATES };
