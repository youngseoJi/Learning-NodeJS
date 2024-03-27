const path = require("path");
// 파일의 경로에 접근하거나 경로에 대해서 무언가를 처리할 때 쓰는 모듈
console.log(__dirname);
console.log(__filename);

//basename
// 파일의 이름만 추출
console.log(path.basename(__filename));
console.log(path.basename(__filename, ".js"));

//dirname
// 디렉토리 이름만 추출
console.log(path.dirname(__filename));

//extension
// 확장자만 추출
console.log(path.extname(__filename));

//parse
// 파일의 경로를 분리하여 추출 (root, dir, base, ext, name)
const parsed = path.parse(__filename);
console.log(parsed);
console.log(parsed.root);
console.log(parsed.dir);

// isAbsolute
// 절대 경로인지 상대 경로인지 확인
console.log("isAbsolute?", path.isAbsolute(__dirname)); // true (절대 경로)
console.log("isAbsolute?", path.isAbsolute("../")); // false (상대 경로)

//normalize
// 이상한 경로를 정상적인 경로로 변환
console.log(path.normalize("./folder/////sub")); //folder/sub
