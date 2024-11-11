const likeHeartArray = document.querySelectorAll(".like-icon");
const likeButtonArray = document.querySelectorAll(".card__like-button");
const iconButtonArray = document.querySelectorAll(".card__icon-button");

// theme script
function changeTheme(theme) {
  document.documentElement.className = "";
  document.documentElement.classList.add(`theme-${theme}`);
  localStorage.setItem("theme", theme);
}

(function initTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    changeTheme(theme);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll(".theme-menu__button");

  function setDisabled(theme) {
    themeButtons.forEach((item) => {
      if (item.getAttribute("data-theme") === theme) {
        item.setAttribute("disabled", true);
      } else {
        item.removeAttribute("disabled");
      }
    });
  }

  if ([...root.classList].includes("theme-light")) {
    setDisabled("light");
  } else if ([...root.classList].includes("theme-dark")) {
    setDisabled("dark");
  } else {
    setDisabled("auto");
  }

  themeButtons.forEach((button) => {
    button.onclick = () => {
      changeTheme(button.getAttribute("data-theme"));
      setDisabled(button.getAttribute("data-theme"));
    };
  });
});

// like script

iconButtonArray.forEach((iconButton, index) => {
  iconButton.onclick = () =>
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
});

likeButtonArray.forEach((button, index) => {
  button.onclick = () => toggleIsLiked(likeHeartArray[index], button);
});

function toggleIsLiked(heart, button) {
  heart.classList.toggle("is-liked");
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  if ([...heart.classList].includes("is-liked")) {
    setTimeout(
      () => (button.querySelector(".button__text").textContent = "Unlike"),
      500,
    );
  } else {
    setTimeout(
      () => (button.querySelector(".button__text").textContent = "Like"),
      500,
    );
  }
}
