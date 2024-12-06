import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import HorizontalCarousel from "./HorizontalCarousel";

const cardData = [
  {
    name: "Thomas Edward",
    username: "thewallart",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    profilePicture: "assets/posts/dpforp1.png",
    postImage: "assets/posts/post1.png",
  },
  {
    name: "Thomas J.",
    username: "thecustomcreater",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    profilePicture: "assets/posts/dpforp2.png",
    postImage: "assets/posts/post2.png",
  },
];

function SocialCard() {
  return (
    <div className="space-y-8 overflow-auto overflow-x-hidden thin-scrollbar rounded-[10px]">
      {cardData.map((card, index) => (
        <div key={index} className="w-full mx-auto rounded-[10px] bg-white">
          <div className="p-12 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-[10px] overflow-hidden ">
                  <img
                    src={card.profilePicture}
                    alt={`@${card.username}`}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{card.name}</h2>
                  <p className="text-sm text-[#8D8D8D]">@{card.username}</p>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <FaEllipsisV className="h-5 w-5 " />
              </button>
            </div>

            <div className="space-y-2">
              <p className="py-4">
                {card.description}{" "}
                <span className="text-[#FF5E8A] hover:underline cursor-pointer">
                  Read More
                </span>
              </p>
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden mt-2">
                <img
                  src={card.postImage}
                  alt="Post content"
                  className="object-cover w-full h-full"
                />
                <img
                  src="/assets/icons/white-heart.svg"
                  alt="love"
                  className="absolute top-8 right-8 w-6 h-6 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2 ">
              <button className="flex items-center justify-center gap-2 text-black hover:text-[#FF5E8A] transition-colors">
                <img
                  src="/assets/icons/heart-black.svg"
                  alt="like"
                  className="h-6 w-6 fill-current text-green-600"
                />
                <span className="text-sm font-medium">9.8k</span>
              </button>
              <button className="flex items-center gap-2 text-black hover:text-green-500 transition-colors">
                <img
                  src="/assets/icons/comment.svg"
                  alt="comment"
                  className="h-6 w-6"
                />
                <span className="text-sm font-medium">8.6k</span>
              </button>
              <button className="flex items-center gap-2 text-black hover:text-blue-500 transition-colors">
                <img
                  src="/assets/icons/share.svg"
                  alt="share"
                  className="h-6 w-6"
                />
                <span className="text-sm font-medium">7.2k</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      <HorizontalCarousel />
    </div>
  );
}

export default SocialCard;
