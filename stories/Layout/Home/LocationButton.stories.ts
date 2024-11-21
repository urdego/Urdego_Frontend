import type { Meta, StoryObj } from '@storybook/react';
import LoactionButton from '@/components/Layout/Home/LocationButton/LocationButton';

const meta = {
  title: 'Layout/Home/LoactionButton',
  component: LoactionButton,
  tags: ['autodocs'],
} satisfies Meta<typeof LoactionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '올린 장소',
    count: 999,
  },
};
