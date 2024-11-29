const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config(); //com isso eu ja consigo pegar a variavel port do .env
const wss = new WebSocketServer({port: process.env.PORT || 8080});

wss.on("connection", (ws) => {
    ws.on("error", console.error)
    // aqui agente envia a mensagem pra pessoal que acabou de se conectar...
    // ws.send("mensagem enviada pelo servidor")
    
    //quando alguem enviar uma mensagem sempre vai ser disparada essa função
    ws.on("message", (data) => { 
        // wss.clients = pega todos os clientes e envia as mensagem para todos os clientes que estao conectados
        wss.clients.forEach((client) => client.send(data.toString())) 

    })

    console.log("cliente conectado")
})

