import Footer from "@/components/SharedComponents/Footer/Footer";
import React from "react";

const Gallery = () => {
  const images = [
    "https://i.ibb.co.com/SPfVCLw/coding.jpg",
    "https://i.ibb.co.com/VTr25mK/yoga.jpg",
    "https://i.ibb.co.com/C9wb3FB/400273141-306846852197398-8166804837349026743-n.jpg",
    "https://i.ibb.co.com/HnwW8JR/food.jpg",
    "https://i.ibb.co.com/w4HndJc/dance.jpg",
    "https://i.ibb.co.com/3d8W9W6/travel.jpg",
    "https://i.ibb.co.com/BNzD40c/romance2.jpg",
    "https://i.ibb.co.com/6NvVQCJ/flower.jpg",
    "https://i.ibb.co.com/vdw7BrM/beautiful-river.jpg",
    "https://i.ibb.co.com/8m90vS8/view-boat.jpg",
    "https://i.ibb.co.com/HTqF6rn/digital-art.jpg",
    "https://i.ibb.co.com/ZMP1hRH/natural-waterfall.jpg",
  ];
  return (
    <div>
      <div className="bg-white">
        <div className="pt-24 pb-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl text-black font-bold">--Pinpik Gallery--</h1>
            <p>Recent User Post Images</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto">
            {images.map((src, index) => (
              <div key={index} className="w-full">
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Gallery;
