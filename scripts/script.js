// ? All document get elements id codes

const categoryContianer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");

let yourCart = [];
let totalPrice = 0;

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
const loadAllPlants = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => {
      showPlantsByCategories(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Showing plant cards but catrgories
const showPlantsByCategories = (plantCard) => {
  cardContainer.innerHTML += ``;
  cardContainer.innerHTML = "";
  plantCard.forEach((plant) => {
    cardContainer.innerHTML += `
         <div id="${plant.id}"
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
                <div  class="font-bold">৳ <span>${plant.price}</span></div>
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

// ! Adding plants to cart
cardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add To Cart") {
    handleCart(e);
  }
});
// Handle Add to cart function
const handleCart = (e) => {
  const name = e.target.parentNode.children[1].children[0].innerText;
  const price =
    e.target.parentNode.children[1].children[2].children[1].children[0]
      .innerText;

  yourCart.push({
    name: name,
    price: price,
  });

  showPlantsOnCart(yourCart);
};

// Showing into to cart section
const showPlantsOnCart = (yourCart) => {
  const totalDiv = document.getElementById("cart-total");
  cartContainer.innerHTML = "";

  yourCart.forEach((plantCart) => {
    cartContainer.innerHTML += `
          <div id="new-item"
            class="bg-green-100 rounded-xl px-4 py-2 flex justify-between items-center my-3"
          >
            <div >
              <h4>${plantCart.name}</h4>
              <p>${plantCart.price}</p>
            </div>
            <div>
            <button onClick= deletCart('${plantCart.id}')>❌</button>
            </div>
          </div>

    `;
    totalPrice += parseFloat(plantCart.price);
    totalDiv.innerText = `Total: ৳ ${totalPrice}`;
  });
  cartContainer.append(totalDiv);
};

const deletCart = (plantID) => {
  const newItem = document.getElementById("new-item");
  newItem.innerHTML = "";
  newItem.forEach((plantID) => {
    plantID.innerHTML = "";
  });
};

// const showPlantsOnCart = (yourCart) => {
//   const totalDiv = document.getElementById("cart-total");

//   cartContainer.innerHTML = "";
//   cartContainer.appendChild(totalDiv);

//   // Add cart items BEFORE the total div
//   yourCart.forEach((plantCart) => {
//     const cartItem = document.createElement("div");
//     cartItem.className =
//       "bg-green-100 rounded-xl px-4 py-2 flex justify-between items-center my-3";
//     cartItem.innerHTML = `
//       <div>
//         <h4>${plantCart.name}</h4>
//         <p>${plantCart.price}</p>
//       </div>
//       <div>❌</div>
//     `;

//     // put before the total div
//     cartContainer.insertBefore(cartItem, totalDiv);
//   });

//   // Update total price
//   const total = yourCart.reduce((sum, item) => sum + parseFloat(item.price), 0);
//   totalDiv.innerText = `Total: ৳ ${total}`;
// };

loadCategory();
loadAllPlants();
