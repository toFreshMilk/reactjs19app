import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '@/core/uikit/form/Button';

/**
 * 데모용 컴포넌트: 버튼에 "진짜" 비동기 로직이 붙어 있다.
 * 클릭하면 '저장중' 상태로 바뀌고 → 0.5초(API 호출 흉내) 대기 → '완료'로 전환된다.
 * 이 0.5초 동안 버튼은 실제로 disabled 가 되고, 끝나면 onSaved 콜백이 호출된다.
 */
function AsyncSaveDemo({ onSaved }: { onSaved: () => void }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');

  const handleSave = async () => {
    setStatus('saving');
    await new Promise((resolve) => setTimeout(resolve, 500)); // ← 진짜 비동기 지연
    setStatus('done');
    onSaved();
  };

  const label = status === 'saving' ? '저장중' : '저장';
  const statusText = status === 'idle' ? '대기' : status === 'saving' ? '저장중' : '완료';

  return (
    <div className="space-y-3">
      <Button tone="blue" disabled={status === 'saving'} onPress={handleSave}>
        {label}
      </Button>
      <div className="text-sm text-slate-600">상태: {statusText}</div>
    </div>
  );
}

const meta: Meta<typeof AsyncSaveDemo> = {
  title: 'examples/Async Button',
  component: AsyncSaveDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '버튼에 진짜 비동기(0.5초 지연) 로직이 붙은 데모. play 함수에서 클릭 → 로딩 상태가 실제로 나타나고 → ' +
          'waitFor 로 완료 상태 전환을 기다려 검증한다. 컴포넌트의 비동기 로직이 실제로 실행됨을 보여준다.',
      },
    },
  },
  args: {
    onSaved: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof AsyncSaveDemo>;

export const SaveFlow: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('클릭 전: 대기 상태', async () => {
      await expect(canvas.getByText('상태: 대기')).toBeInTheDocument();
    });

    await step('저장 버튼 클릭', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '저장' }));
    });

    await step('클릭 직후: 비동기가 진짜 돌아 로딩 상태가 나타남', async () => {
      // 0.5초 대기 중 → 버튼이 실제로 비활성화되고 라벨이 바뀐다
      await expect(canvas.getByRole('button')).toBeDisabled();
      await expect(canvas.getByText('상태: 저장중')).toBeInTheDocument();
    });

    await step('0.5초 후: 완료로 전환될 때까지 waitFor 로 대기', async () => {
      await waitFor(() => expect(canvas.getByText('상태: 완료')).toBeInTheDocument());
      await expect(canvas.getByRole('button')).toBeEnabled();
      await expect(args.onSaved).toHaveBeenCalledTimes(1);
    });
  },
};
