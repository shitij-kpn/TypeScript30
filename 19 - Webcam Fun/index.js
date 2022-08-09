var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const context = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
function getVideo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const videoStream = yield navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            video.srcObject = videoStream;
            video.play();
        }
        catch (err) {
            console.log(err);
        }
    });
}
function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.height = height;
    canvas.width = width;
    return setInterval(() => {
        context.drawImage(video, 0, 0, width, height);
        let pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        // pixels = redShift(pixels);
        // pixels = rgbSplit(pixels);
        context.putImageData(pixels, 0, 0);
    }, 10000);
}
function takePhoto() {
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "photo");
    link.innerHTML = `<img src=${data} alt="photo"/>`;
    strip.appendChild(link);
}
function redShift(pixels) {
    for (let i = 0; i <= pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100;
        pixels.data[i + 1] = pixels.data[i + 1] - 100;
        pixels.data[i + 2] = pixels.data[i + 2] + 50;
    }
    return pixels;
}
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}
function greenScreen(pixels) {
    const levels = {
        rmin: 0,
        rmax: 0,
        bmin: 0,
        bmax: 0,
        gmin: 0,
        gmax: 0,
    };
    document.querySelectorAll(".rgb input").forEach((input) => {
        levels[input.name] = parseInt(input.value);
    });
    for (let i = 0; i < pixels.data.length; i = i + 4) {
        let red = pixels.data[i + 0];
        let green = pixels.data[i + 1];
        let blue = pixels.data[i + 2];
        if (red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}
getVideo();
video.addEventListener("canplay", paintToCanvas);
