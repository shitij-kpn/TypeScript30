// get element
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = (Array.from(player.querySelectorAll("[data-skip]")));
const ranges = (Array.from(player.querySelectorAll(".player__slider")));
// build functions
function togglePlay() {
    if (video.paused) {
        video.play();
        return;
    }
    video.pause();
}
function updateIcon() {
    const icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;
}
function skip() {
    const { currentTime, duration } = video;
    const skipTime = parseInt(this.dataset.skip);
    if (skipTime > 0) {
        if (skipTime < duration - currentTime) {
            video.currentTime += skipTime;
        }
        else {
            video.currentTime = video.duration;
        }
    }
    else if (skipTime < 0) {
        if (skipTime < currentTime) {
            video.currentTime += skipTime;
        }
        else {
            video.currentTime = 0;
        }
    }
}
function handleRangeUpdate(e) {
    video[this.name] = this.value;
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent + "%";
}
function scrub(e) {
    const percent = e.offsetX / progress.offsetWidth;
    video.currentTime = video.duration * percent;
}
// add event listeners
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);
video.addEventListener("timeupdate", handleProgress);
skipButtons.forEach((sb) => sb.addEventListener("click", skip));
ranges.forEach((rb) => rb.addEventListener("input", handleRangeUpdate));
progress.addEventListener("click", scrub);
