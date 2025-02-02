import React, { useState } from "react";
import { Button, SHAPE, SIZE } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import withLayout from "../components/Layout";

function Preferences() {
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState("");
  const [showMemo, setShowMemo] = useState(false);

  const addPreference = () => {
    if (newPreference.trim() !== "") {
      const newPreferences = newPreference
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter((item) => item !== "");

      setPreferences([...preferences, ...newPreferences]);
      setNewPreference("");
      setShowMemo(false);
    }
  };

  const deletePreference = (index) => {
    setPreferences(preferences.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen p-4 items-center w-full max-w-xs mx-auto">
      {/* Larger Heading */}
      <h1 className="text-4xl font-bold mb-4 text-center text-green-500">Preferences</h1>

      {/* List of Preferences */}
      <div className="w-full">
        {preferences.map((preference, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2 shadow-md border-l-4 border-green-400"
          >
            <p className="text-gray-700 truncate w-4/5 text-sm">{preference}</p>
            <button
              onClick={() => deletePreference(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Add New Preference Button */}
      <div className="fixed bottom-0 w-full flex justify-center">
        <Button
          onClick={() => setShowMemo(true)}
          shape={SHAPE.pill}
          size={SIZE.large}
          className="bg-green-500 text-white w-70 relative bottom-25"
        >
          Add a New Preference
        </Button>
      </div>

      {/* Memo Popup */}
      {showMemo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-green-400 bg-gradient-to-t" 
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-11/12 sm:w-96 bg-white p-6 rounded-lg shadow-xl flex flex-col items-center border border-gray-300"
          >
            <Textarea
              value={newPreference}
              onChange={(e) => setNewPreference(e.target.value)}
              placeholder="Write your preference..."
              overrides={{
                Input: {
                  style: {
                    height: "60px", 
                    resize: "vertical",
                  },
                },
              }}
              className="mb-4 w-full"
            />
            <div className="flex gap-4 w-full pt-4">
              <Button
                onClick={() => setShowMemo(false)}
                shape={SHAPE.pill}
                size={SIZE.compact} // Smaller button size
                className="bg-gray-500 text-white flex-1 text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={addPreference}
                shape={SHAPE.pill}
                size={SIZE.compact} // Smaller button size
                className="bg-green-500 text-white flex-1 text-sm"
              >
                Done
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default withLayout(Preferences);