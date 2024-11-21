import type { Meta, StoryObj } from '@storybook/react';
import NickNameInput from '@/components/Layout/Signup/NickNameInput';

const meta = {
  title: 'Layout/Signup/NickNameInput',
  component: NickNameInput,
  tags: ['autodocs'],
} satisfies Meta<typeof NickNameInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handleClick: () => {},
  },
};
