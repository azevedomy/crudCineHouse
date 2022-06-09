/* ------ DICIONÁRIO -----------------------------------------
* GET- LISTAR
* POST - CRIAR
* PUT - ATUALIZAR
* DELETE - DELETAR

* Request Params (Recursos para identificar produtos, comopor exemplo um prato de um cardápio no site ifood)

* Router Params (é a rota que exibe um conteudop especifico)

* Request Body  (Todo conteudo dentro do corpo de uma requisição)
*/

// POST - CRIA UMA INFORMAÇÃO


const express = require("express");
const { v4 } = require("uuid");

const app = express();

app.use(express.json());

const catalogo = [];

app.get("/catalago", (request, response) => {
  return response.json(catalogo);
})

app.post("/catalago", (request, response) => {
  const { title, duracao, atores, anoLancamento, emCartaz } = request.body;

  const filme = { id: v4(), title, duracao, atores, anoLancamento, emCartaz };

  catalogo.push(filme);

  return response.json(filme);
});

app.put("/catalago/:id", (request, response) => {
  const { id } = request.params;
  const { title, duracao, atores, anoLancamento, emCartaz } = request.body

  const filmeIndex = catalogo.findIndex(filme => filme.id === id)

  if(filmeIndex < 0) {
    return response.status(400).json({error: "Filme nao encontrado no catalogo"})
  }

  const filme = {
    id, 
    title,
    duracao,
    atores,
    anoLancamento,
    emCartaz
  }

  catalogo[filmeIndex] = filme

  return response.json(filme);
});

app.delete("/catalogo/:id", (request, response) => {
  const { id } = request.params;

  const filmeIndex = catalogo.findIndex(filme => filme.id === id)

  if(filmeIndex < 0) {
    return response.status(400).json({error: "Filme nao encontrado no catalogo"})
  };

  catalogo.splice(filmeIndex, 1)

  return response.status(204).send()

})

app.listen(8080);