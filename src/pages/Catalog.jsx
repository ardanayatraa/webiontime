import React from 'react';

// Import images at the top of your file
import gambar1 from '../assets/img/gambar 1.png';
import gambar2 from '../assets/img/gambar 2.png';
import gambar3 from '../assets/img/gambar 3.png';
import gambar4 from '../assets/img/gambar 4.png';
import gambar5 from '../assets/img/gambar 5.png';
import gambar6 from '../assets/img/gambar 6.png';
import gambar7 from '../assets/img/gambar 7.png';
import gambar8 from '../assets/img/gambar 8.png';
import gambar9 from '../assets/img/gambar 9.png';

function Catalog() {
  // Array of product objects, each with an image and description
  const products = [
    { img: gambar1, title: 'Wall Decor', description: 'This is the description for product 1' },
    { img: gambar2, title: 'Wood Coconut', description: 'This is the description for product 2' },
    { img: gambar3, title: 'Wooden Mini', description: 'This is the description for product 3' },
    { img: gambar4, title: 'Teak Abstrack', description: 'This is the description for product 4' },
    { img: gambar5, title: 'Basket Bamboo', description: 'This is the description for product 5' },
    { img: gambar6, title: 'Stool Brown', description: 'This is the description for product 6' },
    { img: gambar7, title: 'Cotton Teak', description: 'This is the description for product 7' },
    { img: gambar8, title: 'Kitchenware Glass', description: 'This is the description for product 8' },
    { img: gambar9, title: 'Top Table Decor', description: 'This is the description for product 9' }
  ];

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">CATALOG</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
             
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
