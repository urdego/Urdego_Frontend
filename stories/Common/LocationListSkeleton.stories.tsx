import LocationListSkeleton from '@/components/Common/Skeleton/LocationListSkeleton';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/Skeleton/LocationListSkeleton',
  component: LocationListSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LocationListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
