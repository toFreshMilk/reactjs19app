import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';
import { Button } from '@/core/uikit/form/Button';

const meta: Meta<typeof Modal> = {
  title: 'uikit/feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const SingleButton: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-[300px]">
        <Button onPress={() => setOpen(true)}>모달 열기</Button>
        <Modal
          open={open}
          title="저장 완료"
          message="변경 내용이 저장되었습니다."
          onConfirm={() => setOpen(false)}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const DoubleButton: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [result, setResult] = useState<string>('—');
    return (
      <div className="min-h-[300px] space-y-3">
        <Button onPress={() => setOpen(true)}>삭제 확인 모달</Button>
        <div className="text-sm text-slate-600">결과: {result}</div>
        <Modal
          open={open}
          variant="double"
          title="삭제 확인"
          message={
            <>
              정말 삭제하시겠습니까?
              {'\n'}
              이 작업은 되돌릴 수 없습니다.
            </>
          }
          onConfirm={() => {
            setResult('확인');
            setOpen(false);
          }}
          onCancel={() => {
            setResult('취소');
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const CustomLabels: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-[300px]">
        <Button onPress={() => setOpen(true)}>제출 모달</Button>
        <Modal
          open={open}
          variant="double"
          title="계약 제출"
          message="제출하면 더 이상 수정할 수 없습니다."
          confirmText="제출"
          cancelText="더 검토"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
