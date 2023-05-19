import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage ({featuredProduct,newProducts}) {

  return (
    <>
      <Header/>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts} />
    </>
    )
}

export async function getServerSideProps() {
  const featuredProductID =  '64593add25e0baf4249d3493'
  await mongooseConnect()
  const featuredProduct= await Product.findById(featuredProductID)
  const newProducts = await Product.find({}, null,{sort: {'_id':-1},limit:10})
  return {
    props:{
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts:JSON.parse(JSON.stringify(newProducts))
    }
  }
}