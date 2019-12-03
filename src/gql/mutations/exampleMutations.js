import { gql } from "apollo-boost";

const TEST_POST = gql`
  mutation PutPost($id: String!, $title: String!) {
    putPost(id: $id, title: $title) {
      id
      title
    }
  }
`;

export { TEST_POST };
// mutation PutPost($type: String!) {
//     putPost(type: $type) {
//       id
//       type
//     }
//   }
