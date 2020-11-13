# Projeto BackEnd - Reprograma

## Sobre

Essa API tem o intuito de fazer matchs de livros. O usuário pode tanto requisitar algum livro e possivelmente encontraremos alguém que terá também disponibilizado esse livro para emprestar. Além disso, o usuário também pode adicionar livros que ficarão disponíveis para empréstimo.

- Descrição do nosso projeto
- Clonando nosso boilerplate
- Subindo nosso servidor
- Criando nosso banco de dados
- Conectando ao banco de dados
- commit
- Mandar código para o GitHub
- Criando nossa usuária
  - Conhecendo e utilizando o yup para validação
    - Referência: https://github.com/jquense/yup
  - Hasheando e salteando senhas
    - hasheando: criptografando uma string ao passá-la por um algoritmo de hash (esse algoritmo retorna a mesma coisa, para o mesmo input)
    - salteando: adiciona caracteres aleatórios antes de criptografar
- commit
- Mandar o código para o GitHub
- Adicionando um exemplar disponível
  - Testando fazer um requisição
- commit
- Mandar o código para o Github
- Fazendo um pedido de livro
  - Testando fazendo uma requisição
- commit
- Mandar código para o Github

### Endpoints

- `/api/users/singup`
- `/api/users/all`
- `/api/books/available/new`
- `/api/books/requests/new`

### Como usar o git?

Basicão:

- Baixar repositório do GitHub

```bash
git pull origin (url)
```

- Criar uma branch de trabalho

```
git checkout -b (minha-nova-branch)
```

- Fazer alterações no código
- Adicionar arquivos que desejo que façam parte do meu commit

```
  git add (arquivos)
```

- Commitar minhas alterações

```
git commit -m "(mensagem descrevendo o que acabei de mudar)"
```

- Atualizando o repositório no Github (remote)

```
git push origin (nome da sua branch)
```

### Como formatar meu código automaticamente?

[StandardJS](https://standardjs.com/)

- Configurações do VSCode
  - Para formatar o código enquanto você programa, instalar a extensão "StandardJS - Javascript Standard Style"

```json
{
  "editor.formatOnSave": true,
  "javascript.validate.enable": false,
  "standard.autoFixOnSave": true
}
```

- Hooks
  - Antes de commitar, um script de lint rodará sob o código que você está commitando para validá-lo

Dicas:

- Conventional Commits (Commits Convencionais)
  - [Guia para commits mais legíveis](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/)
- Atomic commits
  - [Faça commits com frequência](https://www.freshconsulting.com/atomic-commits/)
- Como fazer um bom commit
- GitKraken
  - Bom software para acompanhar suas branches
- [Roadmap da desenvolvedora Backend/JavaScript](https://github.com/aliyr/Nodejs-Developer-Roadmap/blob/master/ReadMe-PT.md)

### Boilerplate

[Hackaton Starter](https://github.com/sahat/hackathon-starter/blob/master/app.js)

### Testes

- [Melhores práticas de testes](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Desafio

- **/books/available/user/:id**

  - Buscar todos os livros que esse usuário está doando

- **/books/requested/user/:id**
  - Buscar todos os livros que esse usuário requisitou

**/books/request/delete/:id**

- Excluir um pedido de doação de livro

### Super Desafio

- **/books/available/new**
  - Quando um novo livro disponível é inserido, procuramos se existe algum BookRequest pede por esse livro, e criamos o match.
