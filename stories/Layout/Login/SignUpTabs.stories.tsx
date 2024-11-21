// SignupTabs.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import {
  TabContainer,
  TabDivider,
  TabItem,
} from '@layout/Login/SignUpTabs.styles';

// Create a simplified version of SignupTabs for Storybook
const SignupTabsPreview = () => {
  return (
    <TabContainer>
      <TabItem>아이디 찾기</TabItem>
      <TabDivider />
      <TabItem>비밀번호 찾기</TabItem>
      <TabDivider />
      <TabItem>회원가입</TabItem>
    </TabContainer>
  );
};

const meta: Meta<typeof SignupTabsPreview> = {
  title: 'Components/SignupTabs',
  component: SignupTabsPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignupTabsPreview>;

export const Default: Story = {};

export const WithDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          background: '#f5f5f5',
          padding: '2rem',
          borderRadius: '8px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
