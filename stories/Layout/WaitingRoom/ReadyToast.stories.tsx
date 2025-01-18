import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ReadyToast from '@/components/Common/Toast/ReadyToast';
import { showReadyToast } from '@/components/Common/Toast/ReadyToast';
import { Toaster } from 'react-hot-toast';
import Button from '@/components/Common/Button/Button';

const meta = {
  title: 'Layout/WaitingRoom/ReadyToast',
  component: ReadyToast,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div>
        <Toaster
          position="bottom-center"
          containerStyle={{
            bottom: 80,
          }}
        />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReadyToast>;

export default meta;
type Story = StoryObj<typeof ReadyToast>;

export const Default: Story = {
  args: {
    message: '아직 모든 팀원이 준비되지 않았습니다.',
  },
  render: function Story(args) {
    return (
      <Button
        onClick={() => showReadyToast('아직 모든 팀원이 준비되지 않았습니다.')}
        label="토스트 보기"
        buttonType="purple"
        buttonSize="medium"
        buttonHeight="default"
        styleType="coloredBackground"
        {...args}
      />
    );
  },
};

export const WithCustomMessage: Story = {
  args: {
    message: '게임을 시작하기 위해서는 최소 2명의 플레이어가 필요합니다.',
  },
  render: function Story(args) {
    return (
      <Button
        onClick={() =>
          showReadyToast(
            '게임을 시작하기 위해서는 최소 2명의 플레이어가 필요합니다.'
          )
        }
        label="다른 메시지로 토스트 보기"
        buttonType="purple"
        buttonSize="medium"
        buttonHeight="default"
        styleType="coloredBackground"
        {...args}
      />
    );
  },
};
