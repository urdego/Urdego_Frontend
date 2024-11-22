import type { Meta, StoryObj } from '@storybook/react';
import SocialLogin from '@layout/Login/SNSLogos';

const meta = {
  title: 'Components/SocialLogin',
  component: SocialLogin,
  tags: ['autodocs'],
} satisfies Meta<typeof SocialLogin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
