import express from "express";
import routes from "./routes";

const cors = require("cors");

// A porta é fornecida pela Railway
const port = process.env.PORT || 3333;
const server = express();

server.use(express.json());
server.use(routes);

// Configurando cors para o acesso ao servidor
server.use(
  cors({
    origin: "*",
  })
);

server.listen(port, () => {
  console.log(`[SERVIDOR] Rodando na porta ${port}`);
});
