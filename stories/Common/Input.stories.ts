import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/Common/Input/Input";

const meta = {
  title: "Common/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalContent: Story = {
  args: {
    title: "아이디",
    placeholder: "아이디를 입력해주세요",
    isButton: false,
  },
};

export const HiddenPassword: Story = {
  args: {
    title: "비밀번호",
    placeholder: "8자 이상의 문자 입력 (숫자, 영어, 특수문자 포함)",
    isButton: true,
    isHiddenPassword: true,
    handleClick: () => {},
  },
};

export const OpenPassword: Story = {
  args: {
    title: "비밀번호",
    placeholder: "8자 이상의 문자 입력 (숫자, 영어, 특수문자 포함)",
    isButton: true,
    isHiddenPassword: false,
    handleClick: () => {},
  },
};
