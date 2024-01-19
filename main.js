//Define constants
let mistakes = 0
const maxMistakes = 7
const numberCategories = 3
const wordsByCategories = 8
const numberCatCountrys = 0
const numberCatDemonyms = 1
const numberCatCities = 2
let word
let categoryName
let lettersUsed = []

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
  'China',
  'Germany',
  'Japan',
  'Brazil',
  'Canada',
  'Australia',
  'Italy',
  'Spain',
  'Kenya'
];


const demonyms = [
  'Chinese',       // China
  'German',        // Germany
  'Japanese',      // Japan
  'Canadian',      // Canada
  'Australian',    // Australia
  'Italian',       // Italy
  'Spanish',       // Spain
  'Kenyan'          // Kenya
];

const cities = [
  'Beijing',            // China
  'Berlin',             // Germany
  'Tokyo',              // Japan
  'Toronto',            // Canada
  'Melbourne',          // Australia
  'Florence',           // Italy
  'Barcelona',          // Spain
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

function clickOnLetters() {
  const letterButtons = document.querySelectorAll(".letterAvailable");
  letterButtons.forEach((letterButton) => {
    letterButton.addEventListener("click", function(event) {
      const clickedLetter = event.target.getAttribute('letter');
      
      if (!letterIsOnUsedLetters(clickedLetter)) {
        console.log("Has hecho clic en la letra:", clickedLetter);
        checkletter(clickedLetter)
        refreshWord()
        console.log(mistakes)
        updateMistakes()
        deleteLetterButton(clickedLetter)
      }else{

      }
    });
  });
}

function letterIsOnUsedLetters(clickedLetter) {
  let used = false
  for (let index = 0; index < lettersUsed.length; index++) {
  if (clickedLetter === lettersUsed[index]) {
    used = true
  }
    
  }
  return used
}

function deleteLetterButton(clickedLetter) {
  let classLetter = document.querySelector('[letter="'+ clickedLetter +'"]')
  classLetter.classList.remove("letterAvailable")
  classLetter.classList.add("letterDisable")
    
  }



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






function updateMistakes() {
  let mistakesImage = document.getElementById("mistakesImage");
  let imageToAppend = new Image();
  imageToAppend.src = 'image/'+ mistakes +'.png';
  mistakesImage.removeChild(mistakesImage.firstChild)
  mistakesImage.appendChild(imageToAppend)

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
  lettersUsed.push(clickedLetter)
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

