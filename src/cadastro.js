const { carregar, salvar, proximoId } = require('./banco');
const { perguntar, titulo, formatarData, paraNumero } = require('./utils');

async function cadastrarAluno() {
  titulo('Cadastrar aluno');

  const nome = await perguntar('Nome do aluno: ');
  if (nome.length < 3) {
    console.log('\n[ERRO] O nome precisa ter pelo menos 3 caracteres.');
    return;
  }

  const curso = await perguntar('Curso: ');
  if (!curso) {
    console.log('\n[ERRO] O curso e obrigatorio.');
    return;
  }

  const nota = paraNumero(await perguntar('Nota final (0 a 10): '));
  if (nota === null || nota < 0 || nota > 10) {
    console.log('\n[ERRO] Nota invalida. Informe um numero entre 0 e 10.');
    return;
  }

  const alunos = carregar();
  const aluno = {
    id: proximoId(alunos),
    nome,
    curso,
    nota,
    criadoEm: new Date().toISOString(),
  };

  alunos.push(aluno);
  salvar(alunos);

  console.log(`\n[OK] Aluno "${aluno.nome}" cadastrado com o ID ${aluno.id}.`);
}

function listarAlunos() {
  titulo('Alunos cadastrados');

  const alunos = carregar();
  if (alunos.length === 0) {
    console.log('Nenhum aluno cadastrado ate o momento.');
    return;
  }

  alunos.forEach((aluno) => {
    const situacao = aluno.nota >= 6 ? 'Aprovado' : 'Reprovado';
    console.log(
      `#${aluno.id} | ${aluno.nome} | ${aluno.curso} | nota ${aluno.nota.toFixed(1)} | ${situacao} | ${formatarData(aluno.criadoEm)}`
    );
  });

  console.log(`\nTotal: ${alunos.length} aluno(s).`);
}

async function buscarAluno() {
  titulo('Buscar aluno');

  const termo = (await perguntar('Digite parte do nome: ')).toLowerCase();
  if (!termo) {
    console.log('\n[ERRO] Informe um termo para a busca.');
    return;
  }

  const encontrados = carregar().filter((aluno) =>
    aluno.nome.toLowerCase().includes(termo)
  );

  if (encontrados.length === 0) {
    console.log('\nNenhum aluno encontrado com esse termo.');
    return;
  }

  encontrados.forEach((aluno) => {
    console.log(`#${aluno.id} | ${aluno.nome} | ${aluno.curso} | nota ${aluno.nota.toFixed(1)}`);
  });
}

async function removerAluno() {
  titulo('Remover aluno');

  const id = paraNumero(await perguntar('ID do aluno que deseja remover: '));
  if (id === null) {
    console.log('\n[ERRO] ID invalido.');
    return;
  }

  const alunos = carregar();
  const indice = alunos.findIndex((aluno) => aluno.id === id);

  if (indice === -1) {
    console.log(`\n[ERRO] Nenhum aluno encontrado com o ID ${id}.`);
    return;
  }

  const [removido] = alunos.splice(indice, 1);
  salvar(alunos);

  console.log(`\n[OK] Aluno "${removido.nome}" removido com sucesso.`);
}

module.exports = { cadastrarAluno, listarAlunos, buscarAluno, removerAluno };
