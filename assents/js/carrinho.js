var precos = [229.90, 299.90, 599.90];

// Cupons de desconto 
var cuponsValidos = {
  "VERITAS10": 10,   
  "FRETE20":   20,  
};

var descontoAtivo = 0; 


function mudarQtd(botao, variacao) {
  var controle = botao.parentElement;
  var numero   = controle.querySelector("span");
  var item     = controle.closest(".item");
  var indice   = obterIndiceItem(item);

  var qtd = parseInt(numero.textContent) + variacao;
  if (qtd < 1) qtd = 1;
  if (qtd > 99) qtd = 99;

  numero.textContent = qtd;

  
  var precoEl   = item.querySelector(".item-preco");
  var novoPreco = precos[indice] * qtd;
  precoEl.textContent = formatarReais(novoPreco);

  atualizarResumo();
}


function removerItem(botao) {
  var item = botao.closest(".item");

  
  item.style.transition = "opacity 0.3s, transform 0.3s";
  item.style.opacity    = "0";
  item.style.transform  = "translateX(30px)";

  setTimeout(function () {
    var indice = obterIndiceItem(item);

   
    precos.splice(indice, 1);
    item.remove();

    atualizarResumo();
    atualizarContadorItens();
  }, 300);
}


function aplicarCupom() {
  var inputCupom = document.querySelector(".cupom input");
  var codigo     = inputCupom.value.trim().toUpperCase();
  var mensagem   = document.getElementById("msg-cupom");

  if (codigo === "") {
    mostrarMensagemCupom("Digite um código de cupom.", "erro");
    return;
  }

  if (cuponsValidos[codigo] !== undefined) {
    descontoAtivo = cuponsValidos[codigo];
    mostrarMensagemCupom("Cupom aplicado! " + descontoAtivo + "% de desconto.", "sucesso");
    inputCupom.disabled = true;
    document.querySelector(".btn-cupom").disabled = true;
    document.querySelector(".btn-cupom").textContent = "Aplicado ✓";
  } else {
    descontoAtivo = 0;
    mostrarMensagemCupom("Cupom inválido. Tente novamente.", "erro");
  }

  atualizarResumo();
}


function atualizarResumo() {
  var itens   = document.querySelectorAll(".item");
  var subtotal = 0;

  itens.forEach(function (item, indice) {
    var qtd = parseInt(item.querySelector(".quantidade span").textContent);
    subtotal += precos[indice] * qtd;
  });

  var valorDesconto = subtotal * (descontoAtivo / 100);
  var total         = subtotal - valorDesconto;

  document.getElementById("subtotal").textContent  = formatarReais(subtotal);
  document.getElementById("desconto").textContent  = "- " + formatarReais(valorDesconto);
  document.getElementById("total").textContent     = formatarReais(total);

  
  var linhaDesconto = document.getElementById("linha-desconto");
  linhaDesconto.style.display = descontoAtivo > 0 ? "flex" : "none";
}


function atualizarContadorItens() {
  var qtdItens  = document.querySelectorAll(".item").length;
  var subtitulo = document.querySelector(".subtitulo");
  var texto     = qtdItens === 1 ? "1 item selecionado" : qtdItens + " itens selecionados";

  subtitulo.textContent = texto;


  if (qtdItens === 0) {
    var coluna = document.querySelector(".coluna-esquerda");
    var aviso  = document.createElement("div");
    aviso.id   = "carrinho-vazio";
    aviso.style.cssText = "text-align:center; padding:60px 20px; color:#888; font-size:15px;";
    aviso.innerHTML = "🛒<br><br>Seu carrinho está vazio.<br><a href='#' style='color:#4E554A; text-decoration:underline;'>Continuar comprando</a>";
    coluna.appendChild(aviso);
  }
}


function finalizarCompra() {
  var qtdItens = document.querySelectorAll(".item").length;

  if (qtdItens === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  var total = document.getElementById("total").textContent;
  alert("✅ Pedido realizado com sucesso!\n\nTotal pago: " + total + "\n\nObrigado por comprar na VERITAS!");
}


function obterIndiceItem(item) {
  var todosItens = document.querySelectorAll(".item");
  return Array.from(todosItens).indexOf(item);
}


function formatarReais(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}


function mostrarMensagemCupom(texto, tipo) {
  var mensagem = document.getElementById("msg-cupom");
  mensagem.textContent = texto;
  mensagem.style.color = tipo === "sucesso" ? "#4E554A" : "#C0392B";
}