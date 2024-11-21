import { Meta, StoryObj } from "@storybook/react";
import TopBar from '@/components/Common/TopBar/TopBar';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  argTypes: {
    NavType: {
      control: {
        type: 'select',
        options: ['default', 'other', 'main'],
      },
    },
    label: { control: 'text' },
    backIcon: { control: 'boolean' },
    alarmIcon: { control: 'boolean' },
    friendIcon: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
  args: {
    NavType: 'default',
    label: 'Default Label',
    backIcon: true,
    alarmIcon: false,
    friendIcon: false,
  },
};

export const Other: Story = {
  args: {
    NavType: 'other',
    label: 'Other Label',
    backIcon: true,
    alarmIcon: true,
    friendIcon: true,
  },
};

export const Main: Story = {
  args: {
    NavType: 'main',
    label: '',
    backIcon: false,
    alarmIcon: true,
    friendIcon: true,
  },
};