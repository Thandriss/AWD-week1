

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content = "width=device-width, initial-scale=1";
  document.getElementsByTagName("head")[0].appendChild(meta);
  const cont = document.getElementById("container");
  for (let i = 0; i < 5; i++) {
    let newCard = generateDivWithImg();
    cont.appendChild(newCard);
  }
}

async function fetchDog(wikiImg, wikiHeader, wikiText) {
  await fetch("https://dog.ceo/api/breed/borzoi/images/random")
    .then((response) => response.json())
    .then((jsonMy) => {
      wikiImg.src = jsonMy.message;
      let newContent = document.createTextNode("Borzoi");
      fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/borzoi"
      )
        .then((resp) => resp.json())
        .then((jsonText) => {
          let discription = document.createTextNode(jsonText.extract);
          wikiText.appendChild(discription);
        });
      wikiHeader.appendChild(newContent);
    });
}

function generateDivWithImg() {
  let wikiImg = document.createElement("img");
  wikiImg.className = "wiki-img";
  let newDiv = document.createElement("div");
  newDiv.className = "wiki-item";
  let wikiHeader = document.createElement("h1");
  wikiHeader.className = "wiki-header";
  let wikiContent = document.createElement("div");
  wikiContent.className = "wiki-content";
  let wikiText = document.createElement("p");
  wikiText.className = "wiki-text";
  let imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  fetchDog(wikiImg, wikiHeader, wikiText);
  wikiContent.appendChild(wikiText);
  imgContainer.appendChild(wikiImg);
  wikiContent.appendChild(imgContainer);
  newDiv.appendChild(wikiHeader);
  newDiv.appendChild(wikiContent);
  return newDiv;
}