import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import socialAuthRouter from "./routes/socialAuthRoutes.js";
import accountRouter from "./routes/accountRoutes.js";

const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is Live!');
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/oauth", socialAuthRouter);
app.use("/api/accounts", accountRouter);


// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).send(err?.response?.data?.message || err?.message);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});