/** usado para definir que o javascript seja escrito da melhor e mais correta forma possível */
'use strict'

/** usado para criar app no servidor*/
const app = require('../src/app');

/** usado para debugar, onde nodestr:server é o seu nome */
const debug = require('debug')('lourenco:server');

/** usado para criar o servidor http*/
const http = require('http');

/** criando as variáveis constantes*/
const port = normalizePort(process.env.PORT || '3000'); /** utiliza a função normalizePort, criada abaixo, para normalizar a porta */
app.set('port', port);

/** criando o servidor http */
const server = http.createServer(app);

/** atribui a tarefa para que o servidor fique 'ouvindo' a porta */
server.listen(port);

/** atribui uma tratativa de erro para o servidor utilizando a função onError criada abaixo */
server.on('error', onError);

/** atribui a tarefa de debugar o servidor utilizando a função onListening criada abaixo */
server.on('listening', onListening);

/** exibindo msg no console */ 
console.log('API rodando na porta ' + port);

 /** função criada para normalizar a porta do servidor */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

 /** função criada para tratar erros do servidor */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/** função criada para pegas as informações do servidor 
 *  e 'estartar' o debug */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
