import React, { useState } from "react";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Card, StyledBody } from "baseui/card";
import { Tag } from "baseui/tag";
import Tesseract from "tesseract.js";

const FlyerSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bestDeal, setBestDeal] = useState(null);
  const [flyers, setFlyers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle image upload and OCR processing
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setIsLoading(true);
    const newFlyers = [];

    for (let file of files) {
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m), // Log OCR progress
      });

      newFlyers.push({
        image: URL.createObjectURL(file), // Store image URL for display
        text: result.data.text, // Store extracted text
      });
    }

    setFlyers(newFlyers);
    setIsLoading(false);
  };

  // Search for the best deal in the extracted text
  const handleSearch = () => {
    if (!searchTerm.trim() || !flyers.length) {
      setBestDeal(null);
      return;
    }

    let bestDealFound = null;

    flyers.forEach((flyer) => {
      const lines = flyer.text.split("\n");
      lines.forEach((line) => {
        if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
          // Extract price using a simple regex (e.g., $2.50 or 2.50)
          const priceMatch = line.match(/\$\d+\.\d+/); // Match prices like $2.50
          if (priceMatch) {
            const price = parseFloat(priceMatch[0].replace("$", ""));
            if (!bestDealFound || price < bestDealFound.price) {
              bestDealFound = {
                item: searchTerm,
                price,
                shop: `Flyer Image`, // You can replace this with a shop name if available
                image: flyer.image, // Show the flyer image
              };
            }
          }
        }
      });
    });

    setBestDeal(bestDealFound);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Flyer Search</h1>

      {/* Image Upload */}
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </div>

      {/* Search Input */}
      <div className="w-full max-w-md mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an item (e.g., Apples)"
          clearOnEscape
          endEnhancer={
            <Button onClick={handleSearch} kind="primary" isLoading={isLoading}>
              Search
            </Button>
          }
        />
      </div>

      {/* Display Best Deal */}
      {bestDeal ? (
        <Card
          overrides={{
            Root: {
              style: { width: "100%", maxWidth: "28rem", marginTop: "1.5rem" },
            },
          }}
        >
          <StyledBody>
            <h2 className="text-xl font-semibold mb-2">Best Deal Found</h2>
            <p className="text-lg">
              <strong>Item:</strong> {bestDeal.item}
            </p>
            <p className="text-lg">
              <strong>Price:</strong> ${bestDeal.price.toFixed(2)}
            </p>
            <p className="text-lg">
              <strong>Shop:</strong>{" "}
              <Tag closeable={false} kind="positive">
                {bestDeal.shop}
              </Tag>
            </p>
            <img
              src={bestDeal.image}
              alt="Flyer"
              className="mt-4 rounded-lg shadow-md"
            />
          </StyledBody>
        </Card>
      ) : (
        searchTerm && (
          <Card
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  maxWidth: "28rem",
                  marginTop: "1.5rem",
                },
              },
            }}
          >
            <StyledBody>
              <p className="text-lg text-gray-600">
                No deals found for "{searchTerm}".
              </p>
            </StyledBody>
          </Card>
        )
      )}

      {/* Display Uploaded Flyers */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Uploaded Flyers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flyers.map((flyer, index) => (
            <Card
              key={index}
              overrides={{ Root: { style: { width: "100%" } } }}
            >
              <StyledBody>
                <img
                  src={flyer.image}
                  alt={`Flyer ${index + 1}`}
                  className="rounded-lg shadow-md"
                />
                <pre className="mt-4 text-sm text-gray-600 overflow-auto">
                  {flyer.text}
                </pre>
              </StyledBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlyerSearch;
