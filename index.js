

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
  await fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((jsonMy) => {
      wikiImg.src = jsonMy.message;
      let urlString = jsonMy.message;
      let arr = urlString.split("/");
      let searchName = arr[4].split("-");
      let newContent = document.createTextNode(searchName[0].toUpperCase());
      fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
          searchName[0] +
          "?redirect=false"
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
  wikiImg.style.width = "100%";
  wikiImg.style.padding = "5px";
  let newDiv = document.createElement("div");
  newDiv.className = "wiki-item";
  newDiv.style.margin = "10px";
  newDiv.style.boxShadow = "-5px -5px 5px gray";
  let wikiHeader = document.createElement("h1");
  wikiHeader.className = "wiki-header";
  let wikiContent = document.createElement("div");
  wikiContent.className = "wiki-content";
  let wikiText = document.createElement("p");
  wikiText.style.marginLeft = "10px";
  wikiText.className = "wiki-text";
  let imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  wikiContent.style.padding = "10px ";
  fetchDog(wikiImg, wikiHeader, wikiText);
  wikiContent.appendChild(wikiText);
  imgContainer.appendChild(wikiImg);
  wikiContent.appendChild(imgContainer);
  newDiv.appendChild(wikiHeader);
  newDiv.appendChild(wikiContent);
  return newDiv;
}