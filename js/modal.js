const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal_close");
let modalShownByScroll = false;

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
  if (modalShownByScroll) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    openModal();
    modalShownByScroll = true;
    window.removeEventListener("scroll", showModalByScroll);
  }
}

window.addEventListener("scroll", showModalByScroll);
