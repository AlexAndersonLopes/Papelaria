/* ============================================================
   LISTA DE PRODUTOS
   Para adicionar um novo produto, copie um bloco { ... } abaixo,
   troque o "id" (não pode repetir), o nome, a descrição, o preço
   e o caminho da imagem (coloque o arquivo dentro da pasta "images").
   ============================================================ */
const produtos = [
  {
    id: 1,
    nome: "Caderno 10 matérias LILO",
    descricao: "Capa dura, 200 folhas pautadas.",
    preco: 29.90,
    imagem: "images/caderno10mat.jpeg"
  },
  {
  id: 21,
    nome: "Caderno Universitário 10 matérias",
    descricao: "Capa dura, 200 folhas pautadas.",
    preco: 31.90,
    imagem: "images/caderno15.jpeg"
  },
  {
    id: 22,
      nome: "Caderno de desenho",
      descricao: "Capa dura, 200 folhas pautadas.",
      preco: 16.90,
      imagem: "images/desenho.jpeg"
    },
  {
    id: 2,
    nome: "Caneta Luxo Azul",
    descricao: "Ponta fina 1.0mm, escrita macia.",
    preco: 12.50,
    imagem: "images/images.jpeg"
  },
  {
    id: 3,
    nome: "Estojo Escolar Marron",
    descricao: "Estojo duplo com zíper, várias cores.",
    preco: 34.90,
    imagem: "images/estojo2.webp"
  },
  {
    id: 33,
    nome: "Estojo Escolar Azul simples",
    descricao: "Estojo duplo com zíper, várias cores.",
    preco: 24.90,
    imagem: "images/estojo11.jpeg"
  },
  {
    id: 4,
    nome: "Lápis de Cor 24 cores",
    descricao: "Caixa com 24 lápis de cor sextavados.",
    preco: 22.00,
    imagem: "images/lapiscores.jpeg"
  },
  {
    id: 5,
    nome: "Mochila Escolar Rosa",
    descricao: "Mochila reforçada meninas.",
    preco: 129.90,
    imagem: "images/mochilarosa.jpeg"
  },
  {
    id: 55,
    nome: "Mochila Escolar Preta",
    descricao: "Mochila reforçada com compartimento para notebook.",
    preco: 109.90,
    imagem: "images/mochilapreta.jpeg"
  },
  {
    id: 6,
    nome: "Régua 30cm",
    descricao: "Régua de acrílico transparente.",
    preco: 4.50,
    imagem: "images/regua.jpeg"
  },
  {
    id: 40,
    nome: "Lapiseira",
    descricao: "Lapiseira Branco celeste",
    preco: 9.50,
    imagem: "images/lapíseira.jpeg"
  },


  {
    id: 40,
    nome: "Apontador Azul",
    descricao: "Apontador azul menino",
    preco: 3.50,
    imagem: "images/apontadorrosa.jpeg"
  },
  {
    id: 41,
    nome: "Apontador Rosa",
    descricao: "Apontador de Lapis",
    preco: 4.50,
    imagem: "images/apontador.jpeg"
  },
  {
    id: 42,
    nome: "Lapis Preto",
    descricao: "Lapis de escrever palavras",
    preco: 1.50,
    imagem: "images/lapis.jpeg"
  },
  {
    id: 43,
    nome: "Agenda Escolar",
    descricao: "Agenda Anotações",
    preco: 29.50,
    imagem: "images/agenda.jpeg"
  },
  {
    id: 44,
    nome: "Tinta Guache",
    descricao: "Tinta Guache 6 cores",
    preco: 16.50,
    imagem: "images/guache.jpeg"
  },
  {
    id: 45,
    nome: "Kit de Canetinhas",
    descricao: "Canetinhas coloridas",
    preco: 9.50,
    imagem: "images/canetinhas.jpeg"
  },
  {
    id: 46,
    nome: "Folha Sulfite",
    descricao: "Folha Sulfite 100 unidades",
    preco: 12.50,
    imagem: "images/sulfite.jpeg"
  },
  {
    id: 47,
    nome: "Corretivo",
    descricao: "ERROREX",
    preco: 7.50,
    imagem: "images/corretivo.jpeg"
  },
  {
    id: 48,
    nome: "Cola Atoxica",
    descricao: "Cola Atoxica Colante",
    preco: 6.50,
    imagem: "images/cola.jpeg"
  }

];

