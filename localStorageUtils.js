"use strict";

function setLastUpdateDate() {
  localStorage.setItem("lastUpdate", new Date().toISOString());
}

function isNewDate() {
  const storedDate = localStorage.getItem("lastUpdate");
  const lastUpdateDate = storedDate ? new Date(storedDate) : null;

  if (!lastUpdateDate) {
    setLastUpdateDate();
    return true;
  }
  const currentDate = new Date();

  if (
    currentDate.getDate() !== lastUpdateDate.getDate() ||
    currentDate.getMonth() !== lastUpdateDate.getMonth() ||
    currentDate.getFullYear() !== lastUpdateDate.getFullYear() ||
    currentDate.getMinutes() !== lastUpdateDate.getMinutes()
  ) {
    setLastUpdateDate();
    return true;
  }

  return false;
}

function setCurrentData(data) {
  const { alt_description, created_at, user, urls } = data;
  const selectedData = {
    alt_description,
    created_at,
    user,
    urls,
  };
  const jsonData = JSON.stringify(selectedData);
  localStorage.setItem("storedData", jsonData);
}

function getCurrentPicture() {
  const storedData = localStorage.getItem("storedData");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    displayData(parsedData);
  } else {
    console.error("Data does not exist");
  }
}

function setLikes(likesAmount) {
  localStorage.setItem("likes", likesAmount);
}

function getLikes() {
  return localStorage.getItem("likes");
}

function addLike() {
  setLikes(+getLikes() + 1);
  return getLikes()
}

function removeLike() {
  setLikes(+getLikes() - 1);
  return getLikes()
}

function getLikeIconAttr() {
  const likeIconAttr = localStorage.getItem('likeIconAttr')
  return likeIconAttr? 'red': "black"
}

function setLikeIconAttr() {
  localStorage.setItem('likeIconAttr', 'red')
}

function removeLikeIconAttr() {
  localStorage.removeItem('likeIconAttr')
}