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
const childWidth = childBlock.offsetWidth;

let positionX = 0;
let direction = 1;
const maxOffset = parentWidth - childWidth;
const minOffset = 0;

const animateMovement = () => {
  if (positionX >= maxOffset) {
    direction = -1;
  } else if (positionX <= minOffset) {
    direction = 1;
  }

  positionX += direction;
  childBlock.style.left = `${positionX}px`;

  requestAnimationFrame(animateMovement);
};

requestAnimationFrame(animateMovement);
