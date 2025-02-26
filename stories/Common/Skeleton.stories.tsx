import Skeleton from '@/components/Common/Skeleton/Skeleton';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/Skeleton/Basic',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = {
  args: {
    width: 60,
    height: 60,
  },
};

export const Text: Story = {
  args: {
    width: 202,
    height: 21,
  },
};
