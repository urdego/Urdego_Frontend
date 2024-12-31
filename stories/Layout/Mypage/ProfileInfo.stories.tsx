import type { Meta, StoryObj } from '@storybook/react';
import ProfileInfo from '@/components/Layout/MyPage/ProfileInfo';

const meta = {
  title: 'MyPage/ProfileInfo',
  component: ProfileInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
