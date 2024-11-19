import type { Meta, StoryObj } from "@storybook/react";
import NickNameInput from "@/app/signup/components/NickNameInput";

const meta = {
  title: "Input/NickNameInput",
  component: NickNameInput,
  tags: ["autodocs"],
} satisfies Meta<typeof NickNameInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handleClick: () => {},
  },
};
