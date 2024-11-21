import type { Meta, StoryObj } from '@storybook/react';
import Channel from '@/components/Layout/Home/Channel/Channel';

const meta = {
  title: 'Layout/Home/Channel',
  component: Channel,
  tags: ['autodocs'],
} satisfies Meta<typeof Channel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LongChannel: Story = {
  args: {
    title: '게임1',
    height: 'long',
  },
};

export const ShortChannel: Story = {
  args: {
    title: '게임2',
    height: 'short',
  },
};
