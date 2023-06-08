import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function HomePage ({featuredProduct,newProducts,wishedNewProducts}) {

  return (
    <>
      <Header/>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts}/>
    </>
    )
}

export async function getServerSideProps(ctx) {
  const featuredProductID =  '64593add25e0baf4249d3493'
  await mongooseConnect()
  const featuredProduct= await Product.findById(featuredProductID)
  const newProducts = await Product.find({}, null,{sort: {'_id':-1},limit:10})
  const {user} = await getServerSession(ctx.req, ctx.res, authOptions)
  const wishedNewProducts = await WishedProduct.find({
    userEmail:user.email,
    product: newProducts.map(p => p._id.toString())
  })


  return {
    props:{
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts:JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString())
    }
  }
}