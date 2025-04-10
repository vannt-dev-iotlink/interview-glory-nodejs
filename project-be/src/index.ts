import express from "express";
import authRoutes from "./routes/user.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);

const PORT = 3001;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));