//Define constants
let mistakes = 0
const maxMistakes = 7
const numberCategories = 3
const wordsByCategories = 8
const numberCatCountrys = 0
const numberCatTravels = 1
const numberCatCities = 2
const separation = '_'
let word
let wordSeleced
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
  'countrys', 'travel', 'cities'
];

//Create 3 arrays, each array have 15 words from 1 category

const countries = [
  ['CHINA', 'Largest country in East Asia','image/countries/china.png'],
  ['GERMANY', 'European country known for its precision engineering', 'image/countries/germany.png'],
  ['JAPAN', 'Island country in East Asia', 'image/countries/japan.png'],
  ['BRAZIL', 'Largest country in South America', 'image/countries/brazil.png'],
  ['CANADA', 'Second largest country in the world', 'image/countries/canada.png'],
  ['AUSTRALIA', 'Country comprising the mainland of the Australian continent', 'image/countries/australia.png'],
  ['ITALY', 'European country known for its art, architecture, and culture', 'image/countries/italy.png'],
  ['SPAIN', 'European country known for its rich cultural heritage', 'image/countries/spain.png'],
  ['KENYA', 'Country in East Africa known for its wildlife and scenic landscapes', 'image/countries/kenya.png']
]


const travels = [
  ['Airplane', 'A mode of transportation that allows for fast travel over long distances through the air.', 'image/transportation/airplane'],
  ['Boat', 'A watercraft designed to float, move, and carry passengers or cargo over water.', 'image/transportation/boat'],
  ['Train', 'A form of transportation that runs on tracks and is powered by electricity, diesel, or steam.', 'image/transportation/train'],
  ['Navigation', 'The process of planning and controlling the movement of a vehicle or vessel from one place to another.', 'image/transportation/navigation'],
  ['Reservations', 'The act of booking or reserving seats, accommodations, or services in advance.', 'image/transportation/reservations'],
  ['Luggage', 'The bags, suitcases, and belongings that a traveler carries with them during a trip.', 'image/transportation/luggage'],
  ['Layovers', 'A period of time spent at an intermediate point during a journey when changing vehicles or waiting for a connecting flight.', 'image/transportation/layovers'],
  ['Transfers', 'The process of moving from one mode of transportation to another, typically during a journey involving multiple legs.', 'image/transportation/transfers']
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

updateFirstMistakes();



  let randomCategory = Math.floor(Math.random() * numberCategories);
  console.log(randomCategory)
  
  let randomword = Math.floor(Math.random() * wordsByCategories);
  console.log(randomword)
  
  //select categorie and word
  const showCategory = document.querySelector("#categoryName")
  
  if (randomCategory === numberCatCountrys) {
    wordSeleced = countries[randomword]
    word = wordSeleced[0];
  
    categoryName = "Country"
  
  } else if (randomCategory === numberCatTravels) {
    wordSeleced = travels[randomword]
    word = wordSeleced[0];
  
    categoryName = "Travel"
  
  } else if (randomCategory === numberCatCities) {
    wordSeleced = cities[randomword]
    word = wordSeleced[0];
  
    categoryName = "City"
  
  }
  




//Create wordmkask and checkerWord
let mask = createMask()

//Create alphabet buttons

document.addEventListener('DOMContentLoaded', () => {

  if(localStorage.getItem('userData')) {
    let savedUserData = JSON.parse(localStorage.getItem('userData'));
    
    mistakes = savedUserData.mistakes;
}

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

        let paragraph1 = document.createElement("p");
        let paragraph2 = document.createElement("p");
        let paragraph3 = document.createElement("p");
        let img = document.createElement("img");


        // Añade texto y clases a los elementos
        paragraph1.textContent = "La paraula era" + wordSeleced[0];
        paragraph2.textContent = "Has encertat la paraula";
        paragraph3.textContent = wordSeleced[1];
        img.src = wordSeleced[2]; 
      
        // Adjunta los elementos al div resultSection
        resultSection.appendChild(paragraph1);
        resultSection.appendChild(paragraph2);
        resultSection.appendChild(paragraph3);
        resultSection.appendChild(img);

        localStorage.clear();
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
function updateFirstMistakes() {
  let mistakesImage = document.getElementById("mistakesImage");
  
  if (mistakesImage.children.length === 0) {
    let imageToAppend = new Image();
    imageToAppend.src = 'image/'+ mistakes +'.png';
    mistakesImage.appendChild(imageToAppend);
  } else {
    mistakesImage.children[0].src = 'image/'+ mistakes +'.png';
  }
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
  let imageToRemove = mistakesImage.querySelector("img");
  let imageToAppend = new Image();
  imageToAppend.src = 'image/'+ mistakes +'.png';
  mistakesImage.removeChild(imageToRemove)
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


window.addEventListener('beforeunload', function (e) {

  var userData = {
    mistakes: mistakes

  };


  localStorage.setItem('userData', JSON.stringify(userData));
});