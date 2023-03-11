import Head from "next/head";
import dummy_data from "../dummy";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

const Home = ({ products }: { products: Array<any> }) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  // This is how it should be but it's taking forever so using dummy
  // const products = await fetch("https://fakestoreapi.com/products")
  //   .then((res) => res.json())

  return {
    props: {
      products: dummy_data,
    },
  };
}
