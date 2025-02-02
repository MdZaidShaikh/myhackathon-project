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
    <div className="flex flex-col items-center">
      {/* Profile Section */}
      <Card
        overrides={{
          Root: {
            style: {
              width: "100%",
              maxWidth: "4xl",
              marginTop: "1.5rem",
              padding: "1.5rem",
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
          Premium User
        </Tag>
        <p className="text-gray-500 mt-2">Spent this week:</p>
        <p className="text-2xl font-bold text-green-500">
          ${spending.toFixed(2)}
        </p>
        <ProgressBar
          value={(spending / 2000) * 100}
          overrides={{ BarProgress: { style: { backgroundColor: "#34D399" } } }}
        />
      </Card>

      {/* Tabs Section */}
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => setActiveKey(String(activeKey))}
        overrides={{
          Root: {
            style: { width: "100%", maxWidth: "4xl", marginTop: "1.5rem" },
          },
        }}
      >
        <Tab title="Transactions">
          <Card
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  marginTop: "1rem",
                  padding: "1rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                },
              },
            }}
          >
            <h4 className="text-lg font-semibold mb-4">Transaction History</h4>
            <div className="space-y-2">
              <ListItem>
                <ListItemLabel>Groceries - $120</ListItemLabel>
              </ListItem>
              <ListItem>
                <ListItemLabel>Electricity Bill - $60</ListItemLabel>
              </ListItem>
              <ListItem>
                <ListItemLabel>Gym Membership - $45</ListItemLabel>
              </ListItem>
            </div>
          </Card>
        </Tab>
        <Tab title="Spending Breakdown">
          <Card
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  marginTop: "1rem",
                  padding: "1rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                },
              },
            }}
          >
            <h4 className="text-lg font-semibold mb-4">Spending Breakdown</h4>
            <div className="w-full max-w-xs mx-auto">
              <Doughnut data={spendingData} />
            </div>
          </Card>
        </Tab>
        <Tab title="Rewards">
          <Card
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  marginTop: "1rem",
                  padding: "1rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                },
              },
            }}
          >
            <h4 className="text-lg font-semibold mb-4">Rewards & Offers</h4>
            <div className="space-y-2">
              <ListItem>
                <ListItemLabel>10% Cashback on Shopping</ListItemLabel>
              </ListItem>
              <ListItem>
                <ListItemLabel>Free Gym Membership</ListItemLabel>
              </ListItem>
            </div>
            <h4 className="text-lg font-semibold mt-6 mb-4">
              Rewards Progress
            </h4>
            <div className="w-full">
              <Bar data={rewardsData} options={{ responsive: true }} />
            </div>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default withLayout(ProfilePage);
