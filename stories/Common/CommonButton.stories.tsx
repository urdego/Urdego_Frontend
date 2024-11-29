import Button from '../../components/Common/Button/Button';
import PlusIcon from '../../styles/Icon/Plus.svg';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/CommonButton',
  component: Button,
  argTypes: {
    buttonType: {
      control: 'select',
      options: ['fill', 'outline'],
    },
    buttonSize: {
      control: 'select',
      options: ['small', 'large'],
    },
    buttonHeight: {
      control: 'select',
      options: ['default', 'short'],
    },
    label: {
      control: 'text',
    },
    icon: {
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // buttonType: "fill",
    buttonSize: 'large',
    label: '기본 버튼',
  },
};

export const Outline: Story = {
  args: {
    // buttonType: 'outline',
    buttonSize: 'large',
    label: '테두리 버튼',
  },
};

export const Small: Story = {
  args: {
    // buttonType: 'fill',
    buttonSize: 'small',
    label: '작은 버튼',
  },
};

export const Large: Story = {
  args: {
    // buttonType: 'fill',
    buttonSize: 'large',
    label: '큰 버튼',
  },
};

export const WithIcon: Story = {
  args: {
    // buttonType: 'fill',
    buttonSize: 'large',
    label: '장소 추가',
    icon: PlusIcon,
  },
};

export const WriteButton: Story = {
  args: {
    // buttonType: 'fill',
    buttonSize: 'large',
    label: '작성완료',
  },
};

export const SmallOutline: Story = {
  args: {
    // buttonType: 'outline',
    buttonSize: 'small',
    label: '취소하기',
  },
};

export const SmallFill: Story = {
  args: {
    // buttonType: 'fill',
    buttonSize: 'small',
    label: '선택하기',
  },
};
