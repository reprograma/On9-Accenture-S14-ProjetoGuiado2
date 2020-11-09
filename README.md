# Projeto BackEnd - Reprograma

## Sobre

Essa API tem o intuito de fazer matchs de livros. O usuário pode tanto requisitar algum livro e possivelmente encontrar alguém que terá também disponibilizado esse livro para doar, quanto também pode adicionar livros que ficarão disponíveis para doação.

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

### Documentação da API

[Board no Miro](https://miro.com/app/board/o9J_kgwSA7M=/)

### Endpoints

- `/api/users/singup`
- `/api/users/all`
- `/api/books/available/new`

### Como usar o git?

Basicão:

- Baixar repositório do GitHub

```bash
git pull origin (url)
```

- Criar uma branch de trabalho

```bash
git checkout -b (minha-nova-branch)
```

- Fazer alterações no código
- Adicionar arquivos que desejo que façam parte do meu commit

```bash
  git add (arquivos)
```

- Commitar minhas alterações

```bash
git commit -m "(mensagem descrevendo o que acabei de mudar)"
```

- Atualizando o repositório no Github (remote)

```bash
git push origin (nome da sua branch)
```

#### Buscar atualizações de outro repositório

- Isso é util para quando, por exemplo, você precisa buscar atualizações do repositório que veio o seu fork

- Quais são os repositório remotos que você tem acesso

```bash
git remote
```

Provavelmente o retorno do comando anterior é `origin` que é a referência ao seu repositório remoto no GitHub.

- Para possibilitar a busca de atualizações do repositório no qual você inicou seu fork, adicione uma referência ao repositório remoto correspondente

```bash
git remote add reprograma git@github.com:reprograma/On9-Accenture-S14-ProjetoGuiado2.git
```

- Para buscar as atualizações da branch `main`

```bash
git pull reprograma main --allow-unrelated-histories
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
- Como fazer um bom commit (Em progresso)
- GitKraken
  - Bom software para acompanhar suas branches
- [Roadmap da desenvolvedora Backend/JavaScript](https://github.com/aliyr/Nodejs-Developer-Roadmap/blob/master/ReadMe-PT.md)

### Boilerplate

[Hackaton Starter](https://github.com/sahat/hackathon-starter/blob/master/app.js)

### Testes

- [Melhores práticas de testes](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Desafios

- **/api/users/all**
- Fazer um endpoint que busca todos os usuários cadastrados

  #### Dicas

  - Para fazer uma busca que retonar todos os items dentro daquela coleção, utilize o método `.find()` do Mongoose, sem filtros no parâmetro. Para saber mais, aqui está a [documentação do Mongoose](https://mongoosejs.com/docs/api.html#model_Model.find)

- **/api/books/available/new**

  Fazer a função bookController.addBookAvailable funcionar, ou seja, quando fizermos uma requisição POST para o endpoint `/api/books/available/new` com os dados necessários, teremos um retorno bem sucedido, com as entradas esperadas do Model BookAvailable.

  #### Dicas

  - Usem e abusem do `console.log()` para descrobrir onde está seu erro!!
  - Todas as importações que serão usadas para executar seu código foram feitas?
    - Os caminhos estão corretos? (Fiquem atentas a erros de grafia)
  - Atenção aos **parâmetros** que a sua função precisa receber
    - Você passou os valores esperados dentro dos parâmetros corretos ao chamar a função?
  - `.then()` lida com as `Promises` que se resolvem, são um caminho de sucesso na `Promise` chamada
  - `.catch()` lida com as `Promises` que são "rejeitadas" e apresentam erros
  - Quando uma função é uma `Promise` e queremos guardar o valor dela dentro de uma variável, precisamos colocar o `await` à frente da declaração da função.

    - _Como funciona_?
      Quando rodarmos o script, o JS espera aquela `Promise` ser resolvida antes de guardar o seu valor dentro da variável. Caso não colocarmos o `await` a frente, a variável terá o valor da `Promise`, e não o valor da `Promise` resolvida.
      Ex:

      ```javascript
      // Correto
      const searchForAvailableBooks = async () => {
        const booksAvailable = await BookAvailable.find({ isAvailable: true });
        return booksAvailable;
      };

      // Retorna uma valor
      console.log(await searchForAvailableBook()); // Essa função precisa ser chamada com um `await` pois também é uma Promise

      // Errado
      const searchForAvailableBooks = () => {
        const booksAvailable = BookAvailable.find({ isAvailable: true });
        return booksAvailable;
      };

      // Retorna uma Promise
      console.log(searchForAvailableBooks());
      ```

  - **Toda função assíncrona se torna automaticamente uma Promise**
  - Todas as vezes que uma função é uma Promise, precisamos lidar com a possibilidade dessa Promise retornar com algum erro. Portanto, é **muito importante** sempre que usarmos `try{}` ou `.then()`, também incluirmos o seu método `catch` correspondente
    - Mas _por quê_?
      Caso alguma dessas `Promises` retornar com erro e não declararmos o método `catch` com uma lógica que irá lidar com esse erro, nossa aplicação terá um _erro solto_, ou seja, que não será facilmente identificável e nosso trabalho de procurar por possíveis bugs na aplicação se torna muito mais difícil.
  - Utilizar boas práticas de "Código de Status" (Status Code)

    - Nunca retornar 200 quando você sabe que aquele valor é um erro, ou está dentro de um `.catch`.
      Ex:

      ```javascript
      Book.find()
        .then((books) => res.status(200).json(books))
        .catch((e) => res.status(200).json(e));
      ```

    - Erros do usuário: 400
      - Ex: quando um usuário nos manda dados incorretos no `req.body`
    - Erros do servidor: 500
      - Ex: algum problema ao fazer uma buca no banco de dados
    - Sucesso: 200

- **/books/available/user/:id**

  - Buscar todos os livros que o usuário do parâmetro está doando

  #### Dicas

  - Os valores que ficam nos parâmetros estão disponíveis dentro de `req.params`
    - Ex: Fizemos uma requisição para nossa API usando a seguinte URL: `http://localhost:5000/api/books/123123`. O valor do parâmetro `id` que declaramos na rota estará dentro de `req.params.id` e terá o valor `123123`.
