const env = {
  db: {
    host: import.meta.env.VITE_DB_HOST,
    port: import.meta.env.VITE_DB_PORT,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASSWORD,
    name: import.meta.env.VITE_DB_NAME,
  },
};

export default env;
