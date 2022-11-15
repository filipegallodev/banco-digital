import express from "express";

const cors = require("cors");

const server = express();

// A porta é fornecida pela Railway
const port = process.env.PORT || 3333;

// Configurando cors para o acesso ao servidor
server.use(
  cors({
    origin: "*",
  })
);

server.get("/", (_, res) => {
  res.send("Hello world!");
});

// Testando o caminho "/home"
server.get("/home", (_, res) => {
  res.json({
    name: "Filipe",
    age: 22,
  });
});

server.listen(port, () => {
  console.log(
    `[SERVIDOR] Rodando em https://ng-cash-app-production.up.railway.app/${port}`
  );
});
