// 강사님 코드
// 계획
// 1. 사용자가 원하는 폴더의 이름을 받아온다.
// 2. 그 폴더안에 video, captured, duplicated, edit 폴더를 만든다.
// 3. 폴더안에 있는 파일을 다 돌면서 해당하는 mp4/mov, png/aae, IMG_1234(IMG_E1234)

const path = require("path");
const os = require("os");
const fs = require("fs");

// 1. 사용자가 원하는 폴더의 이름을 받아온다.
const folder = process.argv[2];
console.log(folder);
// 작업하고자 하는 폴더 경로
// 현재 운영체계의 홈디렉토리에 Picture 폴더를 만들어서 그 안에서 작업하겠다.
const workingDir = path.join(os.homedir(), "Pictures", folder);

console.log(workingDir);

// 에러처리
// 폴더가 없거나, fs에 존재하지 않는 경로일시 에러메세지 출력
if (!folder || !fs.existsSync(workingDir)) {
  console.log(fs.existsSync(workingDir));
  console.error("Please enter folder name in Pictures");
  return;
}

// 2. 폴더 안에 video, captured, duplicated 폴더를 만들기

// workingDir 안에 video, captured, duplicated 폴더를 만들어라
// const videoDir = path.join(workingDir, "video");
// const capturedDir = path.join(workingDir, "captured");
// const duplicatedDir = path.join(workingDir, "duplicated");

// console.log(videoDir);
// // // 폴더 생성 -> 동기적으로 폴더 생성

// !fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
// !fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
// !fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);
