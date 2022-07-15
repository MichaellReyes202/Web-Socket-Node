
const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        /**
         * se crea un  servidor HTTP con base en express
         */
        this.server = require('http').createServer(this.app);

        /**
         * El io es toda la informacion de los sockets que se estan conectando
         */
        this.io     = require('socket.io')(this.server);

        this.paths = {}
        /**
         * Middleware
         */
        this.middlewares();
        
        /**
         * Rutas de mi aplicacion
         */
        this.routes();

        /**
         * Configuracion de los eventos por socket
         */
        this.sockets();
    }
    routes() {
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto : ', this.port)
        })
    }
    middlewares() {

        // CORS
        this.app.use(cors());

        // Directorio publico
        this.app.use(express.static('public'));

    }
    sockets() {
        this.io.on('connection',socketController);
    }
}
module.exports = Server;

// El Intercambio de Recursos de Origen Cruzado (CORS (en-US))