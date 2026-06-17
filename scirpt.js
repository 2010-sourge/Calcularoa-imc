const campoPeso       = document.getElementById('peso');
const campoAltura     = document.getElementById('altura');
const secaoResultado  = document.getElementById('resultado');
const valorIMC        = document.getElementById('valorIMC');
const badgeClass      = document.getElementById('badgeClassificacao');
const marcador        = document.getElementById('marcador');
 

 
function calcularIMC() {
 
  const peso   = parseFloat(campoPeso.value);
  const altura = parseFloat(campoAltura.value);
 
  if (!validarEntradas(peso, altura)) {
    return; 
  }
 
  const alturaEmMetros = altura / 100;
 
  const imc = peso / (alturaEmMetros * alturaEmMetros);
 
  const classificacao = obterClassificacao(imc);
 
  exibirResultado(imc, classificacao);
}
 
 
function validarEntradas(peso, altura) {
 
  // isNaN() = "Is Not a Number?" → verifica se é número
  if (isNaN(peso) || isNaN(altura)) {
    alert('⚠️ Por favor, preencha o peso e a altura!');
    return false;
  }
 
  if (peso <= 0 || peso > 500) {
    alert('⚠️ Digite um peso válido (entre 1 e 500 kg).');
    return false;
  }
 
  if (altura < 50 || altura > 300) {
    alert('⚠️ Digite uma altura válida (entre 50 e 300 cm).');
    return false;
  }
 
  return true; 
}
 
 
function obterClassificacao(imc) {
 
  if (imc < 18.5) {
    return {
      texto:    'Abaixo do peso',
      cor:      '#dbeafe',   
      corTexto: '#1d4ed8',  
      posicao:  calcularPosicao(imc, 10, 18.5, 0, 25)
    };
  }
 
  if (imc < 25) {
    return {
      texto:    '✅ Peso normal',
      cor:      '#d1fae5',   
      corTexto: '#065f46',   
      posicao:  calcularPosicao(imc, 18.5, 25, 25, 50)
    };
  }
 
  if (imc < 30) {
    return {
      texto:    'Sobrepeso',
      cor:      '#fef3c7',   // Amarelo claro
      corTexto: '#92400e',   // Marrom
      posicao:  calcularPosicao(imc, 25, 30, 50, 75)
    };
  }
 
  return {
    texto:    'Obesidade',
    cor:      '#fee2e2',     // Vermelho claro
    corTexto: '#991b1b',     // Vermelho escuro
    posicao:  calcularPosicao(imc, 30, 40, 75, 100)
  };
}
 
 
function calcularPosicao(imc, imcMin, imcMax, inicio, fim) {
  // Limita o IMC ao intervalo para não sair da barra
  const imcLimitado = Math.min(Math.max(imc, imcMin), imcMax);
 
  // Calcula a proporção dentro do segmento
  const proporcao = (imcLimitado - imcMin) / (imcMax - imcMin);
 
  // Retorna a posição em porcentagem
  return inicio + proporcao * (fim - inicio);
}
 
 
function exibirResultado(imc, classificacao) {
 
  valorIMC.textContent = imc.toFixed(1);
 
  badgeClass.textContent         = classificacao.texto;
  badgeClass.style.background    = classificacao.cor;
  badgeClass.style.color         = classificacao.corTexto;
 
  const posicaoFinal = Math.min(Math.max(classificacao.posicao, 2), 98);
  marcador.style.left = posicaoFinal + '%';
 
  secaoResultado.style.display = 'flex';
 
  secaoResultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
 
 
function limpar() {
 
  campoPeso.value   = '';
  campoAltura.value = '';
 
  secaoResultado.style.display = 'none';
 
  valorIMC.textContent = '--';
 
  campoPeso.focus();
}
 
 
document.addEventListener('keydown', function (evento) {
  // evento.key contém qual tecla foi pressionada
  if (evento.key === 'Enter') {
    calcularIMC();
  }
});
 