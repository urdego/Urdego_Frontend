import type { Meta, StoryObj } from '@storybook/react';
import ChannelButton from '@/components/Layout/Home/ChannelButton/ChannelButton';

const meta = {
  title: 'Layout/Home/ChannelButton',
  component: ChannelButton,
  tags: ['autodocs'],
} satisfies Meta<typeof ChannelButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LongChannel: Story = {
  args: {
    title: '그룹 게임',
  },
};

export const ShortChannel: Story = {
  args: {
    title: '랭킹 게임',
  },
};
