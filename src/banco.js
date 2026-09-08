const fs = require('node:fs');
const path = require('node:path');

const ARQUIVO = path.join(__dirname, '..', 'data', 'alunos.json');

function carregar() {
  try {
    return JSON.parse(fs.readFileSync(ARQUIVO, 'utf8'));
  } catch {
    return [];
  }
}

function salvar(alunos) {
  fs.mkdirSync(path.dirname(ARQUIVO), { recursive: true });
  fs.writeFileSync(ARQUIVO, JSON.stringify(alunos, null, 2), 'utf8');
}

function proximoId(alunos) {
  return alunos.reduce((maior, aluno) => Math.max(maior, aluno.id), 0) + 1;
}

module.exports = { carregar, salvar, proximoId };
