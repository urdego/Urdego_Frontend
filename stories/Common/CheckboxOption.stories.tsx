import { Meta, StoryObj } from '@storybook/react';
import CheckboxOption from '../../components/Common/CheckboxOption/CheckboxOption';

const meta = {
  title: 'Common/CheckboxOption',
  component: CheckboxOption,
  argTypes: {
    label: {
      control: 'text',
      description: '체크박스 옆에 표시될 텍스트',
    },
  },
} satisfies Meta<typeof CheckboxOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '게임이 마음에 들지 않아요.',
  },
};

export const SecondOption: Story = {
  args: {
    label: '이용이 불편하고 장애가 많아요.',
  },
};

export const CustomLabel: Story = {
  args: {
    label: '사용자 지정 라벨',
  },
};
