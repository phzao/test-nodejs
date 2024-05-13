# NodeJs Test 

O que foi utilizado no projeto NestJS, MongoDB e Jest.

## Instalação

Clone o projeto
```
$ git clone https://github.com/phzao/test-nodejs
```

Instale os pacotes
```
$ cd test-nodejs
$ npm i
```

Rodar
```
$ npm run start:dev 
```
Abra o postman ou alguma ferramenta de sua escolha na url

```
http://localhost:3000
```

## Tests

Para rodar os testes
```
$ npm run test 
```
Obs.: Os testes estão configurados p/ criar um db temporario, utiliza-lo e descartar o db.
Apenas o teste de inclusão e2e esta pronto e funcionando
## Documentacao

Caso esteja executando localmente, acesse:
```
http://localhost:3000/api#/
```

## Status do projeto

- Incompleto
O que falta:
  - Revisar todos os endpoints incluindo no postman e no swagger
  - Aplicar o repository patterns p/ consulta, removendo o acesso direto no nos services
  - Criar testes e2e para o restante de endpoints
