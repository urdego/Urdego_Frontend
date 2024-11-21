import type { Meta, StoryObj } from '@storybook/react';
import RoomButton from '@/components/Common/RoomButton/RoomButton';

const meta = {
  title: 'Common/RoomButton',
  component: RoomButton,
  tags: ['autodocs'],
} satisfies Meta<typeof RoomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '방제목',
    hostUser: '유저명',
    groupMemberCount: 3,
    maxMemberCount: 8,
  },
};
