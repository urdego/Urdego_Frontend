import type { Meta, StoryObj } from '@storybook/react';
import SmallButton from '@/components/Layout/MyPage/SmallButton';

const meta = {
  title: 'MyPage/SmallButton',
  component: SmallButton,
  tags: ['autodocs'],
} satisfies Meta<typeof SmallButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => alert('Button clicked!'),
    children: 'Click Me',
  },
};
