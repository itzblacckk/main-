import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TOUR_CATEGORIES } from '../../types/categories';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    title: 'Mumbai Treks',
    subtitle: 'Explore Local Adventures',
    price: '999',
    link: `/tours`
  },
  {
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7',
    title: 'Camping Adventures',
    subtitle: 'Experience Nature Up Close',
    price: '2,999',
    link: `/tourss`
  },
  {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
    title: 'Himachal Tours',
    subtitle: 'Discover Mountain Paradise',
    price: '9,999',
    link: `/tours`
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}
          >
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-4">{slide.subtitle}</p>
                <p className="text-2xl mb-8">Starting from ₹{slide.price}</p>
                <Link
                  to={slide.link}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg inline-block"
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}