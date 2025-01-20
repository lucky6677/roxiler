# Steps to Run The Project
1. Clone the repo.

## Run Frontend

```
1. cd /frontend
2. pnpm install or npm install
3. Create .env file with below mentioned variables.
4. pnpm run dev or npm run dev
```

**ENV**
1. `VITE_BASE_URL=http://localhost:5000/api`


## Run Backend

```
1. cd /backend
2. pnpm install or npm install
3. Create .env file with below mentioned variables.
4. pnpm start or npm start
```

**ENV**

```
1. PORT=5000
2. MONGO_URI=
```

Note: To Initialize the DB, you can do a get request to
`http://localhost:5000/api/transactions/initialize`
