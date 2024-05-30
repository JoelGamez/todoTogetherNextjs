// // src/components/ApolloProviderWrapper.tsx
// import dynamic from "next/dynamic";
// import { ReactNode } from "react";

// const ApolloProviderClient = dynamic(() => import("./ApolloProviderClient"), {
//   ssr: false,
// });

// const ApolloProviderWrapper = ({ children }: { children: ReactNode }) => {
//   return <ApolloProviderClient>{children}</ApolloProviderClient>;
// };

// export default ApolloProviderWrapper;
