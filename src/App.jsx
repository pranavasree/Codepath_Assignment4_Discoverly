import React, { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import Header from "./components/Header";
import BanList from "./components/BanList";
import History from "./components/History"; // Import History component

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bannedItems, setBannedItems] = useState([]);
  const [viewedItems, setViewedItems] = useState([]); // History of viewed items

  const fetchData = async () => {
    setLoading(true);

    try {
      // Fetch random cat image with breed ID
      const imageResponse = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1"
      );
      const imageData = await imageResponse.json();
      console.log(imageData);

      // Fetch breeds list
      const breedResponse = await fetch(
        "https://api.thecatapi.com/v1/breeds?limit=100&page=0"
      );
      const breedData = await breedResponse.json();
      console.log(breedData);

      // Combine the image and breed data
      const breed = breedData[Math.floor(Math.random() * breedData.length)];

      const combinedData = {
        imageUrl: imageData[0].url,
        breedName: breed ? breed.name : "Unknown",
        breedWeight: breed ? breed.weight.metric : "No weight available",
        breedTemperament: breed
          ? breed.temperament.split(",")[0].trim()
          : "No temperament available",
        lifeSpan: breed ? breed.life_span : "No life Span available",
      };

      // Only set data if it doesn't match any banned attributes
      const isBanned = bannedItems.some((item) => {
        return (
          combinedData.breedName.toLowerCase().includes(item.toLowerCase()) ||
          combinedData.breedWeight.toLowerCase().includes(item.toLowerCase()) ||
          combinedData.breedTemperament
            .toLowerCase()
            .includes(item.toLowerCase()) ||
          combinedData.lifeSpan.toLowerCase().includes(item.toLowerCase())
        );
      });

      if (!isBanned) {
        setData(combinedData);
        // Add the current cat to the viewed items history
        setViewedItems((prevViewedItems) => {
          // Prevent duplicates in the history
          const isAlreadyInHistory = prevViewedItems.some(
            (item) => item.breedName === combinedData.breedName
          );
          return isAlreadyInHistory
            ? prevViewedItems
            : [...prevViewedItems, combinedData];
        });
      } else {
        fetchData(); // Recursively fetch a new cat if the current one is banned
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-row bg-[url('/path-to-cats-background.jpg')] bg-cover">
      {/* Left Section for History, Full screen height */}
      <div className="w-1/4 bg-gray-800 text-white p-4 h-screen overflow-y-auto">
        <History
          viewedItems={viewedItems}
          clearHistory={() => setViewedItems([])} // Pass clearHistory function to History
        />
      </div>

      {/* Center Section for Card */}
      <div className="flex-grow flex flex-col items-center justify-center bg-black bg-opacity-60 text-white px-4">
        <Header />
        <Button onClick={fetchData} text="🐱 Fetch Random Cat" />
        {loading && <p>Loading...</p>}
        {data && (
          <Card
            data={data}
            bannedItems={bannedItems}
            setBannedItems={setBannedItems}
          />
        )}
      </div>

      {/* Right Section for BanList */}
      <div className="w-1/4 bg-gray-700 text-white p-4">
        <BanList
          bannedItems={bannedItems}
          setBannedItems={setBannedItems}
          clearBanList={() => setBannedItems([])} // Pass clearBanList function to BanList
        />
      </div>
    </div>
  );
};

export default App;
