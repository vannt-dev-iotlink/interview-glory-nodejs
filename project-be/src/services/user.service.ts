
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { User, users } from "../models/User";
import { generateToken, verifyRefreshToken } from "../utils/jwt";

let currentTokens: Record<string, string> = {}; // token mapping

export const signInUser = async (data: any) => {
  const { firstName, lastName, phone, password } = data;

  if (users.find((u) => u.phone === phone)) {
    return { success: false, message: "Phone already exists" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user: User = { id: uuid(), firstName, lastName, phone, password: hashedPassword };
  users.push(user);
  const tokens = generateToken({ id: user.id });
  storeToken(user.id, tokens.accessToken);
  return { success: true, data: { user: { ...user, password: undefined }, ...tokens } };
};

export const loginUser = (user: User) => {
  const tokens = generateToken({ id: user.id });
  storeToken(user.id, tokens.accessToken);
  return { success: true, data: { user: { ...user, password: undefined }, ...tokens } };
};

export const getUserInfo = (userId: string) => {
  const user = users.find((u) => u.id === userId);
  return { ...user, password: undefined }
};

export const handleRefreshToken = (token: string) => {
  try {
    const user = verifyRefreshToken(token) as any;
    const newTokens = generateToken({ id: user.id });
    storeToken(user.id, newTokens.accessToken);
    return { success: true, data: newTokens };
  } catch {
    return { success: false, message: "Invalid refresh token" };
  }
};

export const findByPhone = (phone: string) => users.find(u => u.phone === phone);

export const findById = (id: string) => users.find(u => u.id === id);

export const storeToken = (userId: string, token: string) => {
  currentTokens[userId] = token;
};

export const invalidateToken = (userId: string) => {
  delete currentTokens[userId];
};

export const isValidToken = (userId: string, token: string) => {
  return currentTokens[userId] === token;
};