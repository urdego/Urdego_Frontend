import type { Meta, StoryObj } from '@storybook/react';
import PositionCard from '@/components/Layout/WaitingRoom/PositionCard';

const meta = {
  title: 'Components/WaitingRoom/PositionCard',
  component: PositionCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'purple',
      values: [{ name: 'purple', value: '#7A5CF5' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'number', min: 1, max: 99 },
      description: '유저 레벨',
    },
    username: {
      control: 'text',
      description: '유저 닉네임',
    },
    isHost: {
      control: 'boolean',
      description: '방장 여부',
    },
    isReady: {
      control: 'boolean',
      description: '준비 완료 여부',
    },
    isEmpty: {
      control: 'boolean',
      description: '빈 카드 여부',
    },
  },
} satisfies Meta<typeof PositionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 1,
    username: '닉네임',
    isHost: false,
    isReady: false,
    isEmpty: false,
  },
};

export const WithHost: Story = {
  args: {
    level: 15,
    username: '방장닉네임',
    isHost: true,
    isReady: false,
    isEmpty: false,
  },
};

export const Empty: Story = {
  args: {
    isEmpty: true,
  },
};
