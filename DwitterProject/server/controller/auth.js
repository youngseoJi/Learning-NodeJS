// MVC 중 "Controller" 부분 "비즈니스 로직" 역할
import * as userRepository from "../data/auth.js";

import { create } from "../data/tweet.js";
import jwt from "jsonwebtoken"; // JSON Web Token 라이브러리 불러오기
import bcrypt from "bcrypt";
/* API 기능 구현 정리 

1. 회원가입 POST /auth/signup
2. 로그인 POST /auth/login
3. 토큰 생성
*/

//보안
// 비밀번호 암호화
const jwtSecretKey = "F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z";
// "6fb53dc37fbc195c7cb25506ff14861b1df7a6da9217f59212955be5d8c0e355";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

// 회원가입
export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  // console.log("Received body:", req.body);

  const findUser = await userRepository.findByUsername(username);

  if (findUser) {
    return res.status(409).json({ message: "이미 존재하는 아이디입니다." });
  }
  // 비밀번호 암호화
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  // 고유한 아이디 생성
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });

  // 받은 유저 id 값을 활용하여 토큰 생성
  const token = createToken(userId);

  res.status(201).json({ token, userId });
}

// 로그인
export async function login(req, res) {
  const { username, password } = req.body;

  // 유저 존재여부 / 아이디와 비밀번호가 일치하는지 확인
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({
      message: "존재하지 않는 아이디 또는 비밀번호입니다. 다시 확인해주세요",
    });
  }

  // 비밀번호 일치여부 : bcrypt.compare이용하여 비밀번호 비교
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "존재하지 않는 아이디 또는 비밀번호입니다. 다시 확인해주세요",
    });
  }

  const token = createToken(user.id);
  res.status(200).json({ message: "로그인을 성공하였습니다.", token });
}

// 토큰 생성 함수 <- 공용 함수 / 중복 제거
function createToken(id) {
  // 회원가입 및 로그인 성공
  // 고유한 아이디를 받고, 시크릿키와 만료일을 이용하여 토큰 생성
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

// 로그인한 유저 정보
export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
