import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ReadyToast from '@/components/Common/Toast/ReadyToast';
import toast from 'react-hot-toast';

const meta = {
  title: 'Layout/WaitingRoom/ReadyToast',
  component: ReadyToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <button onClick={() => toast('아직 모든 팀원이 준비되지 않았습니다.')}>
          Show Toast
        </button>
      </div>
    ),
  ],
} satisfies Meta<typeof ReadyToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
