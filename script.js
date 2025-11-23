let dados = [];

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
      try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
      } catch (error) {
          console.error("Erro ao buscar dados do JSON:", error);
          return; // Interrompe a execução se não conseguir carregar os dados
      }
    }

    const campoBusca = document.querySelector("#campo-busca");
    const termoBusca = campoBusca.value.toLowerCase();

    const resultados = dados.filter(dado => {
        const nome = dado.nome.toLowerCase();
        const descricao = dado.descrição.toLowerCase();
        return nome.includes(termoBusca) || descricao.includes(termoBusca);
    });

    renderizarCards(resultados);
}

function renderizarCards(dados) {
    let container = document.querySelector(".card-container");
    container.innerHTML = "";

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");

        article.innerHTML = `
    <img src="${dado.imagem}" alt="${dado.nome}">
    <h2>${dado.nome}</h2>
    <p>${dado.descrição}</p>
    <a href="${dado.link}" target="_blank">Saiba mais</a>
`;

        container.appendChild(article);
    }
}


// Carrega todos os cards quando a página é carregada pela primeira vez
document.addEventListener("DOMContentLoaded", iniciarBusca);

// Adiciona um "ouvinte" para o evento de digitação no campo de busca
const campoBusca = document.querySelector("#campo-busca");
if (campoBusca) {
    campoBusca.addEventListener("input", iniciarBusca);
}