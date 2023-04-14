import express from "express";
import routes from "./routes";
import userRouter from "./routes/user.route";

// A porta é fornecida pela Railway
const port = process.env.PORT || 3333;
const server = express();

server.use(express.json());
server.use(routes);
server.use(userRouter);

server.listen(port, () => {
  console.log(`[SERVIDOR] Rodando na porta ${port}`);
});
