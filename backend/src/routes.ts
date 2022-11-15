import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ name: "Fulano Ciclano", age: 99 });
});

// Testando o caminho "/home"
routes.get("/home", (req, res) => {
  return res.json({ name: "Filipe", age: 22 });
});

export { routes as default };
