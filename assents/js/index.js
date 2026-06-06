// HEADER MUDA AO ROLAR A PÁGINA


const header = document.querySelector("header");

function mudarHeader() {
  if (window.scrollY > 50) {
    header.classList.add("header-rolado");
  } else {
    header.classList.remove("header-rolado");
  }
}

window.addEventListener("scroll", mudarHeader);


// VALIDAÇÃO DO FORMULÁRIO DE CONTATO

const formulario = document.querySelector(".contato form");

function validarFormulario(evento) {
  evento.preventDefault();

  const nome = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const mensagem = document.querySelector("#message").value.trim();

  if (nome === "" || email === "" || mensagem === "") {
    alert("Por favor, preencha todos os campos antes de enviar.");
    return;
  }

  formulario.innerHTML = "<p class='form-sucesso'>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>";
}

formulario.addEventListener("submit", validarFormulario);


// 4. BOTÃO "VOLTAR AO TOPO"

const botaoTopo = document.createElement("button");
botaoTopo.textContent = "↑";
botaoTopo.id = "btn-topo";
botaoTopo.style.display = "none";
document.body.appendChild(botaoTopo);

function controlarBotaoTopo() {
  if (window.scrollY > 300) {
    botaoTopo.style.display = "block";
  } else {
    botaoTopo.style.display = "none";
  }
}

function voltarAoTopo() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", controlarBotaoTopo);
botaoTopo.addEventListener("click", voltarAoTopo);