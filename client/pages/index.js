import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import PopularSwiper from '../components/Swipers/PopularSwiper'
import OfferSwiper from '../components/Swipers/OfferSwiper'
import HomeLayout from '../layouts/HomeLayout'
import MainLayout from '../layouts/MainLayout'
import LatestSwiper from '../components/Swipers/LatestSwiper'
import { getAllBrands, getAllCategories, getAllProducts } from "../services/product";
import Meta from '../components/Meta'


const Home =({  categories, productPerPage, numberOfProducts, brands,latestProducts,popularProducts }) => {

  const router = useRouter()
  return (
    <>
         <Meta title="Home" />
        <Stack >
          <Box width="100%" height="100%" >
              <PopularSwiper products={popularProducts}/>
          </Box> 
          <Box width="100%" height="100%" >
              <OfferSwiper products={popularProducts}/>
          </Box>
          <Box width="100%" height="100%" >
              <LatestSwiper products={latestProducts}/>
          </Box>
        </Stack>
    </>
  )
}

export const getServerSideProps = async (context) => {

  const { data: categories } = await getAllCategories();
  const { data: brands } = await getAllBrands();
  try {
      let latestProducts = []
      let popularProducts = []
      let numberOfProducts = 0
      let productPerPage = 1


      //getAllProducts(Page | limit | sort | searchQuery | category | price | discount | brand)
      const { data: allLatestProducts } = await getAllProducts(context.query.page || 1, 8, "latest" , context.query.search || "", context.query.category || "",false,context.query.price||"",context.query.discount||"",context.query.brand||"")
      const { data:  allPopularProducts} = await getAllProducts(context.query.page || 1, 8, "popularity" , context.query.search || "", context.query.category || "",false,context.query.price||"",context.query.discount||"",context.query.brand||"")
      // const { data: Allproducts } = await getAllProducts(context.query.page || 1, 10, context.query.sort , context.query.search || "", context.query.category || "",false,context.query.price||"",context.query.discount||"",context.query.brand||"")
      latestProducts = [...allLatestProducts.products]
      popularProducts = [...allPopularProducts.products]

      return {
          props: {
            latestProducts,
            popularProducts,
              numberOfProducts,
              productPerPage,
              brands: brands.brands,
              categories: categories.categories,
          },
      };
  } catch (error) {
      console.log(error);
      return {
          props: {
              products: [],
              numberOfProducts: 0,
              productPerPage: 1,
              brands: brands.brands,
              categories: categories.categories,
          },
      };
  }
};


Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  )
}


export default Home;

