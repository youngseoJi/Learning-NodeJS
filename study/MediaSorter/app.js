// 파일을 분류하여 폴더를 생성하고 파일을 이동시키는 프로그램을 만들어보기

// 1. 인자 읽어오기, 예시 파일이 담기 폴더 읽어오기
// 2. 파일명에 따라 구분할 폴더 생성하기 (video, captured, duplicated, edit)
// 3. 파일명 조회하여 포함하고 있는 구분자를 기준으로 담을 폴더명 정하기
// 4. 파일명 구분자를 기준으로 각 폴더에 파일 이동시키기
// 5. 정렬하기 : 폴더 다음에 폴더내에 안들어오는 파일 오른쪽에 배치하기

/** 폴더명 : 구분자
 * video: mp4, mov
 * captured(스크린샷): png, aae
 * duplicated(편집된것과 중복): IMG 원본사진 넣기
 * edit(편집사진 E표시): IMG_E 편집된 사진 넣기
 * */

// 4. 파일명 구분자를 기준으로 각 폴더에 파일 이동시키기는 함수 생성하기

// Node.js에서 명령줄 인자를 읽어오는 방법은 process.argv 배열을 사용
// console.log(process.argv[2]);
const path = require("path");
const fs = require("fs");
const testFolder = process.argv[2];
console.log("testFolder", testFolder);

// 폴더 만들기
fs.mkdir("video").catch(console.error);
fs.mkdir("captured").catch(console.error);
fs.mkdir("duplicated").catch(console.error);
fs.mkdir("edit").catch(console.error);

// 3. 모든 폴더 및 파일 이름 조회 (스트림 형태로 가져옴)
const allFiles = fs
  .readdirsync(testFolder)
  .then(console.log)
  .catch(console.error);
// console.log("allFiles", allFiles);

for (const file of allFiles) {
  const fileName = path.basename(file, ext);
  const ext = path.extname(file);
  console.log("fileName", fileName);
  let targetFolder = null;

  // 파일 확장자와 이름을 기준으로 폴더 결정
  if ([".mp4", ".mov"].includes(ext)) targetFolder = "video";
  else if ([".png", ".aae"].includes(ext)) targetFolder = "captured";
  else if (file.startsWith("IMG_") && !file.includes("_E"))
    targetFolder = "duplicated";
  else if (file.includes("IMG_E")) targetFolder = "edit";
}
