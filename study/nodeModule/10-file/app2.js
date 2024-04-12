const fs = require("fs").promises;
// 프로미스 형태로 사용하기 위해 fs 모듈안의 프로미스들을 가져온다.

// 주의: 순서대로 코드를 작성했지만, 비동기 함수이기에 순서가 중요하다면 then내에서 해당하는 비동기함수가 다 실행된 후, 실행되도록 작성해야한다.

// 파일읽기
fs.readFile("./text.txt", "utf8") //  옵션에 인코딩 설정 필요, 기본값 버퍼로 읽어옴

  // 데이터가 잘읽어졌을 때 then을 통해 데이터를 받아온다.
  .then((data) => console.log(data))
  // 에러가 발생했을 때 catch를 통해 에러를 받아온다.
  .catch(console.error);

// 파일 쓰기
fs.writeFile("./file.txt", "Hello, Dream Coders! ").catch(console.error);

// 작성되어있는 파일에 내용을 추가할 때 사용
fs.appendFile("./file.txt", "Hello, Dream Coders!2222 ").catch(console.error);

// void타입 함수는 리턴값이 없다.

// 파일 복사
fs.copyFile("./file.txt", "./file2.txt").catch(console.error);

// 폴더

// 폴더 만들기
fs.mkdir("sub-folder").catch(console.error);
// 모든 폴더 및 파일 이름 조회 (스트림 형태로 가져옴)
fs.readdir("./").then(console.log).catch(console.error);
