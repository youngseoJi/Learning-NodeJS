// MVC 중 "Model" 부분 "데이터 베이스" 역할
// 순수하게 데이터를 저장하고, 조회하는 역할을 하는 저장소

let users = [
  {
    id: "1",
    username: "brew",
    password: "$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm",
    name: "brew",
    email: "brew@gmail.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-2-300x300.png",
  },
];

/**  모델 함수명을 생성할때 tweet안적은 이유 "중복 제거"
 * tweetRepository  데이터를 관리하는 파일명이 이미 주어지기에 tweet이라는 데이터를 관리하는 파일이라는 것을 알 수 있기 때문에
 * tweet이라는 단어를 생략해도 된다.
 */

// 특정 유저 조회
// export async function findByUser(username) {
//   return users.find((user) => user.username === username);
// }
// console.log("findByUser users", users);

// // 유저 생성
// export async function createUser(userData) {
//   // 데이터 모델 생성
//   const createdUser = { ...userData, id: Date.now().toString() };
//   console.log("createdUser", createdUser);
//   users.push(createdUser);

//   // 생성된 유저의 id를 반환
//   return createdUser.id;
// }

// // 특정 유저 조회
// // export async function findById(id) {
// //   console.log("findById id", id);
// //   return users.find((user) => user.id === id);
// // }

// export async function findById(id) {
//   console.log("Searching for user ID:", id);
//   const user = users.find((user) => user.id === id);
//   if (!user) {
//     console.log("User not found:", id);
//     return null;
//   }
//   return user;
// }
export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  console.log("Searching for user ID:", id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    console.log("User not found:", id);
    return null;
  }
  return user;
}
export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
