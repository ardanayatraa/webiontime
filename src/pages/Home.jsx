import React, { useState } from 'react';
import heroImage from '../assets/img/hero/hero.jpg'; // Gambar di folder src
import carousel1 from '../assets/img/carousel/carousel1.jpg';
import carousel2 from '../assets/img/carousel/carousel2.jpg';
import carousel3 from '../assets/img/carousel/carousel3.jpg';
import carousel4 from '../assets/img/carousel/carousel4.jpg';
import carousel5 from '../assets/img/carousel/carousel5.jpg';
import carousel6 from '../assets/img/carousel/carousel6.jpg';

const carouselData = [
  {
    title: "inside, outside",
    description: "As inside, so outside. Outdoor items like planter, windchime, or other decorative items to add a touch of spark from outside.",
    image: carousel1,
  },
  {
    title: "Classic Collection",
    description: "It's yours. Your idea, your taste, your style. We happy to help with our collections.",
    image: carousel2,
  },
  {
    title: "Stylish furniture",
    description: "Mix and match the table and stools to your own needs. Needs of beauty.",
    image: carousel3,
  },
  {
    title: "top deco",
    description: "Various kind of top table decorative items.",
    image: carousel4,
  },
  {
    title: "kitchenwares",
    description: "Tray, Water Bottle, Bowl. Make your kitchen go to the next level!",
    image: carousel5,
  },
  {
    title: "souvenir",
    description: "Wooden souvenir, shells, or other materials. Animal like souvenir, or other abstract object. Add a little accent of  one of a kind  thing to your home.",
    image: carousel6,
  },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fungsi untuk pindah ke slide sebelumnya
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  // Fungsi untuk pindah ke slide berikutnya
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-between bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="w-1/2 px-8">
          <h1 className="text-4xl font-bold text-white leading-tight">CV. WIDHI ASIH BALI EXPORT</h1>
          <p className="text-lg text-white mb-8 mt-4">Produced locally, delivered worldwide.</p>
         <a href="/catalog" className="text-3xl font-semibold text-yellow-500 mt-12">
          OUR CATALOG
        </a>

        </div>
        <div className="w-1/2 hidden lg:block"></div>
      </section>

      {/* Carousel Section */}
      <div className="relative  bg-gray-100">
        <div className=" mx-auto">
          {/* Gambar Carousel */}
          <div className="relative w-full h-screen overflow-hidden">
            <img
              src={carouselData[currentSlide].image}
              alt={carouselData[currentSlide].title}
              className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            />
            {/* Overlay dengan teks */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
              <h3 className="text-5xl font-bold mb-4 uppercase animate__animated animate__fadeIn">
                {carouselData[currentSlide].title}
              </h3>
              <p className="text-lg mb-8 animate__animated animate__fadeIn">
                {carouselData[currentSlide].description}
              </p>
          
            </div>
          </div>

          {/* Tombol Navigasi di Atas Gambar */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="bg-gray-600 text-white opacity-40  px-2 py-8  font-semibold hover:bg-gray-700"
            >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>

            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="bg-gray-600 text-white opacity-40 px-2 py-8 font-semibold hover:bg-gray-700"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>

            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
