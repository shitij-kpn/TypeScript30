/* nub code
const audioTags:NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
const keyElements:NodeListOf<HTMLElement> = document.querySelectorAll(".key");
console.log(keyElements);

function handleKeyUp(e: KeyboardEvent){
    const {keyCode} = e;
    audioTags.forEach((single:HTMLAudioElement) => {
        if(single.dataset.key === keyCode.toString()){
            console.log("playing");
            let i:number;
            for(i=0;i<keyElements.length;i++){
                console.log(keyElements[i].dataset.key);
                if(keyElements[i].dataset.key === keyCode.toString()){
                    keyElements[i].classList.add("playing");
                    setTimeout(() => {
                        keyElements[i].classList.remove("playing");
                    },100);
                    break;
                }
            }
            single.play();
            
        }
    })
}

document.addEventListener("keyup",handleKeyUp)
*/
var keys = Array.from(document.querySelectorAll('.key'));
function removePlayingClass(e) {
    if (e.propertyName !== "transform")
        return;
    if (!e.target)
        return;
    e.target.classList.remove("playing");
}
function playSound(e) {
    var key = document.querySelector("div[data-key=\"".concat(e.keyCode, "\"]"));
    var audio = document.querySelector("audio[data-key=\"".concat(e.keyCode, "\"]"));
    if (!audio || !key)
        return;
    key.classList.add("playing");
    audio.currentTime = 0;
    audio.play();
}
keys.forEach(function (key) { return key.addEventListener("transitionend", removePlayingClass); });
window.addEventListener("keydown", playSound);
