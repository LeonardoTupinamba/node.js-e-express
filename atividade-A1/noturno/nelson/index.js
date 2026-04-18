function calcularSoma() {
    // 1. Pega os valores dos inputs (e converte para número)
    const n1 = Number(document.getElementById("num1").value);
    const n2 = Number(document.getElementById("num2").value);
  
    // 2. Faz o cálculo
    const soma = n1 + n2;
  
    // 3. Mostra no HTML
    document.getElementById("resultado").textContent = soma;
  }
  