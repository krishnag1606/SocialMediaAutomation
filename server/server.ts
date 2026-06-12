import "dotenv/config";
import dns from "dns";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import socialAuthRouter from "./routes/socialAuthRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import postRouter from "./routes/postRoutes.js";
import activityRouter from "./routes/activityRoutes.js";
import { initScheduler } from "./services/schedulerService.js";

// 2. Set custom DNS servers to fix Node 24 DNS resolution issues
dns.setServers(['8.8.8.8', '8.8.4.4']); // Google's DNS servers

const app = express();

// CORS — allow the deployed frontend origin (set FRONTEND_URL in Vercel env vars)
// Falls back to "*" so local dev and unset deployments still work.
const corsOptions = {
    origin: process.env.FRONTEND_URL
        ? [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"]
        : "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.options("/*splat", cors(corsOptions)); // Handle preflight for all routes
app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is Live!');
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/oauth", socialAuthRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/posts", postRouter);
app.use("/api/activity", activityRouter);

// Initialize Scheduler
initScheduler();

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).send(err?.response?.data?.message || err?.message);
});

const startServer = async () => {
    await connectDB();

    if (process.env.NODE_ENV !== 'production') {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }
};

startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});

export default app;
