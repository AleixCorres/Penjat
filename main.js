//Define constants
let mistakes = 0
const maxMistakes = 7
const numberCategories = 3
const wordsByCategories = 8
const numberCatCountrys = 0
const numberCatDemonyms = 1
const numberCatCities = 2
const separation = '_'
let word
let categoryName
let lettersUsed = []

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
                        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
                        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
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
  'CHINA',
  'GERMANY',
  'JAPAN',
  'BRAZIL',
  'CANADA',
  'AUSTRALIA',
  'ITALY',
  'SPAIN',
  'KENYA'
];


const demonyms = [
  'CHINESE',
  'GERMAN',
  'JAPANESE',
  'CANADIAN',
  'AUSTRALIAN',
  'ITALIAN',
  'SPANISH',
  'KENYAN'
];

const cities = [
  'BEIJING',
  'BERLIN',
  'TOKYO',
  'TORONTO',
  'MELBOURNE',
  'FLORENCE',
  'BARCELONA',
  'MOMBASA'
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
        updateMistakes()
        deleteLetterButton(clickedLetter)
        checkFinal()
      }
    });
  });
}

function checkFinal() {
  if (condition) {
    
  }

}

function checkAllLetters() {
  let completeWord = true

  for (let index = 0; index < mask.length; index++) {
    if (mask[index] === "_") {
      completeWord = false
    }
    
  }
  
  
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
let maskFunction = new Array(numberletters)
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
  let rightLetter = false
  for (let index = 0; index < word.length; index++) {
    if (clickedLetter === word[index]) {

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
      let span = document.createElement("span");
      span.innerHTML = element;
      divElement.append(span)
  });
}

