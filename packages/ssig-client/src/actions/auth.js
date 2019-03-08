import graph from "../graph";

export default function auth(store) {
  return {
    authenticateUser() {
      store.setState({ isAuthenticating: true });

      graph
        .request(
          `
            query {
              me {
                username
              }
            }
          `
        )
        .then(({ me }) => {
          store.setState({ currentUser: me, isAuthenticating: false });
        });
    }
  };
}
