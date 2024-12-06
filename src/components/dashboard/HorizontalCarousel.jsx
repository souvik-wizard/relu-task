import React from "react";
import { FaStar } from "react-icons/fa";
import { useRef, useState } from "react";

const products = [
  {
    id: 1,
    title: "Modern Wall Decor Framed Painting",
    price: 199.99,
    rating: 5,
    imageUrl: "assets/horizontalcarousel/img1.png",
  },
  {
    id: 2,
    title: "Modern Wall Decor Framed Painting",
    price: 199.99,
    rating: 5,
    imageUrl: "assets/horizontalcarousel/img2.png",
  },
  {
    id: 3,
    title: "Modern Wall Decor Framed Painting",
    price: 199.99,
    rating: 5,
    imageUrl: "assets/horizontalcarousel/img3.png",
  },
  {
    id: 4,
    title: "Modern Wall Decor Framed Painting",
    price: 199.99,
    rating: 5,
    imageUrl: "assets/horizontalcarousel/img4.png",
  },
];

export default function HorizontalCarousel() {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="lg:w-full w-screen mx-auto ">
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll gap-4 cursor-grab thin-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ scrollBehavior: "smooth" }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-1/2 lg:w-1/3 p-2">
            <div className=" rounded-lg overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-base md:text-lg leading-tight">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-2xl font-bold">${product.price}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
