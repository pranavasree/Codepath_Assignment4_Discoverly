import React from "react";

const Card = ({ data, bannedItems, setBannedItems }) => {
  const { imageUrl, breedName, breedWeight, breedTemperament, lifeSpan } = data;

  const handleBanItem = (item) => {
    if (!bannedItems.includes(item)) {
      setBannedItems([...bannedItems, item]);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-xl w-full space-y-4 text-black mt-6">
      <h3 className="text-2xl font-bold">{breedName}</h3>
      <div className="flex items-center justify-center gap-2">
        <p
          className="flex flex-wrap justify-center gap-2 cursor-pointer bg-yellow-600 text-white rounded-full px-3 py-1"
          onClick={() => handleBanItem(breedWeight)}
        >
          {breedWeight}
        </p>
        <p
          className="flex flex-wrap justify-center gap-2 cursor-pointer bg-yellow-600 text-white rounded-full px-3 py-1"
          onClick={() => handleBanItem(breedTemperament)}
        >
          {breedTemperament}
        </p>
        <p
          className="flex flex-wrap justify-center gap-2 cursor-pointer bg-yellow-600 text-white rounded-full px-3 py-1"
          onClick={() => handleBanItem(breedName)}
        >
          {breedName}
        </p>
        <p
          className="flex flex-wrap justify-center gap-2 cursor-pointer bg-yellow-600 text-white rounded-full px-3 py-1"
          onClick={() => handleBanItem(lifeSpan)}
        >
          {lifeSpan}
        </p>
      </div>
      <img
        src={imageUrl}
        alt="Cat"
        className="w-60 h-60 object-cover mx-auto rounded-lg"
      />
    </div>
  );
};

export default Card;
