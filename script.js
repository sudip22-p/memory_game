const rows=6;
const cols=6;
const emojis = [
    '\u{1F604}', '\u{2B50}', '\u{1F44D}', '\u{1F680}', '\u{1F602}', 
    '\u{1F622}', '\u{1F44E}', '\u{1F609}', '\u{1F431}', '\u{1F436}', 
    '\u{1F60D}', '\u{1F3C6}', '\u{1F4A9}', '\u{1F525}', '\u{1F60E}', 
    '\u{1F697}', '\u{1F381}', '\u{1F44C}', '\u{1F354}', '\u{1F3B5}', 
    '\u{1F3A9}', '\u{1F680}', '\u{1F60C}', '\u{1F340}', '\u{1F4B0}', 
    '\u{1F4BB}', '\u{1F408}', '\u{1F413}', '\u{1F496}', '\u{1F4F1}', 
    '\u{1F463}', '\u{1F525}', '\u{1F4E2}', '\u{1F4F7}', '\u{1F4D6}', 
    '\u{1F64F}', '\u{1F319}', '\u{1F3C0}', '\u{1F48E}', '\u{1F36A}', 
    '\u{1F60A}', '\u{1F6F0}', '\u{1F52B}', '\u{1F6A9}', '\u{1F48A}', 
    '\u{1F389}', '\u{1F451}', '\u{1F9D1}', '\u{1F3E0}', '\u{1F4B8}'
  ];
let selectedEmojis=[];
window.onload=function(){
    setInterval(victoryCheck,100);
    getRandomEmojiSet();
    startGame();
    let boxes=document.getElementsByClassName("box");
    setTimeout(()=>{
        for(let i=0;i<boxes.length;i++){
            boxes[i].classList.add("white");
        }
    },3000);
}

function victoryCheck(){
    let matchedBoxes=document.getElementsByClassName("matchedBox");
    if(matchedBoxes.length==36){
        let boxes=document.getElementsByClassName("box");
        for(let i=0;i<boxes.length;i++){
            boxes[i].style.fontSize="16px";
            boxes[i].style.color="green";
            boxes[i].style.backgroundColor="gold";
            boxes[i].textContent="victory";
        }
    }
}


function startGame(){
    let emojiIndex=0;
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            let newBox=document.createElement("div");  
            newBox.classList.add("box");
            newBox.id=r.toString()+"-"+c.toString();
            newBox.textContent=getEmoji(emojiIndex);
            emojiIndex+=1;
            document.getElementById("board").append(newBox);
            newBox.addEventListener("click",clickEmoji);
        }
    }
}


function clickEmoji(){
    this.classList.add("openBox");
    this.removeEventListener("click",clickEmoji);
    setTimeout(checkMatched,700);
}


function checkMatched(){
    let openBoxes=document.getElementsByClassName("openBox");
    if(openBoxes.length>1){
        if(openBoxes[0].textContent==openBoxes[1].textContent){//if matched
            openBoxes[0].classList.add("matchedBox");
            openBoxes[1].classList.add("matchedBox");
            openBoxes[1].classList.remove("openBox");
            openBoxes[0].classList.remove("openBox");
        }else{//if not matched
            openBoxes[0].addEventListener("click",clickEmoji);
            openBoxes[1].addEventListener("click",clickEmoji);
            openBoxes[1].classList.remove("openBox");
            openBoxes[0].classList.remove("openBox");
        }
    }
}

function getEmoji(index){
    return selectedEmojis[index];
}


function getRandomEmojiSet(){
    let number=36;
    while (selectedEmojis.length < number) {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        const selectedEmoji = emojis[randomIndex];
            selectedEmojis.push(selectedEmoji);
            selectedEmojis.push(selectedEmoji);
            selectedEmojis.push(selectedEmoji);
            selectedEmojis.push(selectedEmoji);
        }
    const shuffledEmojis = selectedEmojis.slice();
    shuffleArray(shuffledEmojis);
    selectedEmojis=shuffledEmojis;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

document.getElementById("reset").addEventListener("click",()=>{
    location.reload();
});
  