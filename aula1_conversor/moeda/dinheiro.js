function converterValor() {
    let valordolar = document.getElementById("valorInput").value;
    if (valordolar === "") {
    alert("Por favor, digite um valor!");
    return;
    }
    alert("Valor em reais: " + valordolar);
    // Lembrar eu que aqui e definição em dolar ksksksks
    let umdolar = 5.761;
    let resultado = valordolar * umdolar;
    alert("Valor em dólar: $ " + resultado.toFixed(2));
    }