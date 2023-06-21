import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req,res) {
    await mongooseConnect()
    const session = await getServerSession (req,res,authOptions)

    res.json(
        await Order.find({userEmail:session?.user?.email})
    )
}