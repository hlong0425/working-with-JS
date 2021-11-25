// Coding Challenge #3

/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.K 😀
*/

const vocabularies = [
    {
        name: "hello",
        type: "noun",
        description_Eng: "Used when meeting or greeting someone",
        description_VN: "Lời chào",
        img: "https://media.istockphoto.com/photos/beautiful-young-african-ethnicity-woman-picture-id1257155823?b=1&k=20&m=1257155823&s=170667a&w=0&h=oLFrCzP4oqVGBzOMgciGXg07uv9Ig1KBPAAc93tFaDI="
    },
    {
        name: "mouse",
        type: "noun",
        description_Eng: "A small mammal with short fur, a pointed face, and a long tail",
        description_VN: "một loài động vật có vú nhỏ với bộ lông ngắn, mặt nhọn và đuôi dài",
        img: "https://media.istockphoto.com/photos/wood-mouse-in-front-of-a-white-background-picture-id889651718?b=1&k=20&m=889651718&s=170667a&w=0&h=ues2ZtOVFfAQGzl5A38X3M8AupZSC6KadpDo8oVXQM8=",

    },
    {
        name: "banana",
        type: "noun",
        description_Eng: "A long, curved fruit with a yellow skin and soft, sweet, white flesh inside",
        description_VN: "Quả dài, cong, có vỏ màu vàng, bên trong mềm, ngọt, màu trắng:",
        img: "https://media.istockphoto.com/photos/banana-picture-id174959827?b=1&k=20&m=174959827&s=170667a&w=0&h=gfKhy0WOa98Ms9DmtLGXROxoO2SoeDmJCyXuEXQuDEg="
    },
]


const keylistEl = document.querySelector('.key-list');
const characterListEl = document.querySelector('.character-list');
const advertisesEl = document.querySelector('.advertises');
const btnContinute = document.querySelector('.btn--continute');


const imageEl = document.querySelector('.img');
const volTypeEl = document.querySelector('.card-text-type');
const textEngEl = document.querySelector('.card-text-eng');
const textVnEl = document.querySelector('.card-text-VN');


const displayKeyList = function () {
    for (let i = 97; i <= 122; i++) {
        const key = document.createElement('li');
        key.append(String.fromCharCode(i));
        key.classList.add('key');
        keylistEl.append(key);
    }
}

displayKeyList();






let gameIndex = 0;
function StartGame() {
    advertisesEl.classList.remove('open');
    characterListEl.innerHTML = "";
    const str = vocabularies[gameIndex].name;
    //vol 
    let charsNeedToGuess = getChar(str);
    displayEmptyBox(vocabularies[gameIndex]);
    gameProcess(charsNeedToGuess);
}


StartGame();


function getChar(str) {

    let charsNeedToGuess = [];
    let sentenceArr = (str.split("")).filter(e => { //Các kí tự 
        if (e !== " ") {
            return e;
        }
    });
    for (let i = 0; i < sentenceArr.length; i++) {
        if (!charsNeedToGuess.includes(sentenceArr[i])) {
            charsNeedToGuess.push(sentenceArr[i]);
        }
    }
    return charsNeedToGuess;
}




// Hiển thị các kí tự cần đoán ra màn hình

function displayEmptyBox(vocabulary) {
    let sentence = vocabulary.name.split("");

    imageEl.setAttribute('src', vocabulary.img);
    volTypeEl.textContent = vocabulary.type;
    textEngEl.textContent = vocabulary.description_Eng;
    textVnEl.textContent = vocabulary.description_VN;
    for (let i = 0; i < sentence.length; i++) {
        const div = document.createElement('li');
        sentence[i] !== " " ? div.classList.add('character-border') : "";
        const characterEl = document.createElement('div');

        characterEl.append(sentence[i]);
        characterEl.classList.add('character');

        div.append(characterEl);
        characterListEl.append(div);
    }
}


// 

function gameProcess(charsNeedToGuess) {
    const keyEls = document.querySelectorAll('.key');
    const characterEls = document.querySelectorAll('.character');
    for (let keyEl of keyEls) {
        keyEl.addEventListener('click', function () {
            let key = keyEl.textContent;
            if (charsNeedToGuess.includes(key) && charsNeedToGuess.length > 0) {
                charsNeedToGuess.splice(charsNeedToGuess.indexOf(key), 1);

                //Hiện kết quả
                characterEls.forEach(char => {
                    if (char.textContent === key) {
                        char.classList.add('appear');
                    }
                })
                if (charsNeedToGuess.length === 0 && gameIndex < vocabularies.length) {
                    console.log("You win");
                    gameIndex++;
                    advertisesEl.classList.add('open');
                    btnContinute.addEventListener('click', function () {
                        StartGame();
                    })

                }
                console.log(charsNeedToGuess);
            }
        })
    }
}







