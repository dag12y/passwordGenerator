const characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
    
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const alpahaNumericalCharacter = [
    "~",
    "`",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "-",
    "+",
    "=",
    "{",
    "[",
    "}",
    "]",
    ",",
    "|",
    ":",
    ";",
    "<",
    ">",
    ".",
    "?",
    "/"
];

function getRandomPassword(){
    let password=''
    let array = [...characters,...numbers,...alpahaNumericalCharacter]
    for(let i=0;i<12;i++){
        password+=array[Math.floor(Math.random()*array.length)]
    }
    return password
}
let timeout;
function copyText(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            clearInterval(timeout)
            const popOut = document.querySelector(".pop-out");
            popOut.classList.add("show");
            timeout = setTimeout(() => {
                popOut.classList.remove("show");
            }, 1000);
        })
        .catch((err) => {
            console.error("Failed to copy:", err);
            alert('Failed to copy')
        });
}


document.querySelector('button').addEventListener('click',()=>{
    document.querySelectorAll('.output')
        .forEach(output=>{
            let currentPassword=getRandomPassword()
            output.textContent =currentPassword;
            output.addEventListener('click',()=>{
                copyText(currentPassword)
            });}
        )             
})
