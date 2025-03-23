import React from "react";

const History = ({ viewedItems, clearHistory }) => (
  <div className="w-full bg-gray-800 text-white p-4">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-yellow-400">History</h3>
      {viewedItems.length > 0 ? (
        <button
          onClick={clearHistory}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition"
        >
          Clear History
        </button>
      ) : (
        ""
      )}
    </div>

    {viewedItems.length > 0 ? (
      <>
        <ul className="mt-4 space-y-2">
          {viewedItems.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-between p-3 bg-gray-700 rounded-lg"
            >
              <div className="text-white text-sm">{item.breedName}</div>
              <img
                src={item.imageUrl}
                alt={item.breedName}
                className="w-20 h-20 object-cover rounded-lg mt-2"
              />
            </li>
          ))}
        </ul>
      </>
    ) : (
      <p className="mt-4 text-sm text-white">No cats viewed yet.</p>
    )}
  </div>
);

export default History;
