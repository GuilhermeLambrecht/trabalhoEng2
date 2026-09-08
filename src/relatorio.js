const { carregar } = require('./banco');
const { titulo } = require('./utils');

const MEDIA_APROVACAO = 6;
const FAIXAS = [
  { rotulo: '0.0 a 1.9', minimo: 0, maximo: 2 },
  { rotulo: '2.0 a 3.9', minimo: 2, maximo: 4 },
  { rotulo: '4.0 a 5.9', minimo: 4, maximo: 6 },
  { rotulo: '6.0 a 7.9', minimo: 6, maximo: 8 },
  { rotulo: '8.0 a 10.0', minimo: 8, maximo: 10.01 },
];

function calcularEstatisticas(alunos) {
  const total = alunos.length;
  const somaNotas = alunos.reduce((soma, aluno) => soma + aluno.nota, 0);
  const aprovados = alunos.filter((aluno) => aluno.nota >= MEDIA_APROVACAO);

  return {
    total,
    media: total === 0 ? 0 : somaNotas / total,
    aprovados: aprovados.length,
    reprovados: total - aprovados.length,
    taxaAprovacao: total === 0 ? 0 : (aprovados.length / total) * 100,
  };
}

function ordenarPorNota(alunos) {
  return [...alunos].sort((a, b) => b.nota - a.nota || a.nome.localeCompare(b.nome));
}

function resumoPorCurso(alunos) {
  const mapa = new Map();

  alunos.forEach((aluno) => {
    const atual = mapa.get(aluno.curso) || { quantidade: 0, soma: 0 };
    atual.quantidade += 1;
    atual.soma += aluno.nota;
    mapa.set(aluno.curso, atual);
  });

  return [...mapa.entries()]
    .map(([curso, { quantidade, soma }]) => ({
      curso,
      quantidade,
      media: soma / quantidade,
    }))
    .sort((a, b) => b.quantidade - a.quantidade || a.curso.localeCompare(b.curso));
}

function distribuicaoDeNotas(alunos) {
  return FAIXAS.map(({ rotulo, minimo, maximo }) => ({
    rotulo,
    quantidade: alunos.filter((aluno) => aluno.nota >= minimo && aluno.nota < maximo).length,
  }));
}

function gerarRelatorio() {
  titulo('Relatorio geral');

  const alunos = carregar();
  if (alunos.length === 0) {
    console.log('Nao ha dados suficientes para gerar o relatorio.');
    return;
  }

  const { total, media, aprovados, reprovados, taxaAprovacao } = calcularEstatisticas(alunos);
  const ordenados = ordenarPorNota(alunos);
  const melhor = ordenados[0];
  const pior = ordenados[ordenados.length - 1];

  console.log(`Alunos cadastrados : ${total}`);
  console.log(`Media geral        : ${media.toFixed(2)}`);
  console.log(`Aprovados          : ${aprovados}`);
  console.log(`Reprovados         : ${reprovados}`);
  console.log(`Taxa de aprovacao  : ${taxaAprovacao.toFixed(1)}%`);
  console.log(`Maior nota         : ${melhor.nome} (${melhor.nota.toFixed(1)})`);
  console.log(`Menor nota         : ${pior.nome} (${pior.nota.toFixed(1)})`);

  console.log('\nDesempenho por curso:');
  resumoPorCurso(alunos).forEach(({ curso, quantidade, media: mediaCurso }) => {
    console.log(`  - ${curso}: ${quantidade} aluno(s) | media ${mediaCurso.toFixed(2)}`);
  });

  console.log('\nDistribuicao das notas:');
  distribuicaoDeNotas(alunos).forEach(({ rotulo, quantidade }) => {
    const barra = '#'.repeat(quantidade);
    console.log(`  ${rotulo.padEnd(11)} | ${barra.padEnd(10)} ${quantidade}`);
  });
}

function mostrarRanking(limite = 5) {
  titulo(`Ranking - top ${limite}`);

  const alunos = carregar();
  if (alunos.length === 0) {
    console.log('Nenhum aluno cadastrado ate o momento.');
    return;
  }

  ordenarPorNota(alunos)
    .slice(0, limite)
    .forEach((aluno, indice) => {
      const situacao = aluno.nota >= MEDIA_APROVACAO ? 'Aprovado' : 'Reprovado';
      console.log(
        `${String(indice + 1).padStart(2)}o | ${aluno.nome} | ${aluno.curso} | nota ${aluno.nota.toFixed(1)} | ${situacao}`
      );
    });
}

module.exports = {
  gerarRelatorio,
  mostrarRanking,
  calcularEstatisticas,
  resumoPorCurso,
  distribuicaoDeNotas,
  ordenarPorNota,
};
