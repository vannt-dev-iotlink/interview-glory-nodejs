import jwt from "jsonwebtoken";

const SECRET = "secret_key";

const REFRESH_SECRET = "refresh_secret";

export const generateToken = (payload: any) => {
  const accessToken = jwt.sign(payload, SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "1d" });
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
