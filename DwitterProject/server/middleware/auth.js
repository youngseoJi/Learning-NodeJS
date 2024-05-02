import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authentication Error" };

// 공통으로 사용할 인증 미들웨어
// 모든요청에 대해 헤더에 Authorization 있는지 , 형식이 맞는지, 데이터베이스에 사용자가 있는지 확인

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    "F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z",
    // "6fb53dc37fbc195c7cb25506ff14861b1df7a6da9217f59212955be5d8c0e355",
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      // 사용자를 데이터 베이스에서 찾지 못할경우 에러처리 -> 찾을경우 req.userId에 사용자 id를 저장
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id;
      next();
    }
  );
};
