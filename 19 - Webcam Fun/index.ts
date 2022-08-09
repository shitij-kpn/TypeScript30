const video = <HTMLVideoElement>document.querySelector(".player");
const canvas = <HTMLCanvasElement>document.querySelector(".photo");
const context = <CanvasRenderingContext2D>canvas.getContext("2d");
const strip = <HTMLDivElement>document.querySelector(".strip");
const snap = <HTMLAudioElement>document.querySelector(".snap");

async function getVideo() {
  try {
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = videoStream;
    video.play();
  } catch (err) {
    console.log(err);
  }
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
