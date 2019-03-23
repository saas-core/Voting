export default function createContext({ db, daos }) {
  return ({ req }) => {
    const userId = (req.auth && req.auth.userId) || req.headers.jargonuserid
    return {
      db,
      userId,
      daos,
    }
  }
}
