# code-challenge

### Versiones utilizadas

Api: NodeJs 14.18.0

Client: NodeJs 16.0.0

### Explicación

1. **Introducción General**: aplicacion client con servidor api, instalar todas las dependencias con `npm install` en client y api respectivamente y levantar con `npm run start`.
2. **Instrucciones para Iniciar**: para iniciar los dos servicios estar en rama principal (main) y indicar `npm run start`.
3. **Requisitos**: se necesita instalar dependencias en cada uno de los servicios (api y client) y correr `npm run start` en main.



### UP API and CLIENT with docker

1. se necesita cambiar el script de "start" en el package.json de client a = "start": "export PORT=4000 && react-scripts start",
esto con el fin de poder levantar el cliente en docker ya que no corre con set PORT=4000
2. si ya se corrio docker-compose up, al realizar el cambio de script correr docker-compose up --build
