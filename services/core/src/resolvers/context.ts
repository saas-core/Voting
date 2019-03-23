export default function createContext({ db }) {
  return ({ req }) => {
    return {
      db
    };
  };
}
