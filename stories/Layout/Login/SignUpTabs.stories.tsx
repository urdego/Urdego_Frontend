import { Meta, StoryObj } from '@storybook/react';
import SignupTabs from '@/components/Layout/Login/SignUpTabs';

const meta = {
  title: 'Common/SignupTabs',
  component: SignupTabs,
} satisfies Meta<typeof SignupTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleTabClick: (tab) => {
      console.log(`Selected tab: ${tab}`);
    },
  },
};
