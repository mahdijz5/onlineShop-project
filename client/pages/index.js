import { useRouter } from 'next/router'
import HomeLayout from '../components/HomeLayout'
import MainLayout from '../components/MainLayout'
import OfferSwiper from '../components/OfferSwiper'

const Home =() => {
  const router = useRouter()
  return (
    <div>
      {/* <OfferSwiper/> */}
      sadsafkfsd
      <p onClick={() => {
        router.push("/?page=2312")
      }}> sdsafhasfiashio</p>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  )
}


export default Home;

