# Sistema de Cadastro de Alunos

Projeto da disciplina de **Engenharia de Software II**, desenvolvido para praticar o fluxo
de trabalho colaborativo com Git e GitHub (feature branches + Pull Requests).

Aplicacao de console em Node.js, sem dependencias externas.

## Como executar

Requisitos: Node.js 18 ou superior.

```bash
node index.js
```

ou

```bash
npm start
```

## Funcionalidades

- Cadastro de alunos (nome, curso e nota)
- Listagem com situacao (aprovado/reprovado)
- Busca por nome
- Remocao por ID
- Relatorio com media geral, taxa de aprovacao e alunos por curso

## Estrutura do projeto

```
eng2/
├── index.js            # menu principal da aplicacao
├── package.json
├── .gitignore
└── src/
    ├── banco.js        # leitura e gravacao dos dados em JSON
    ├── cadastro.js     # operacoes de cadastro (criar, listar, buscar, remover)
    ├── relatorio.js    # estatisticas e relatorios
    └── utils.js        # funcoes auxiliares de entrada e formatacao
```

Os dados sao gravados em `data/alunos.json`, que nao e versionado (ver `.gitignore`).

## Fluxo de trabalho (Git)

- `main` — versao estavel do projeto
- `dev` — branch de integracao das funcionalidades
- `feature/nome-da-funcionalidade` — branch individual de cada membro, criada a partir da `dev`

Toda alteracao entra na `dev` por meio de um **Pull Request** revisado pela equipe.

```bash
git checkout dev
git pull
git checkout -b feature/minha-funcionalidade
# ... alteracoes ...
git add .
git commit -m "feat: descricao da alteracao"
git push -u origin feature/minha-funcionalidade
```

## Equipe e divisao de tarefas

| Integrante | GitHub | Branch | Tarefa |
| --- | --- | --- | --- |
| Guilherme Lambrecht | @GuilhermeLambrecht | `feature/relatorio` | Relatorio e estatisticas |
| _preencher_ | _@usuario_ | `feature/ordenacao` | Ordenar a listagem por nota ou nome |
| _preencher_ | _@usuario_ | `feature/edicao` | Editar dados de um aluno ja cadastrado |
| _preencher_ | _@usuario_ | `feature/validacoes` | Validacoes de entrada e mensagens de erro |
| _preencher_ | _@usuario_ | `feature/exportacao` | Exportar a lista de alunos para CSV |
