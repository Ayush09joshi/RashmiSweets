import Head from "next/head";
// import Image from "next/image";
import TopItems from "./Components/TopItems";
import Hero from "./Components/Hero";
import Maps from "./Components/Maps";
import Testimonials from "./Components/Testimonials";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rashmi Sweet Shop</title>
        <meta name="description" content="Rashmi Sweet Shop" />
        <meta name="keywords" content="nextjs, blogmaster blog, blof master" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <TopItems />
      <Maps />
      <Testimonials />

    </>
  );
}
