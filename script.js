//! All plants
const allPlants = () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      displayCards(json.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

// * Display Products
// getting the card container by id
const displayCards = (cards) => {
  const cardsContainer = document.getElementById("card-container");
  cardsContainer.innerHTML = "";

  //   making the card container in the section
  for (let card of cards) {
    console.log(card);
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
              <div
            class="card bg-base-100 w-full h-[450px] shadow-sm p-4 rounded-md"
          >
            <figure>
              <img 
                src="${card.image}"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${card.name}</h2>
              <p>${card.description}</p>
              <div class="card-actions justify-between">
                <div class="badge bg-[#DCFCE7]">${card.category}</div>
                <div class="font-bold">৳ ${card.price}</div>
              </div>
            </div>
            <button onClick = alert("Hello");
              class="bg-[#15803D] py-2 rounded-3xl text-white hover:bg-[#FACC15] hover:text-[#15803D] transition-all ease-linear duration-200"
            >
              Add To Cart
            </button>
          </div>`;

    cardsContainer.append(cardDiv);
  }
};

//! All Categories

const allCategories = () => {
  const url = `https://openapi.programming-hero.com/api/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      displayCatergories(json.categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

// * Display Categories
const displayCatergories = (lists) => {
  // getting the category container by id
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  //   making a list in html
  for (let list of lists) {
    const ul = document.createElement("ul");
    ul.innerHTML = `
          <li class="hover:bg-[#15803D] hover:text-white rounded-md p-2 transition-all ease-linear duration-200">${list.category_name}</li>
    `;
    categoriesContainer.append(ul);
  }
};

allPlants();
allCategories();
