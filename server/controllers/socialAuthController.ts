import { Request, Response } from "express";
// ZERNIO - commented out for Vercel deployment
// import zernio from "../config/zernio.js";
import { User } from "../models/User.js";
import { Account } from "../models/Account.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

// Ensure User has a zernio account and return their zernio user ID
const getOrCreateZernioProfile = async (user: any): Promise<string> => {
    // ZERNIO - commented out for Vercel deployment
    // try{
    //     const result = await zernio.profiles.listProfiles();
    //     const data = result.data as any;
    //     const profiles: any[] = Array.isArray(data)
    //         ? data
    //         : Array.isArray(data?.profiles)
    //             ? data.profiles
    //             : Array.isArray(data?.data)
    //                 ? data.data
    //                 : Array.isArray(data?.data?.profiles)
    //                     ? data.data.profiles
    //                     : [];

    //     if(profiles.length > 0){
    //         const pid = profiles[0]._id || profiles[0].id;
    //         await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
    //         return pid;
    //     }

    //     const createResult = await zernio.profiles.createProfile({
    //         body: {name: `${user.name || user.email}'s workspace`} as any,
    //     })
    //     const created = (createResult.data as any)?.profile || createResult.data;

    //     const pid = created?._id || created?.id;

    //     if(!pid){
    //         throw new Error("Failed to create Zernio profile - no ID returned")
    //     }

    //     await User.findByIdAndUpdate(user._id, {zernioProfileId: pid});
    //     return pid;

    // } catch (error: any) {
    //     console.error("Error fetching profiles from Zernio:", error?.message || error, error?.response?.data || {});
    //     throw error;
    // }
    throw new Error("Zernio integration disabled for Vercel deployment");
}

// Generate OAuth URL for a given platform
// GET /api/auth/auth/:platform
export const generateAuthUrl = async (req: AuthRequest, res: Response): Promise<void> => {
    console.log('generateAuthUrl start', { platform: req.params.platform, userId: req.user?._id?.toString() });
    try {
        const {platform} = req.params;
        if(!req.user){
            res.status(401).json({ message: "No authenticated user" });
            return;
        }

        // ZERNIO - commented out for Vercel deployment
        // const profileId = await getOrCreateZernioProfile(req.user);
        // const origin = req.headers.origin || process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173";
        // const redirectUrl = `${origin}/accounts`;

        // const supportedPlatforms = ["twitter", "linkedin", "facebook", "instagram"];
        // const requestedPlatform = typeof platform === "string" ? platform.toLowerCase() : "";
        // if (!supportedPlatforms.includes(requestedPlatform)) {
        //     res.status(400).json({ message: `Unsupported platform: ${platform}` });
        //     return;
        // }

        // console.log('calling zernio.connect.getConnectUrl', { requestedPlatform, profileId, redirectUrl });
        // const result = await zernio.connect.getConnectUrl({
        //     path: { platform: requestedPlatform as any },
        //     query: {
        //         profileId,
        //         redirect_url: redirectUrl
        //     }
        // })

        // const data = result.data as any;
        // const connectData = data?.authUrl ? data : data?.data ? data.data : data;
        // console.log("getConnectUrl response:", JSON.stringify(connectData, null, 2))

        // const authUrl = connectData.authUrl;
        // if(!authUrl){
        //     throw new Error(`Zernio returned no authUrl. Full response: ${JSON.stringify(connectData)}`)
        // }

        res.status(501).json({ message: "Zernio integration disabled for Vercel deployment" });

    } catch (error: any) {
        console.error('generateAuthUrl error', error?.message || error, error?.response?.data || 'no response data');
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

// Sync accounts from Zernio to our database
// POST /api/auth/sync
export const syncAccounts = async (req: AuthRequest, res: Response) : Promise<void>=>{
    try {
        // ZERNIO - commented out for Vercel deployment
        // const profileId = await getOrCreateZernioProfile(req.user);
        // const result = await zernio.accounts.listAccounts({
        //     query: {profileId} as any
        // })

        // const data = result.data as any;
        // const payload = data?.accounts || data?.data?.accounts || (Array.isArray(data) ? data : []);
        // const zernioAccounts: any[] = Array.isArray(payload) ? payload : [];
        // const supportedPlatforms = ["twitter", "linkedin", "facebook", "instagram"];
        // const syncedAccounts = [];

        // for(const zAccount of zernioAccounts){
        //     const zid = zAccount._id || zAccount.id;
        //     if(!zid){
        //         console.warn("Skipping account with no ID:", zAccount);
        //         continue;
        //     }

        //     const rawPlatform = (zAccount.platform || zAccount.type || "").toLowerCase();
        //     const normalizedPlatform = supportedPlatforms.find((p)=>rawPlatform.includes(p));

        //     if(!normalizedPlatform){
        //         console.log(`Skipping unsupported platform: "${rawPlatform}"`);
        //         continue;
        //     }

        //     const account = await Account.findOneAndUpdate(
        //         {zernioAccountId: zid},
        //         {
        //             user: req.user._id,
        //             platform: normalizedPlatform,
        //             handle: zAccount.username || zAccount.name || zAccount.handle || "Unknown",
        //             zernioAccountId: zid,
        //             status: "connected",
        //             avatarUrl: zAccount.avatarUrl || zAccount.picture || zAccount.profile_image_url,
        //         },
        //         {upsert: true, returnDocument: 'after'}
        //     )
        //     syncedAccounts.push(account)
        // }

        res.status(501).json({ message: "Zernio integration disabled for Vercel deployment" });
    } catch (error: any) {
        console.error("Error syncing accounts:", error?.message || error, error?.response?.data || {});
        const message = error?.response?.data?.message || error?.response?.data || error?.message || "Server error";
        res.status(500).json({ message });
    }
}
