// @ts-nocheck
import React from "react";
import {
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXXLarge,
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import { Button, SHAPE, SIZE } from "baseui/button";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { VscActivateBreakpoints } from "react-icons/vsc";
import ProgressBar from "@ramonak/react-progress-bar";
import { Notification, KIND } from "baseui/notification";
import { Avatar } from "baseui/avatar";
import { ListHeading } from "baseui/list";

const Dashboard = () => {
  return (
    <div className="container w-full h-full max-w-sm mx-auto">
      <div className="flex flex-col">
        <div className="flex justify-start flex-row items-center gap-x-2">
          <HiOutlineRectangleStack className=" text-green-600" size={20} />
          <ParagraphSmall>You've spent</ParagraphSmall>
        </div>
        <HeadingXXLarge>$1000</HeadingXXLarge>
        <div className="w-full py-1 ">
          <Notification
            kind={KIND.positive}
            overrides={{
              Body: {
                style: ({ $theme }) => ({
                  width: "100%",
                  margin: "0px",
                }),
              },
            }}
          >
            {() => "Saving 20% more than last month"}
          </Notification>{" "}
        </div>
      </div>
      <div className="flex flex-row gap-x-2 mt-2 w-full overflow-scroll">
        <Button
          shape={SHAPE.pill}
          size={SIZE.compact}
          className="gap-x-2"
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                outline: `${$theme.colors.gray200} solid !important`,
                backgroundColor: `${$theme.colors.gray200}`,
                color: `${$theme.colors.black}`,
              }),
            },
          }}
        >
          <MdSearch size={18} /> Search
        </Button>
        <Button
          shape={SHAPE.pill}
          size={SIZE.compact}
          className="gap-x-2"
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                outline: `${$theme.colors.green300} solid`,
                backgroundColor: `${$theme.colors.green400} !important`,
              }),
            },
          }}
        >
          <FaArrowRight size={20} /> Transfers
        </Button>
        <Button shape={SHAPE.pill} size={SIZE.compact}>
          <FaHeart size={20} />
        </Button>
        <Button
          shape={SHAPE.pill}
          size={SIZE.compact}
          className="gap-x-2"
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                outline: `${$theme.colors.gray200} solid`,
                backgroundColor: `${$theme.colors.gray200} !important`,
                color: `${$theme.colors.black}`,
              }),
            },
          }}
        >
          <MdOutlineDocumentScanner size={20} /> Scanner
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-x-1">
            <VscActivateBreakpoints className=" text-primary" size={20} />
            <ParagraphSmall className="text-gray-700">
              Accumulated Points
            </ParagraphSmall>
          </div>
          <ParagraphSmall className="text-gray-700">100 Points</ParagraphSmall>
        </div>
        <div className="mt-2">
          <ProgressBar
            completed={60}
            bgColor="#01c168"
            isLabelVisible={false}
          />
        </div>
      </div>
      <div className="flex flex-row  gap-10 justify-evenly mt-4">
        <div className="flex bg-gray-100 flex-col  px-4 py-4 rounded-xl w-1/2">
          <ParagraphSmall className="text-black">All Operations</ParagraphSmall>
          <ParagraphSmall className="text-gray-700">
            January 2025
          </ParagraphSmall>
          <ParagraphLarge className="mt-3 font-[700]">$1207</ParagraphLarge>
        </div>
        <div className="flex bg-gray-200 flex-col  px-8 py-4 rounded-xl w-1/2">
          <ParagraphSmall className="text-gray-700">Partners</ParagraphSmall>
          <div className="flex flex-row items-center mt-2">
            <Avatar name="Jane Doe" size="scale1000" />
            <Avatar name="SG" size="scale1000" className="-ml-2" />
            <Avatar name="WM" size="scale1000" className="-ml-2" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <HeadingSmall>Today</HeadingSmall>
        <ListHeading
          heading="Walmart"
          subHeading="Grocery"
          endEnhancer={() => (
            <div className="">
              <div className="text-lg text-red-500">- 20.35$</div>
            </div>
          )}
          overrides={{
            Content: {
              style: ({ $theme }) => ({
                padding: "0px",
                marginLeft: "0px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }),
            },
            SubHeadingContainer: {
              style: ({ $theme }) => ({
                color: `${$theme.colors.gray300}`,
                fontSize: "14px",
                margin: "0px",
                padding: "0px",
              }),
            },
          }}
          maxLines={1}
        />
        <ListHeading
          heading="Marche Newon"
          subHeading="Grocery"
          endEnhancer={() => (
            <div className="">
              <div className="text-lg text-green-600">+50.35$</div>
            </div>
          )}
          overrides={{
            Content: {
              style: ({ $theme }) => ({
                padding: "0px",
                marginLeft: "0px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }),
            },
            SubHeadingContainer: {
              style: ({ $theme }) => ({
                color: `${$theme.colors.gray400}`,
                fontSize: "14px",
                margin: "0px",
              }),
            },
          }}
          maxLines={1}
        />
      </div>
    </div>
  );
};

// export default withLayout(Dashboard);
export default Dashboard;
