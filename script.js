//! All plants
const allPlants = () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      displayCards(json.plants);
    });
};
// !Adding plants to cart
const addToCart = (plant) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  const newCartItem = document.createElement("div");
  newCartItem.innerHTML = `
    <div class="flex justify-between">
      <h2>Hello</h2>
    </div>
  `;

  cartContainer.append(newCartItem);
};

// * Display All Products
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
                <div class="badge bg-[#DCFCE7] text-[#15803D]">${card.category}</div>
                <div class="font-bold">৳ ${card.price}</div>
              </div>
            </div>
            <button onClick = "addToCart(plant)"
              class="cart-btn bg-[#15803D] py-2 rounded-3xl text-white hover:bg-[#FACC15] hover:text-[#15803D] transition-all ease-linear duration-200"
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
    });
};
// * Display All Categories
const displayCatergories = (categories) => {
  // getting the category container by id
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  //   making a list in html

  for (let list of categories) {
    const navigation = document.createElement("li");
    navigation.innerHTML = `
          <li onClick= "loadCategory(${list.id})" class="hover:bg-[#15803D] hover:text-white 
          rounded-md p-2 transition-all ease-linear duration-200">${list.category_name}</li>
    `;
    categoriesContainer.append(navigation);
  }
};

// ! Plants by category
const loadCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayPlants(json.plants));
};

// * Display plants by categories
const displayPlants = (plants) => {
  const plantsContainer = document.getElementById("card-container");
  plantsContainer.innerHTML = "";
  for (let plant of plants) {
    const card = document.createElement("div");
    card.innerHTML = `
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
          </div>`;
    plantsContainer.append(card);
  }
};

allPlants();
allCategories();

//make a functon for making card then call that fuctionm with onclick
