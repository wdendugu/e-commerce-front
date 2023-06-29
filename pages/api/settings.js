import { mongooseConnect } from "@/lib/mongoose";
import { Setting } from "@/models/Setting";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler (req,res) {
    await mongooseConnect()
    
    if (req.method === 'GET') {
        const {name} = req.query
        res.json(await Setting.findOne({name}))
    }

}