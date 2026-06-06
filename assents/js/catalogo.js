const abas = document.querySelectorAll('.aba');
const cards = document.querySelectorAll('.card');

abas.forEach(function(aba) {
    aba.addEventListener('click', function() {
        const categoria = aba.dataset.categoria;
        cards.forEach(function(card) {
            if (categoria === 'todos') {
                card.style.display = 'block'; 
            } else if (card.classList.contains(categoria)) {
                card.style.display = 'block'; 
            }else {
                card.style.display = 'none'; 
            }
        })
});        
    });  
const checkboxes = document.querySelectorAll('[data-tipo]');

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    const tipo = checkbox.dataset.tipo;
    
    if (checkbox.checked) {
      cards.forEach(function(card) {
        if (card.classList.contains(tipo)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    } else {
      cards.forEach(function(card) {
        card.style.display = 'block';
      });
    }
  });
});