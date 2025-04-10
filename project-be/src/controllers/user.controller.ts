import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export const signIn = async (req: Request, res: Response) => {
  const { firstName, lastName, phone, password } = req.body;
  if (UserService.findByPhone(phone)) {
    res.status(400).json({ message: "Phone already exists" });
    return
  }
  const result = await UserService.signInUser({ firstName, lastName, phone, password });
  if (!result.success) {
    res.status(400).json({ message: result.message });
    return
  }
  res.status(201).json(result.data);
};

export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  const user = UserService.findByPhone(phone);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid credentials" });
    return
  }
  const result = UserService.loginUser(user);
  res.json(result.data);
};

export const signOut = (req: Request, res: Response) => {
  try {
    UserService.invalidateToken(req.userId);
    res.status(200).json({ message: "Signed out successfully" });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const getUserInfo = (req: Request, res: Response) => {
  const user = UserService.getUserInfo(req.userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return
  }
  res.json(user);
};

export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = UserService.handleRefreshToken(refreshToken);
  if (!result.success) {
    res.status(403).json({ message: result.message });
    return
  }
  res.json(result.data);
};