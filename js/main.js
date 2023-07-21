const cats = [
  {
    name: "Cat",
    bio: "Cat is an English word.",
    thumb: "images/kitten1-thumb.jpeg",
    img: "images/kitten1.jpeg"
  },
  {
    name: "Mao",
    bio: "Mao is is a Cantonese word.",
    thumb: "images/kitten2-thumb.jpeg",
    img: "images/kitten2.jpeg"
  },
  {
    name: "Gato",
    bio: "Gato is a Spanish word",
    thumb: "images/kitten3-thumb.jpeg",
    img: "images/kitten3.jpeg"
  },
  {
    name: "Billi",
    bio: "Billi is a Hindi word.",
    thumb: "images/kitten4-thumb.jpeg",
    img: "images/kitten4.jpeg"
  },
  {
    name: "Chat",
    bio: "Chat is a French word.",
    thumb: "images/kitten5-thumb.jpeg",
    img: "images/kitten5.jpeg"
  },
  {
    name: "Kot",
    bio: "Kot is a Polish word.",
    thumb: "images/kitten6-thumb.jpeg",
    img: "images/kitten6.jpeg"
  },
  {
    name: "Kit",
    bio: "Kit is a Ukrainian word.",
    thumb: "images/kitten7-thumb.jpeg",
    img: "images/kitten7.jpeg"
  },
  {
    name: "Kot",
    bio: "Kot is a Russian word.",
    thumb: "images/kitten8-thumb.jpeg",
    img: "images/kitten8.jpeg"
  }
]

const catsRow = document.getElementById("catsRow")
const cards = []

for (const cat of cats) {
  console.log(cat.name)
  // create card HTML template copying from HTML page and replacing content with values from the object
  const card = `
    <div class="col">
      <div class="card">
        <img data-bs-toggle="modal" data-bs-target="#exampleModal" src="${cat.thumb}" class="card-img-top" alt="placeholder kitten" data-fullimg="${cat.img}">
        <div class="card-body">
          <h5 class="card-title">${cat.name}</h5>
          <p class="card-text">${cat.bio}</p>
          <a href="#" class="btn btn-light like" data-catname="${cat.name}" data-catbio="${cat.bio}" data-catthumb="${cat.thumb}" 
          data-catfullimg="${cat.img}">Like</a>
        </div>
      </div>
    </div><!-- col ends -->`

  // push each card template to the cards array
  cards.push(card)
}
catsRow.insertAdjacentHTML("afterbegin", cards.join(""))

// selecting all the images
const cardImages = document.querySelectorAll(".card-img-top")

// adding event listeners multiple elements
for (const cardImage of cardImages) {
  cardImage.addEventListener("click", openModal)
}

// If using event delegation 
// cardImageParent.addEventListener("click", openModal)

// function openModal (e) {
//   if(e.target.classList.contains("image")){

//   }

function openModal () {
  console.log(this.getAttribute("src"))
  const fullImage = this.dataset.fullimg
  const modalBody = document.querySelector(".modal-body")

  modalBody.innerHTML = `<img src="${fullImage}" alt="placeholder">`
}

/*-------------------------
  Week 11 - Local Storage
---------------------------*/
let savedCats = localStorage.getItem("mycats")
// console.log(savedCats)

// if savedCats is not set then set it to empty array
if (!savedCats) {
  savedCats = []
} else {
  // else savedCats is set then parse it to convert to the array
  savedCats = JSON.parse(savedCats)
}

const likeButtons = document.querySelectorAll(".like")

// check if we have any like buttons in the array
if (likeButtons.length > 0) {
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", likeCat)
    for (savedCat of savedCats) {
      if (likeButton.dataset.catname == savedCat.name) {
        likeButton.classList.remove("btn-light")
        likeButton.classList.add("btn-danger")
        likeButton.textContent = "Liked"
      }
    }
  }

}

function likeCat (e) {
  e.preventDefault()
  const catName = this.dataset.catname
  const catBio = this.dataset.catbio
  const catThumb = this.dataset.catthumb
  const catImg = this.dataset.catfullimg
  const catInfo = { name: catName, bio: catBio, thumb: catThumb, img: catImg }
  // console.log(catInfo)

  // run the function findCat with the catName parameter and save the return in catExist variable
  const catExist = findCat(catName)
  if (catExist !== null) {
    alert("This cat is already liked")
  } else {
    // else the catExist is null
    // we push the catInfo to the savedCats array
    savedCats.push(catInfo)
    // we now save the savedCats to localStorage
    localStorage.setItem("mycats", JSON.stringify(savedCats))
    this.classList.remove("btn-light")
    this.classList.add("btn-danger")
    this.textContent = "Liked"
  }
}

function findCat (catName) {
  for (savedCat of savedCats) {
    if (savedCat.name == catName) {
      return savedCats.indexOf(savedCat)
    }
  }
  return null
}