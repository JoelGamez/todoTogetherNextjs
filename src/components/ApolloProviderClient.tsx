// src/components/ApolloProviderClient.tsx
"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";

const ApolloProviderClient = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderClient;

// // src/components/ApolloProviderClient.tsx
// "use client";

// import { ReactNode } from "react";
// import { ApolloProvider } from "@apollo/client";
// import client from "../lib/apollo-client";
// import AuthWrapper from "./AuthWrapper";

// const ApolloProviderClient = ({ children }: { children: ReactNode }) => {
//   return (
//     (
//       <ApolloProvider client={client}>
//         <AuthWrapper>{children}</AuthWrapper>
//       </ApolloProvider>
//     )
//   );
// };

// export default ApolloProviderClient;
