const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal_close");

const openModal = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
};

modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

setTimeout(openModal, 10000);

function showModalByScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  const scrollHeight = document.documentElement.scrollHeight;

  const scrolled = scrollTop + clientHeight;

  console.log(
    `Scrolled: ${scrolled.toFixed(0)}, Total Height: ${scrollHeight}`
  );

  if (scrolled >= scrollHeight - 1) {
    console.log("END OF PAGE REACHED - Opening Modal!");
    openModal();
    window.removeEventListener("scroll", showModalByScroll);
  }
}

window.addEventListener("scroll", showModalByScroll);
