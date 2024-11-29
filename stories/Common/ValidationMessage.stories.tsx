import { Meta, StoryObj } from '@storybook/react';
import ValidationMessage from '@/components/Common/ValidationMessage/ValidationMessage';

const meta = {
  title: 'Common/ValidationMessage',
  component: ValidationMessage,
} satisfies Meta<typeof ValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: '비밀번호는 8자리 이상이어야 합니다.',
  },
};

export const EmailValidation: Story = {
  args: {
    message: '올바른 이메일 형식이 아닙니다.',
  },
};

export const RequiredField: Story = {
  args: {
    message: '필수 입력 항목입니다.',
  },
};
