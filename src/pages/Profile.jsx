import React, { useState } from "react";
import { Card } from "baseui/card";
import { Avatar } from "baseui/avatar";
import { Button, KIND } from "baseui/button";
import { ProgressBar } from "baseui/progress-bar";
import { ListItem, ListItemLabel } from "baseui/list";
import { StatefulPopover } from "baseui/popover";
import { Tag } from "baseui/tag";
import { Tabs, Tab } from "baseui/tabs-motion";
import { Input } from "baseui/input";
import {
  FaPlus,
  FaChartLine,
  FaHeart,
  FaQrcode,
  FaCog,
  FaWallet,
  FaGift,
  FaDumbbell,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import withLayout from "../components/Layout";
import { HeadingMedium, HeadingSmall } from "baseui/typography";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
function ProfilePage() {
  const [spending, setSpending] = useState(1000);
  const [points, setPoints] = useState(69);
  const [activeKey, setActiveKey] = useState("0");

  // Doughnut Chart Data (Spending Breakdown)
  const spendingData = {
    labels: ["Groceries", "Entertainment", "Utilities", "Shopping"],
    datasets: [
      {
        label: "Spending",
        data: [300, 150, 200, 350],
        backgroundColor: ["#34D399", "#60A5FA", "#FBBF24", "#F87171"],
        borderWidth: 0,
      },
    ],
  };

  // Bar Chart Data (Rewards Progress)
  const rewardsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Points Earned",
        data: [20, 35, 40, 50, 60, 69],
        backgroundColor: "#34D399",
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto">
      {/* Profile Section */}
      <Card
        overrides={{
          Root: {
            style: {
              width: "100%",
              maxWidth: "4xl",
              borderRadius: "1rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              textAlign: "center",
            },
          },
        }}
      >
        <Avatar name="Achraf" size="scale1400" />
        <h3 className="text-lg font-semibold mt-2">Achraf</h3>
        <Tag closeable={false} variant="solid" kind="positive">
          Best Spender
        </Tag>
        <Tag closeable={false} variant="solid" kind="positive">
          Honorable
        </Tag>
        <Tag closeable={false} variant="solid" kind="positive">
          Money Maker
        </Tag>
        <p className="text-gray-500 mt-2 text-sm">Money Score</p>
        <p className="text-2xl font-bold text-green-500">1400/2000</p>
        <ProgressBar
          value={(spending / 2000) * 100}
          overrides={{ BarProgress: { style: { backgroundColor: "#34D399" } } }}
        />
      </Card>

      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => setActiveKey(String(activeKey))}
        overrides={{
          Root: {
            style: { width: "100%", maxWidth: "4xl", marginTop: "1.5rem" },
          },
        }}
      >
        <Tab title="Rewards Unlocked">
          <div className="space-y-2 mb-5">
            <ListItem>
              <FaGift className=" mr-2" />
              <ListItemLabel>10% Cashback on Walmart</ListItemLabel>
            </ListItem>
            <ListItem>
              <FaHeart className="text-red-500 mr-2" />
              <ListItemLabel>Free Gym Membership </ListItemLabel>
            </ListItem>
          </div>
          <HeadingMedium>Budget Breakdown </HeadingMedium>
          <div className="w-full my-4">
            <Bar data={rewardsData} options={{ responsive: true }} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default withLayout(ProfilePage);
