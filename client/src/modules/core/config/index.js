const isDev = process.env.NODE_ENV === "development"
const API = isDev ? `http://192.168.0.100:3000` : process.env.GRAPHQLAPI

export const GRAPHQLAPI = `${API}/graphql?`
export const LOGINAPI = `${API}/login`
