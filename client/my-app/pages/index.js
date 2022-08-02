import HomeLayout from '../components/homeLayout'
import MainLayout from '../components/MainLayout'
import OfferSwiper from '../components/OfferSwiper'

const Home =() => {
  return (
    <div>
      <OfferSwiper/>
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

