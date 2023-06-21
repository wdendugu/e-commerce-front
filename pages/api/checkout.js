import { mongooseConnect } from "@/lib/mongoose"
import { Order } from "@/models/Order"
import { Product } from "@/models/Product"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"


export default async function handler (req,res) {
    if (req.method !== 'POST') {
        res.json('Error only POST req accepted')
        return
    }
    const {name,email,streetAdress,city,postalCode,country,cartProducts} = req.body
    await mongooseConnect()

    const productsIds = cartProducts
    const uniqueIds = [...new Set(productsIds)]
    const productsInfos = await Product.find({_id:uniqueIds})
    let line_items = []

    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId)
        const quantity = productsIds.filter(id => id === productId)?.length || 0

        if( quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                product_data: {name:productInfo.title},
                price_data: {
                    currency: "USD",
                    unit_amount: quantity * productInfo.price
                }
            })
        }
    }

    const session = await getServerSession(req,res,authOptions)

    const orderDoc = await Order.create({
        line_items,
        name,
        email,
        streetAdress,
        city,
        postalCode,
        country,
        paid:false,
        userEmail: session?.user?.email,
    })


    res.json({
        url:'/success'
    })
}

