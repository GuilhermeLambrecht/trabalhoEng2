const readline = require('node:readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function perguntar(texto) {
  const resposta = await rl.question(texto);
  return resposta.trim();
}

async function pausar() {
  await perguntar('\nPressione ENTER para continuar...');
}

function fecharEntrada() {
  rl.close();
}

function titulo(texto) {
  const linha = '='.repeat(46);
  console.log(`\n${linha}\n  ${texto.toUpperCase()}\n${linha}`);
}

function formatarData(iso) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

function paraNumero(texto) {
  const valor = Number(String(texto).replace(',', '.'));
  return Number.isFinite(valor) ? valor : null;
}

module.exports = {
  perguntar,
  pausar,
  fecharEntrada,
  titulo,
  formatarData,
  paraNumero,
};
