// ? All document get elements id codes

const categoryContianer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");

// !Category section funtionality

// Loading all the category items with a function
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};
// showing all the category on html
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContianer.innerHTML += `
        <li id="${cat.id}" class="hover:bg-[#15803D] hover:text-white 
          rounded-md p-2 transition-all ease-linear duration-200">${cat.category_name}</li>
        `;
  });

  //   selectiong list with focusing
  categoryContianer.addEventListener("click", (e) => {
    const allList = document.querySelectorAll("li");
    allList.forEach((li) => {
      li.classList.remove("bg-[#15803D]", "text-white");
    });
    if (e.target.localName === "li") {
      //   console.log(e.target.id);
      e.target.classList.add("bg-[#15803D]", "text-white");
      loadPlantsByCategory(e.target.id);
    }
  });
};

// !Showing Plants Functionality
// Showing plants card using category section
const loadPlantsByCategory = (plantId) => {
  console.log(plantId);
  fetch(`https://openapi.programming-hero.com/api/category/${plantId}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.plants);
      showPlantsByCategories(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Showing plant cards but catrgories
const showPlantsByCategories = (plantCard) => {
  cardContainer.innerHTML = "";
  plantCard.forEach((plant) => {
    cardContainer.innerHTML += `
    <div
            class="card bg-base-100 w-full h-[450px] shadow-sm p-4 rounded-md"
          >
            <figure>
              <img 
                src="${plant.image}"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${plant.name}</h2>
              <p>${plant.description}</p>
              <div class="card-actions justify-between">
                <div class="badge bg-[#DCFCE7] text-[#15803D]">${plant.category}</div>
                <div class="font-bold">৳ ${plant.price}</div>
              </div>
            </div>
            <button 
              class="bg-[#15803D] py-2 rounded-3xl text-white hover:bg-[#FACC15] hover:text-[#15803D] transition-all ease-linear duration-200"
            >
              Add To Cart
            </button>
          </div>
    `;
  });
};

loadCategory();
