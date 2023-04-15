axios.defaults.headers.common["Authorization"] = "w3uNiZPkMcxfQY64IPy8ry40";

let informedName = '';

function errorSend () {
  alert('Erro ao enviar sua mensagem');
  window.location.reload();
}

function sendMessage() {
  const inputMessage = document.querySelector('.footer input');
  const message = inputMessage.value;

  const objMessage = {
    from: informedName,
    to: "todos",
    text: message,
    type: "message"
  }
  
  const post = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', objMessage)

  post.then(getMessages);
  post.catch(errorSend);

  inputMessage.value = '';
}

function enterMessage () {
  const messageInput = document.querySelector('.footer input');
  const loginInput = document.querySelector('.login input');

  const sendButton = document.querySelector('.footer ion-icon');
  const sendLogin = document.querySelector('.login-box div')

  messageInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendButton.click();
  }
  })

  loginInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendLogin.click();
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

function changeScreen() {
  const container = document.querySelector('.container');
  const loginScreen = document.querySelector('.login');

  container.classList.remove('hidden');
  loginScreen.classList.add('hidden');
}

function enter() {
  changeScreen();

  setInterval(getMessages, 3000);
  setInterval(sendStatus,5000);

  getMessages();
}

function usedName() {
  alert("Este nome já está em uso");

  window.location.reload();
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

function sendStatus() {
  const status = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {name:informedName});
  status.then();
}

function login() {
  const inputLogin = document.querySelector('.login input');
  informedName = inputLogin.value;

  const button = document.querySelector('.login-box div');

  if(informedName.length>0){
    sendName();
  }
}

enterMessage();