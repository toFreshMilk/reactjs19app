import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import Modal from './Modal';

/**
 * 고급 활용 데모: 스토리를 "자동 재생되는 상호작용 테스트"로 만든다.
 * - play  : 사용자의 클릭/키입력을 코드로 재생
 * - fn()  : 콜백 호출을 기록하는 spy (Actions 패널 + assert)
 * - expect: 호출 여부/횟수를 검증 → Interactions 패널에서 PASS/FAIL 표시
 */
const meta: Meta<typeof Modal> = {
  title: 'uikit/feedback/Modal Interactions',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '`play` 함수로 사용자 상호작용을 자동 재생하고 `expect`로 콜백 호출을 검증하는 상호작용 테스트 예시. ' +
          '하단 **Interactions** 패널에서 단계별 재생·되감기가 가능하다.',
      },
    },
  },
  args: {
    open: true,
    title: '계약 제출',
    message: '제출하면 더 이상 수정할 수 없습니다.',
    confirmText: '제출',
    cancelText: '취소',
    // fn() = 호출을 기록하는 spy. Actions 패널에 찍히고 play 안에서 assert 할 수 있다.
    onConfirm: fn(),
    onCancel: fn(),
    onClose: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['single', 'double'], table: { category: '동작' } },
    closeOnBackdrop: { control: 'boolean', table: { category: '동작' } },
    confirmText: { control: 'text', table: { category: '라벨' } },
    // cancelText 는 variant=double 일 때만 의미 있으므로 그 때만 컨트롤 노출
    cancelText: { control: 'text', table: { category: '라벨' }, if: { arg: 'variant', eq: 'double' } },
    onConfirm: { table: { category: '이벤트' } },
    onCancel: { table: { category: '이벤트' } },
    onClose: { table: { category: '이벤트' } },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/** 확인 버튼 클릭 → onConfirm 이 정확히 1회 호출되는지 검증 */
export const ConfirmFlow: Story = {
  args: { variant: 'single' },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('확인 버튼 클릭', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '제출' }));
    });
    await step('onConfirm 콜백 1회 호출 검증', async () => {
      await expect(args.onConfirm).toHaveBeenCalledTimes(1);
    });
  },
};

/** 취소만 누르면 onCancel 만 호출되고 onConfirm 은 호출되지 않아야 한다 */
export const CancelFlow: Story = {
  args: { variant: 'double' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '취소' }));
    await expect(args.onCancel).toHaveBeenCalledTimes(1);
    await expect(args.onConfirm).not.toHaveBeenCalled();
  },
};

/** Escape 키 → onClose 호출 (키보드 상호작용 + 비동기 대기) */
export const EscapeToClose: Story = {
  args: { variant: 'single' },
  play: async ({ args }) => {
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(args.onClose).toHaveBeenCalledTimes(1));
  },
};
