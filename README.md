# README

## Dependências
* Node.JS
* NPM
* MongoDB

## Processo para inicializar
* instalar dependências do projeto
  * npm i
* Inicializar o MongoDB
  * mongod --fork --logpath /var/log/mongodb.log
* Inicializar o Backend
  * npm run prod

## Executar tarefa de integração com o Reddit
node path_to_project/src/tasks/reddit.js

## Agendar integração com o Reddit para executar todos os dias
crontab -e
adicionar a seguinte linha
0 0 * * * node path_to_project/src/tasks/reddit.js