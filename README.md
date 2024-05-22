# NodeJs Test 

O que foi utilizado no projeto NestJS, Docker, MongoDB e Jest.

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

Inicie o docker
```
$ docker-compose up 
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

Caso esteja executando localmente, acesse a documentacao:
```
http://localhost:3000/api#/
```

## Status do projeto

- Completo

O que falta:

  - Envio de e-email
  - Testes e2e de todos os endpoints
