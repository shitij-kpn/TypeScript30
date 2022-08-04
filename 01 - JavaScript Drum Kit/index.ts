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

const keys:HTMLElement[] = Array.from(document.querySelectorAll('.key'));

function removePlayingClass(e: TransitionEvent){
	if(e.propertyName !== "transform") return;
	if(!e.target) return;

	(e.target as HTMLElement).classList.remove("playing");
}

function playSound(e: KeyboardEvent){
	const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
	const audio = <HTMLVideoElement>document.querySelector(`audio[data-key="${e.keyCode}"]`);

	if(!audio || !key) return;

	key.classList.add("playing");
	audio.currentTime = 0;
	audio.play();
}

keys.forEach(key => key.addEventListener("transitionend",removePlayingClass));
window.addEventListener("keydown",playSound);