/* ============================================================
   FUNÇÕES DE CARRINHO (usam o localStorage do navegador)
   ============================================================ */

// Retorna o carrinho salvo (lista de { id, quantidade })
function obterCarrinho() {
  const dados = localStorage.getItem('carrinho');
  return dados ? JSON.parse(dados) : [];
}

// Salva o carrinho no localStorage
function salvarCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Adiciona um produto ao carrinho (ou aumenta a quantidade)
function adicionarAoCarrinho(idProduto) {
  const carrinho = obterCarrinho();
  const item = carrinho.find(p => p.id === idProduto);

  if (item) {
    item.quantidade += 1;
  } else {
    carrinho.push({ id: idProduto, quantidade: 1 });
  }

  salvarCarrinho(carrinho);
}

// Atualiza a quantidade de um item do carrinho
function alterarQuantidade(idProduto, delta) {
  let carrinho = obterCarrinho();
  const item = carrinho.find(p => p.id === idProduto);
  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(p => p.id !== idProduto);
  }

  salvarCarrinho(carrinho);
  renderizarCarrinho();
  atualizarContadorCarrinho();
}

// Remove um item do carrinho
function removerDoCarrinho(idProduto) {
  let carrinho = obterCarrinho();
  carrinho = carrinho.filter(p => p.id !== idProduto);
  salvarCarrinho(carrinho);
  renderizarCarrinho();
  atualizarContadorCarrinho();
}

// Atualiza o número exibido no ícone do carrinho
function atualizarContadorCarrinho() {
  const contador = document.getElementById('contador-carrinho');
  if (!contador) return;
  const carrinho = obterCarrinho();
  const total = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  contador.textContent = total;
}

// Formata número para moeda brasileira
function formatarPreco(valor) {
  return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

/* ============================================================
   RENDERIZAÇÃO - PÁGINA INICIAL (lista de produtos)
   ============================================================ */
function renderizarProdutos() {
  const container = document.getElementById('lista-produtos');
  if (!container) return;

  container.innerHTML = '';

  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'card-produto';

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="info-produto">
        <h3>${produto.nome}</h3>
        <p class="descricao">${produto.descricao}</p>
        <p class="preco">${formatarPreco(produto.preco)}</p>
        <button class="btn-comprar-produto">Comprar</button>
      </div>
    `;

    // Ao clicar em "Comprar": adiciona ao carrinho e vai para a página do carrinho
    card.querySelector('.btn-comprar-produto').addEventListener('click', () => {
      adicionarAoCarrinho(produto.id);
      window.location.href = 'carrinho.html';
    });

    container.appendChild(card);
  });
}

/* ============================================================
   RENDERIZAÇÃO - PÁGINA DO CARRINHO
   ============================================================ */
function renderizarCarrinho() {
  const container = document.getElementById('lista-carrinho');
  const totalEl = document.getElementById('total-carrinho');
  if (!container || !totalEl) return;

  const carrinho = obterCarrinho();
  container.innerHTML = '';

  if (carrinho.length === 0) {
    container.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
    totalEl.textContent = formatarPreco(0);
    return;
  }

  let total = 0;

  carrinho.forEach(item => {
    const produto = produtos.find(p => p.id === item.id);
    if (!produto) return;

    const subtotal = produto.preco * item.quantidade;
    total += subtotal;

    const div = document.createElement('div');
    div.className = 'item-carrinho';

    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="item-info">
        <h3>${produto.nome}</h3>
        <p class="preco">${formatarPreco(subtotal)}</p>
      </div>
      <div class="controle-quantidade">
        <button class="btn-diminuir">-</button>
        <span>${item.quantidade}</span>
        <button class="btn-aumentar">+</button>
      </div>
      <button class="btn-remover">Remover</button>
    `;

    div.querySelector('.btn-diminuir').addEventListener('click', () => alterarQuantidade(produto.id, -1));
    div.querySelector('.btn-aumentar').addEventListener('click', () => alterarQuantidade(produto.id, 1));
    div.querySelector('.btn-remover').addEventListener('click', () => removerDoCarrinho(produto.id));

    container.appendChild(div);
  });

  totalEl.textContent = formatarPreco(total);
}
