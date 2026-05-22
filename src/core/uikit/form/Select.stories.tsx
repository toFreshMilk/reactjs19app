import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const SAMPLE_OPTIONS = [
  { label: '대기', value: 'pending' },
  { label: '진행 중', value: 'active' },
  { label: '완료', value: 'done' },
  { label: '취소(선택 불가)', value: 'canceled', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'uikit/form/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'inline-radio', options: ['slate', 'rose', 'blue'] },
    selectSize: { control: 'inline-radio', options: ['md', 'lg'] },
    shape: { control: 'inline-radio', options: ['md', 'xl'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: '상태',
    options: SAMPLE_OPTIONS,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Blue: Story = {
  args: { tone: 'blue', defaultValue: 'active' },
};

export const Large: Story = {
  args: { selectSize: 'lg', shape: 'xl' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'done' },
};

export const NoLabel: Story = {
  args: { label: undefined },
};

export const ToneMatrix: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['slate', 'rose', 'blue'] as const).map((t) => (
        <Select key={t} label={t} tone={t} options={SAMPLE_OPTIONS} />
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('pending');
    return (
      <div className="space-y-3">
        <Select
          label="상태 선택"
          options={SAMPLE_OPTIONS}
          value={value}
          onValueChange={(next) => setValue(next)}
        />
        <div className="text-sm text-slate-600">선택된 값: {value}</div>
      </div>
    );
  },
};
