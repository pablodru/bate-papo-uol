axios.defaults.headers.common["Authorization"] = "w3uNiZPkMcxfQY64IPy8ry40";

let informedName = '';
let control = false;

function errorSend () {
  alert('Erro ao enviar sua mensagem');
  window.location.reload();
}

function sendMessage() {
  const input = document.querySelector('.footer input');
  const message = input.value;

  const objMessage = {
    from: informedName,
    to: "todos",
    text: message,
    type: "message"
  }
  
  const post = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', objMessage)

  post.then(getMessages);
  post.catch(errorSend);

  input.value = '';
}

function enterMessage () {
  const messageInput = document.querySelector('.footer input');

  const sendButton = document.querySelector('.footer ion-icon');

  messageInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendButton.click();
  }
  })
}

function renderMessages(response) {
  const dataMessage = response.data;
  const main = document.querySelector('.main')

  main.innerHTML = '';

  for (let i = 0; i < dataMessage.length; i++) {

    let forMessage = dataMessage[i]

    main.innerHTML +=`<div class="message" data-test="message">
        <p class="time">${forMessage.time}</p>
        <p class="name">${forMessage.from}</p>
        <p class="type-message">${forMessage.type}</p>
        <p class="name">${forMessage.to}:</p>
        <p class="text"> ${forMessage.text}</p>
    </div>`;
  }
}

function errorMessages() {
  alert("Erro ao carregar mensagens. Tente novamente mais tarde.");
}

function getMessages() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/vm/uol/messages"
  );
  promise.then(renderMessages);
  promise.catch(errorMessages);
}

function enter() {
  control=true;
  getMessages();
}

function usedName() {
  alert("Este nome já está em uso");

  getName();
}

function sendName() {
  const objName = {
    name: informedName,
  };

  const name = axios.post(
    "https://mock-api.driven.com.br/api/vm/uol/participants",
    objName
  );
  name.then(enter);
  name.catch(usedName);
}

function getName(){
  informedName = prompt("Qual seu nome?");

  sendName();
}

function sendStatus() {
  const status = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {name:informedName});
  status.then();
}

getName();

enterMessage();

if (control){
  setInterval(getMessages, 3000);
  setInterval(sendStatus,5000);
}