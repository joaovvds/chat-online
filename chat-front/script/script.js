
const login = document.querySelector(".login");
const loginForm = login.querySelector(".login_form");
const loginInput= login.querySelector(".login_input");

const chat = document.querySelector(".chat");
const chatForm = document.querySelector(".chat_form");
const chatInput= document.querySelector(".chat_input");
const chatMensagem = document.querySelector(".chat_mensagem");



let websocket

const criarMensagemPropria = (content) => {
    const div = document.createElement("div");
    div.classList.add("message_self")
    div.innerHTML = content

    return div
}

const criarMensagemOutros = (content, sender, SenderColor) => {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("message_other")
    div.classList.add("message_self")
    span.classList.add("message_send")
    span.style.color = SenderColor

    div.appendChild(span)

    span.innerHTML = sender
    
    div.innerHTML += content

    return div
}

const cores = [
    "aliceblue",
    "aquamarine",
    "chocolate",
    "darkcyan",
    "darkkhaki",
    "darksalmon",
    "seagreen",
    "steelblue"
]


const coresRandom = () => {
    const randomIndex = Math.floor(Math.random() * cores.length) // Math.round() ou floor
    return cores[randomIndex]
}

const ScrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}
 
const user = { 
    id: "", 
    name: "", 
    color: "" 
}

const processMessage = ({ data }) => {
    //JSON.parse() para converter uma string para objeto
    const { userId, userName, userColor, content } = JSON.parse(data)

    const message = userId == user.id 
    ? criarMensagemPropria(content)
    : criarMensagemOutros(content, userName, userColor)
    

    chatMensagem.appendChild(message)
    ScrollScreen()
}

const handleLogin = (event) => {
    event.preventDefault() //quando envia o form ele n atualiza a pagina

    user.id = crypto.randomUUID() //Date.now()
    user.name = loginInput.value
    user.color = coresRandom()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080")
    websocket.onmessage = processMessage
    // quando websocket estiver aberto 
    // websocket.onopen = () => 
    //     websocket.send(`Usuàrio: ${user.name} entrou no chat`);

}

const sendMessage = (event) => {
    event.preventDefault()

    const mensagem = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }
    
    // json.strigify() converter tudo que tiver dentro em string
    websocket.send(JSON.stringify(mensagem))

    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)


