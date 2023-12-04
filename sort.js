// Function to fetch video categories
const fetchCategories = async () => {
  try {
      const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
  }
};

// Function to fetch videos by category ID
const fetchVideosByCategory = async (categoryId) => {
  try {
      const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error("Error fetching videos by category:", error);
      return [];
  }
};

// Function to render categories
const renderCategories = (categories) => {
  const categoryList = document.getElementById("categoryList");

  categories.forEach((category) => {
      const listItem = document.createElement("li");
      listItem.style.padding='20px'
      listItem.textContent = category.category;
      listItem.addEventListener("click", () => handleCategoryClick(category.category_id));
      categoryList.appendChild(listItem);
  });
};



// Function to render video cards
const renderVideoCards = (videos) => {
  const videoCards = document.querySelector(".video-cards");
  videoCards.innerHTML = "";

  if (videos.length === 0) {
      videoCards.innerHTML = "<h1 align='center'>No videos found.</h1>";
      return;
  }

  videos.forEach((video) => {
      const card = document.createElement("div");
      card.classList.add("video-card");
      card.innerHTML = `
          <h3>${video.title}</h3>
          <p>Views: ${video.others.views}</p>
      `;
      videoCards.appendChild(card);
  });
};

// Function to handle category click
const handleCategoryClick = async (categoryId) => {
  const videos = await fetchVideosByCategory(categoryId);
  renderVideoCards(videos);
};





// Function to sort video cards by views
const sortVideoCardsByViews = () => {
  const videoCards = Array.from(document.querySelectorAll(".video-card"));

  videoCards.sort((a, b) => {
      const viewsA = parseInt(a.querySelector("p").textContent.split("Views: ")[1]);
      const viewsB = parseInt(b.querySelector("p").textContent.split("Views: ")[1]);
      
      return viewsB - viewsA;
  });

  const videoContainer = document.querySelector(".video-cards");
  videoContainer.innerHTML = "";

  videoCards.forEach((card) => {
    videoContainer.appendChild(card);
    console.log(videoContainer)
  });
};

// Event listener for the "Sort by Views" button


// Initial setup: Fetch and render categories
(async () => {
  const categories = await fetchCategories();
  renderCategories(categories);
})();

fetchCategories('1000');