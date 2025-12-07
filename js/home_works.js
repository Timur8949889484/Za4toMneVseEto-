const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[\w.%+-]+@gmail\.com$/;

gmailButton.addEventListener("click", () => {
  const email = gmailInput.value;

  if (regExp.test(email)) {
    gmailResult.innerHTML = "OK";
    gmailResult.style.color = "green";
  } else {
    gmailResult.innerHTML = "Not valid";
    gmailResult.style.color = "red";
  }
});

const childBlock = document.querySelector(".child_block");
const parentBlock = document.querySelector(".parent_block");

const parentWidth = parentBlock.offsetWidth;
const parentHeight = parentBlock.offsetHeight;
const childWidth = childBlock.offsetWidth;

let positionX = 0;
let positionY = 0;
let step = 1;
let phase = 0;

const maxOffsetW = parentWidth - childWidth;
const maxOffsetH = parentHeight - childBlock.offsetHeight;

const animateMovement = () => {
  switch (phase) {
    case 0:
      if (positionX < maxOffsetW) {
        positionX += step;
      } else {
        phase = 1;
      }
      break;
    case 1:
      if (positionY < maxOffsetH) {
        positionY += step;
      } else {
        phase = 2;
      }
      break;
    case 2:
      if (positionX > 0) {
        positionX -= step;
      } else {
        phase = 3;
      }
      break;
    case 3:
      if (positionY > 0) {
        positionY -= step;
      } else {
        phase = 0;
      }
      break;
  }

  childBlock.style.left = `${positionX}px`;
  childBlock.style.top = `${positionY}px`;

  requestAnimationFrame(animateMovement);
};

requestAnimationFrame(animateMovement);

const secondsDisplay = document.querySelector("#seconds");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

let intervalId;
let seconds = 0;

const startTimer = () => {
  if (!intervalId) {
    intervalId = setInterval(() => {
      seconds++;
      secondsDisplay.innerHTML = seconds;
    }, 1000);
  }
  startButton.disabled = true;
};

const stopTimer = () => {
  clearInterval(intervalId);
  intervalId = null;
  startButton.disabled = false;
};

const resetTimer = () => {
  stopTimer();
  seconds = 0;
  secondsDisplay.innerHTML = seconds;
};

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

const characterList = document.querySelector(".characters-list");

const renderCharacterCard = (character) => {
  const { name, age, photo } = character;

  const card = document.createElement("div");
  card.classList.add("character-card");

  card.innerHTML = `
        <div class="character-photo">
            <img src="${photo}" alt="${name}">
        </div>
        <h4>${name}</h4>
        <p>Возраст: ${age}</p>
    `;

  characterList.append(card);
};

const fetchCharacters = () => {
  fetch("../data/characters.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((character) => {
        renderCharacterCard(character);
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке персонажей:", error);

      characterList.innerHTML = `<p style="color: red;">Не удалось загрузить данные о персонажах: ${error.message}</p>`;
    });
};

fetchCharacters();

const loadBioData = () => {
  const request = new XMLHttpRequest();

  request.open("GET", "../data/bio.json");

  request.setRequestHeader("Content-type", "application/json");

  request.send();

  request.onload = () => {
    if (request.status === 200) {
      try {
        const bioData = JSON.parse(request.response);
        console.log("--- Данные из bio.json (XMLHttpRequest) ---");
        console.log(bioData);
        console.log("-------------------------------------------");

        console.log(`Имя: ${bioData.firstName}, Возраст: ${bioData.age}`);
      } catch (error) {
        console.error("Ошибка парсинга JSON для bio.json:", error);
      }
    } else {
      console.error(`Ошибка при загрузке bio.json. Статус: ${request.status}`);
    }
  };

  request.onerror = () => {
    console.error("Сетевая ошибка при загрузке bio.json");
  };
};

loadBioData();
