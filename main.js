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
let final

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
                  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
                  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//create variable for username (save this on variable)

function saveUsername() {

  let userName = document.getElementById("userName").value;
  console.log(userName)

  const userSection = document.querySelector("#userSection");
  userSection.style.display = "none";

  const gameSection = document.querySelector("#gameSection");
  gameSection.style.display = "block";

}

const categories = [
  'countrys', 'demonyms', 'cities'
];

//Create 3 arrays, each array have 15 words from 1 category

const countries = [
  ['CHINA', 'Largest country in East Asia','image/countries/china'],
  ['GERMANY', 'European country known for its precision engineering', 'image/countries/germany'],
  ['JAPAN', 'Island country in East Asia', 'image/countries/japan'],
  ['BRAZIL', 'Largest country in South America', 'image/countries/brazil'],
  ['CANADA', 'Second largest country in the world', 'image/countries/canada'],
  ['AUSTRALIA', 'Country comprising the mainland of the Australian continent', 'image/countries/australia'],
  ['ITALY', 'European country known for its art, architecture, and culture', 'image/countries/italy'],
  ['SPAIN', 'European country known for its rich cultural heritage', 'image/countries/spain'],
  ['KENYA', 'Country in East Africa known for its wildlife and scenic landscapes', 'image/countries/kenya']
]


const demonyms = [
  ['CHINESE', 'Of or related to China', 'image/demonyms/chinese'],
  ['GERMAN', 'Of or related to Germany', 'image/demonyms/german'],
  ['JAPANESE', 'Of or related to Japan', 'image/demonyms/japanese'],
  ['CANADIAN', 'Of or related to Canada', 'image/demonyms/canadian'],
  ['AUSTRALIAN', 'Of or related to Australia', 'image/demonyms/australian'],
  ['ITALIAN', 'Of or related to Italy', 'image/demonyms/italian'],
  ['SPANISH', 'Of or related to Spain', 'image/demonyms/spanish'],
  ['KENYAN', 'Of or related to Kenya', 'image/demonyms/kenyan']
];

const cities = [
  ['BEIJING', 'Capital of China', 'image/cities/beijing'],
  ['BERLIN', 'Capital of Germany', 'image/cities/berlin'],
  ['TOKYO', 'Capital of Japan', 'image/cities/tokyo'],
  ['TORONTO', 'City in Canada', 'image/cities/toronto'],
  ['MELBOURNE', 'City in Australia', 'image/cities/melbourne'],
  ['FLORENCE', 'City in Italy', 'image/cities/florence'],
  ['BARCELONA', 'City in Spain', 'image/cities/barcelona'],
  ['MOMBASA', 'City in Kenya', 'image/cities/mombasa']
]



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

  refreshWord();
  showCategoryHTML();
  createLettersButtons();
  clickOnLetters();
  checkFinal();
  
}); 

function clickOnLetters() {
  const letterButtons = document.querySelectorAll(".letterAvailable");
  letterButtons.forEach((letterButton) => {
    letterButton.addEventListener("click", function(event) {
      const clickedLetter = event.target.getAttribute('letter');
      
      if (!letterIsOnUsedLetters(clickedLetter)) {
        console.log("Has hecho clic en la letra:", clickedLetter);
        checkletter(clickedLetter);
        refreshWord();
        updateMistakes();
        updateLettersUsedonHTML(clickedLetter);
        deleteLetterButton(clickedLetter);
        final = checkFinal();
      }
      if (final === true) {
     
        const gameSection = document.querySelector("#gameSection");
        gameSection.style.display = "none";
      
        const resultSection = document.querySelector("#resultSection");
        resultSection.style.display = "block"; 
      
      }
    });
  });
}




function checkFinal() {
  let final = false
  if (checkAllLetters() || mistakes === 7) {
    if(checkAllLetters()){
      console.log("Has ganado");
      final = true
    }else if(mistakes === 7) {
      console.log("Has perdido");
      final = true
    }
  }
  return final;
}

function updateLettersUsedonHTML(clickedLetter) {
  const lettersUsed = document.querySelector("#lettersUsed");
  const letterSpan = document.createElement("span");
  letterSpan.textContent = clickedLetter;
  lettersUsed.appendChild(letterSpan);

}


function checkAllLetters() {
  let completeWord = true

  for (let index = 0; index < mask.length; index++) {
    if (mask[index] === "_") {
      completeWord = false
    }
    
  }
  
  return completeWord
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

