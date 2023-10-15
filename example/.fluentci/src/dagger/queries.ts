import { gql } from "../../deps.ts";

export const test = gql`
  query test($src: String!) {
    test(src: $src)
  }
`;

export const uberjar = gql`
  query uberjar($src: String!) {
    uberjar(src: $src)
  }
`;
