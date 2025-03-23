import React from "react";

const BanList = ({ bannedItems, setBannedItems, clearBanList }) => {
  const handleRemoveBanItem = (item) => {
    const newBannedItems = bannedItems.filter(
      (bannedItem) => bannedItem !== item
    );
    setBannedItems(newBannedItems); // Update the banned items state
  };

  return (
    <div className="w-full bg-gray-800 text-white p-6 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-yellow-400">Ban List</h3>
        {bannedItems.length > 0 ? (
          <button
            onClick={clearBanList}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition "
          >
            Clear Ban List
          </button>
        ) : (
          ""
        )}
      </div>

      <p className="text-sm">Click on an attribute to ban it</p>
      {bannedItems.length > 0 ? (
        <>
          <ul className="mt-4 space-y-2">
            {bannedItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-900 p-2 rounded-lg hover:bg-gray-700"
              >
                <span className="text-sm text-yellow-500">{item}</span>
                <button
                  className="ml-2 text-white text-xs bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleRemoveBanItem(item)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-4 text-sm">No items banned yet.</p>
      )}
    </div>
  );
};

export default BanList;
