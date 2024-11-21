import type { Meta, StoryObj } from '@storybook/react';
import LoginLogo from '@/components/Layout/Login/LoginLogo';

const meta = {
  title: 'Login/LoginLogo',
  component: LoginLogo,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: 'https://via.placeholder.com/150', // 예시로 사용할 이미지 URL
  },
};
