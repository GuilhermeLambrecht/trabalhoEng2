const { cadastrarAluno, listarAlunos, buscarAluno, removerAluno } = require('./src/cadastro');
const { gerarRelatorio } = require('./src/relatorio');
const { perguntar, pausar, fecharEntrada, titulo } = require('./src/utils');

function mostrarMenu() {
  titulo('Sistema de Cadastro de Alunos');
  console.log('1 - Cadastrar aluno');
  console.log('2 - Listar alunos');
  console.log('3 - Buscar aluno por nome');
  console.log('4 - Remover aluno');
  console.log('5 - Gerar relatorio');
  console.log('0 - Sair');
}

async function main() {
  let executando = true;

  while (executando) {
    mostrarMenu();
    const opcao = await perguntar('\nEscolha uma opcao: ');

    switch (opcao) {
      case '1':
        await cadastrarAluno();
        await pausar();
        break;
      case '2':
        listarAlunos();
        await pausar();
        break;
      case '3':
        await buscarAluno();
        await pausar();
        break;
      case '4':
        await removerAluno();
        await pausar();
        break;
      case '5':
        gerarRelatorio();
        await pausar();
        break;
      case '0':
        executando = false;
        console.log('\nEncerrando o sistema. Ate mais!');
        break;
      default:
        console.log('\n[ERRO] Opcao invalida. Tente novamente.');
        await pausar();
    }
  }

  fecharEntrada();
}

main().catch((erro) => {
  console.error('\n[FALHA] Erro inesperado:', erro.message);
  fecharEntrada();
  process.exit(1);
});
