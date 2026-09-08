const { carregar } = require('./banco');
const { titulo } = require('./utils');

const MEDIA_APROVACAO = 6;

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

function agruparPorCurso(alunos) {
  return alunos.reduce((mapa, aluno) => {
    mapa[aluno.curso] = (mapa[aluno.curso] || 0) + 1;
    return mapa;
  }, {});
}

function gerarRelatorio() {
  titulo('Relatorio geral');

  const alunos = carregar();
  if (alunos.length === 0) {
    console.log('Nao ha dados suficientes para gerar o relatorio.');
    return;
  }

  const { total, media, aprovados, reprovados, taxaAprovacao } = calcularEstatisticas(alunos);

  console.log(`Alunos cadastrados : ${total}`);
  console.log(`Media geral        : ${media.toFixed(2)}`);
  console.log(`Aprovados          : ${aprovados}`);
  console.log(`Reprovados         : ${reprovados}`);
  console.log(`Taxa de aprovacao  : ${taxaAprovacao.toFixed(1)}%`);

  console.log('\nAlunos por curso:');
  Object.entries(agruparPorCurso(alunos))
    .sort((a, b) => b[1] - a[1])
    .forEach(([curso, quantidade]) => {
      console.log(`  - ${curso}: ${quantidade}`);
    });
}

module.exports = { gerarRelatorio, calcularEstatisticas, agruparPorCurso };
