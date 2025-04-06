import Image from "next/image";
import { FaEdit, FaHeart } from "react-icons/fa";
import React, { useState } from "react";
import MemeEditor from "./MemeEditor";

interface MemeCardProps {
  imageUrl: string;
}

const MemeCard: React.FC<MemeCardProps> = ({ imageUrl }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-xs relative transition-transform duration-300 hover:scale-105">
        {/* Meme Image */}
        <Image
          src={imageUrl}
          alt="Meme Template"
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />

        {/* Buttons */}
        <div className="flex justify-between mt-2">
          {/* Edit Button */}
          <button
            className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
          {/* Heart Button */}
          <button className="text-white bg-red-600 p-2 rounded-full hover:bg-red-700">
            <FaHeart />
          </button>
        </div>
      </div>

      {/* Show Meme Editor */}
      {isEditing && <MemeEditor imageUrl={imageUrl} onClose={() => setIsEditing(false)} />}
    </>
  );
};

export default MemeCard;
