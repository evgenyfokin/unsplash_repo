"use strict";

const ACCESS_KEY = "dwDRLinoqFQL3y83kS760JwljARjPmzjkLK5XiGMbII";

function fetchRandomPicture() {
  const url = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&count=1`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fetching went wrong :(");
      }
      return res.json();
    })
    .then((data) => {
      const fetchedData = data[0]
      setCurrentData(fetchedData)
      setLikes(fetchedData.likes)
      removeLikeIconAttr()
      displayData(fetchedData);
    })
    .catch((e) => {
      console.error("Something went wrong: ", e);
    });
}

function displayData(data) {
  const img = document.querySelector(".unsplash__img");
  const likes = document.querySelector(".likes__count");
  const likesIcon = document.querySelector(".likes__icon");
  const author = document.querySelector(".details__author");
  const desc = document.querySelector(".details__description");
  const created = document.querySelector(".details__date");
  const detailsToggleButton = document.querySelector(".show-details");
  const details = document.querySelector('.details')
  img.src = data.urls.regular;

  likes.textContent = getLikes();
  likesIcon.setAttribute('fill', getLikeIconAttr())
  likesIcon.addEventListener("click", () => {
    likePicture(likesIcon, likes);
  });

  author.textContent = `${data.user.first_name} ${data.user.last_name}: `;
  desc.textContent = data.alt_description;
  created.textContent = new Date(data.created_at);

  detailsToggleButton.addEventListener("click", () => {
    showDetails(detailsToggleButton, details);
  });
}

function likePicture(icon, counter) {
  const currentFillAttr = icon.getAttribute("fill");

  if (currentFillAttr !== "red") {
    icon.setAttribute("fill", "red");
    setLikeIconAttr()
    counter.textContent = addLike()
  } else {
    icon.setAttribute("fill", "black");
    removeLikeIconAttr()
    counter.textContent = removeLike()
  }
}

function showDetails(button, details) {
  if (button.textContent === "Show Details") {
    button.textContent = "Hide Details";
    button.style.backgroundColor = "green";
    button.style.color = "white";
    details.style.display = 'block'
  } else {
    button.textContent = "Show Details"
    button.style.backgroundColor = "#e8c96d";
    button.style.color = "black";
    details.style.display = 'none'
  }
}
