import { searchForm, galleryList, loadMoreBtn } from "./refs";
import ApiService from "./apiService";
import imageCardTpl from "../templates/image-card.hbs";
import onLightboxOpen from "./light-box";
import onScroll from "./scroll";

const fetchService = new ApiService();

function clearContainer() {
  galleryList.innerHTML = "";
  loadMoreBtn.classList.add("is-hidden");
}

function createMarkup(images) {
  const imageCard = imageCardTpl(images);
  galleryList.insertAdjacentHTML("beforeend", imageCard);

  if (images.length < 12) {
    loadMoreBtn.classList.add("is-hidden");
  } else {
    loadMoreBtn.classList.remove("is-hidden");
  }
}

async function fetch() {
  try {
    const data = await fetchService.fetchImg();
    createMarkup(data);
  } catch (error) {
    console.log(error);
  }
}

function onLoadMore() {
  fetch().then;
  onScroll();
}

function onSearch(e) {
  e.preventDefault();
  fetchService.query = e.target.elements.query.value;
  clearContainer();
  if (!fetchService.query) {
    // clearContainer();
    return;
  }

  fetch();
}

searchForm.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);
galleryList.addEventListener("click", onLightboxOpen);
