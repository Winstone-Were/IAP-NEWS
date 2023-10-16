//API Used: http://newsapi.org/s/india-news-api
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=a46c0dd48c734ed78f12b4a431fdcd6d";

// "in" stands for India
const country = "in";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

//100 requests per day
let requestURL;

//Create cards from data
const generateUI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
    <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
    container.appendChild(card);
  }
};

//News API Call
const getNews = async () => {
  container.innerHTML = "";
  
  fetch(url).then(resp => resp.json()).then(data=> generateUI(data.articles));

  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();

  //generateUI(data.articles);
};

const fetchNews = ()=>{
  fetch(url).then(response=>{
    console.log(response);
    let data = response.json();
    console.log(data);
    generateUI(data.articles);
  }).catch(err=> console.log);
}

//Category Selection
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

//Options Buttons
const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

const init = () => {
  optionsContainer.innerHTML = "";
  //fetchNews();
  getNews();
  //createOptions();
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};    

let header_element = document.querySelector(".heading-container");

window.addEventListener("scroll", (ev)=>{
    console.log(window.scrollY);

    if(window.scrollY >= 300){
      header_element.className = "heading-container-dark";
    }else{
      header_element.className = "heading-container";

    }
});