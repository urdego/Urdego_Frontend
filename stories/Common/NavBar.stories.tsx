import { Meta, StoryObj } from "@storybook/react";
import NavBar from "@/components/Common/NavBar/NavBar";

const meta = {
  title: "Common/NavBar",
  component: NavBar,
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
