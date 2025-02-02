import React, { useState } from "react";
import { Button, SHAPE, SIZE } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import withLayout from "../components/Layout";
import { Drawer, ANCHOR } from "baseui/drawer";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function Preferences() {
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [calendarValue, setCalendarValue] = useState(dayjs());
  const [editingDate, setEditingDate] = useState(null); // Track which date is being edited

  const addPreference = () => {
    if (newPreference.trim() !== "") {
      const newPreferences = newPreference
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const newPreferenceItems = newPreferences.map((preference) => ({
        date: calendarValue.format("YYYY-MM-DD"), // Store the selected date
        text: preference,
        id: Date.now() + Math.random(), // Add a unique ID for each preference
      }));

      setPreferences([...preferences, ...newPreferenceItems]);
      setNewPreference("");
      setIsDrawerOpen(false);
    }
  };

  const deletePreferencesByDate = (date) => {
    setPreferences(preferences.filter((pref) => pref.date !== date));
  };

  const editPreferencesByDate = (date) => {
    setEditingDate(date); // Set the date being edited
    setIsDrawerOpen(true); // Open the drawer for editing
  };

  // Group preferences by date
  const groupedPreferences = preferences.reduce((acc, preference) => {
    const date = preference.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(preference);
    return acc;
  }, {});

  // Sort dates in ascending order
  const sortedDates = Object.keys(groupedPreferences).sort((a, b) =>
    dayjs(a).isBefore(dayjs(b)) ? -1 : 1
  );

  return (
    <div className="flex flex-col min-h-screen p-4 items-center w-full max-w-xs mx-auto">
      {/* Larger Heading */}
      <h1 className="text-4xl font-bold mb-4 text-center text-green-500">
        Preferences
      </h1>

      {/* List of Preferences Grouped by Date */}
      <div className="w-full">
        {sortedDates.map((date) => (
          <div key={date} className="mb-6">
            {/* Date Heading */}
            <h2 className="text-xl font-semibold mb-2 text-green-600">
              {dayjs(date).format("MMMM D, YYYY")}
            </h2>
            {/* Single Container for All Preferences Under This Date */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-100 p-3 rounded-lg mb-2 shadow-md border-l-4 border-green-400"
            >
              {groupedPreferences[date].map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2 last:mb-0"
                >
                  <p className="text-gray-700 truncate w-4/5 text-sm">
                    {item.text}
                  </p>
                </div>
              ))}
              {/* Edit and Delete Buttons */}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => editPreferencesByDate(date)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => deletePreferencesByDate(date)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Add New Preference Button */}
      <div className="fixed bottom-0 w-full flex justify-center">
        <Button
          onClick={() => {
            setEditingDate(null); // Reset editing state
            setIsDrawerOpen(true);
          }}
          shape={SHAPE.pill}
          size={SIZE.large}
          className="bg-green-500 text-white w-70 relative bottom-25"
        >
          Add a New Preference
        </Button>
      </div>

      {/* Drawer for adding/editing preferences */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        anchor={ANCHOR.bottom}
        size="auto"
      >
        <div className="p-4 overflow-y-auto">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateCalendar", "DateCalendar"]}>
              <DemoItem label="Select Date">
                <DateCalendar
                  value={calendarValue}
                  onChange={(newValue) => setCalendarValue(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <Textarea
            value={newPreference}
            onChange={(e) => setNewPreference(e.target.value)}
            placeholder="Write your preference..."
            overrides={{
              Input: {
                style: {
                  height: "50px",
                  resize: "vertical",
                },
              },
            }}
          />
          <div className="flex gap-4 w-full pt-4">
            <Button
              onClick={() => setIsDrawerOpen(false)}
              shape={SHAPE.pill}
              size={SIZE.compact}
              className=" text-white flex-1 text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={addPreference}
              shape={SHAPE.pill}
              size={SIZE.compact}
              className="bg-green-500 text-white flex-1 text-sm"
            >
              Done
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default withLayout(Preferences);
