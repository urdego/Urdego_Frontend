import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ReportBottomSheet from '@/components/Common/BottomSheet/ReportBottomSheet';

export default {
  title: 'Common/BottomSheet/ReportBottomSheet',
  component: ReportBottomSheet,
  argTypes: {
    onClose: { action: 'closed' },
  },
} as Meta<typeof ReportBottomSheet>;

const Template: StoryFn<typeof ReportBottomSheet> = (args) => (
  <ReportBottomSheet {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};

export const Closed = Template.bind({});
Closed.args = {
  isOpen: false,
};
