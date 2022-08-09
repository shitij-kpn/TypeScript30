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
    }, 2000);
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
getVideo();
video.addEventListener("canplay", paintToCanvas);
