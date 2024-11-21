import type { Meta, StoryObj } from '@storybook/react';
import Loaction from '@/components/Layout/Home/Location/Location';

const meta = {
  title: 'Layout/Home/Loaction',
  component: Loaction,
  tags: ['autodocs'],
} satisfies Meta<typeof Loaction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '올린 장소',
    count: 999,
  },
};
