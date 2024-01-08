//Define constants
let mistakes = 0
const numberCategories = 3
const wordsByCategories = 15
const numberCatCountrys = 0
const numberCatDemonyms = 1
const numberCatCities = 2
let word
let categoryName

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//create variable for username (save this on variable)

function saveUsername() {

  let userName = document.getElementById("userName").value;
  console.log(userName)

}

const categories = [
  'countrys', 'demonyms', 'cities'
];

//Create 3 arrays, each array have 15 words from 1 category

const countrys = [
  'Iceland',
  'China',
  'Switzerland',
  'India',
  'Ireland',
  'France',
  'Germany',
  'Japan',
  'Brazil',
  'Canada',
  'Australia',
  'Italy',
  'Spain',
  'Mexico',
  'Kenya'
];


const demonyms = [
  'Icelander',      // Iceland
  'Chinese',       // China
  'Swiss',         // Switzerland
  'Indian',        // India
  'Irish',        // Ireland
  'French',        // France
  'German',        // Germany
  'Japanese',      // Japan
  'Brazilian',     // Brazil
  'Canadian',      // Canada
  'Australian',    // Australia
  'Italian',       // Italy
  'Spanish',       // Spain
  'Mexican',       // Mexico
  'Kenyan'          // Kenya
];

const cities = [
  'Reikiavik',          // Iceland
  'Beijing',            // China
  'Zurich',             // Switzerland
  'New Delhi',          // India
  'Dublin',             // Ireland
  'Carcassonne',        // France
  'Berlin',             // Germany
  'Tokyo',              // Japan
  'Brasilia',           // Brazil
  'Toronto',            // Canada
  'Melbourne',          // Australia
  'Florence',           // Italy
  'Barcelona',          // Spain
  'Tijuana',        // Mexico
  'Mombasa'            // Kenya
];

//Create random for categories and later for words

let randomCategory = Math.floor(Math.random() * numberCategories);
console.log(randomCategory)

let randomword = Math.floor(Math.random() * wordsByCategories);
console.log(randomword)

//select categorie and word
const showCategory = document.querySelector("#categoryName")

if (randomCategory === numberCatCountrys) {
  word = countrys[randomword]
  categoryName = "Country"

} else if (randomCategory === numberCatDemonyms) {
  word = demonyms[randomword]
  categoryName = "Demonym"

} else if (randomCategory === numberCatCities) {
  word = cities[randomword]
  categoryName = "City"

}
word = word.toLowerCase();


//Create wordmkask and checkerWord
let mask = createMask()




//Create alphabet buttons

document.addEventListener('DOMContentLoaded', () => {

  refreshWord()
  showCategoryHTML()
  createLettersButtons()
  clickOnLetters()


});


function createMask() {
  
numberletters = word.length
var maskFunction = new Array(numberletters)
for (let i = 0; i < word.length; i++) {
  maskFunction[i] = "_";
  
}

  return maskFunction
}



function showCategoryHTML() {
  const showCategory = document.querySelector("#categoryName")
  showCategory.textContent = categoryName
}


function createLettersButtons() {
  const alphabetBoard = document.querySelector("#alphabetBoard")

  alphabet.forEach((letter, i) =>{
  const letterbutton = document.createElement('div')
  letterbutton.classList.add('letterAvailable')
  letterbutton.setAttribute('letter', letter)
  letterbutton.innerHTML = letter
  alphabetBoard.append(letterbutton)
})
}




function clickOnLetters() {
  const letterButtons = document.querySelectorAll(".letterAvailable");
  letterButtons.forEach((letterButton) => {
    letterButton.addEventListener("click", function(event) {
      const clickedLetter = event.target.getAttribute('letter');
      console.log("Has hecho clic en la letra:", clickedLetter);
      checkletter(clickedLetter)
      refreshWord()
      console.log(mistakes)

    });
  });
}

function checkletter(clickedLetter) {
  const firstLetter = 0
  let rightLetter = false
  for (let index = 0; index < word.length; index++) {
    if (clickedLetter === word[index]) {
      //Uppercase the first letter
      if (index === firstLetter) {
        clickedLetter = clickedLetter.toUpperCase()
      }

      mask[index] = clickedLetter
      rightLetter = true
    }
      
  }
  if (rightLetter === false) {
    mistakes++;
  }
}

function refreshWord() {

  let divElement = document.getElementById("wordMask");
  divElement.innerHTML = '';
  // Recorre el array y crea elementos de lista li para cada elemento
  mask.forEach(function(element) {
      var span = document.createElement("span");
      span.innerHTML = element;
      divElement.append(span)
  });
}

