import type { Meta, StoryObj } from '@storybook/react';
import SettingButton from '@components/Layout/MyPage/SettingButton';

const meta = {
  title: 'MyPage/SettingButton',
  component: SettingButton,
  tags: ['autodocs'],
} satisfies Meta<typeof SettingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '비밀번호 변경',
    onClick: () => alert('Button clicked!'),
  },
};
