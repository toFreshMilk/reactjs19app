import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'uikit/form/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'outline', 'ghost'] },
    tone: { control: 'inline-radio', options: ['slate', 'blue', 'rose', 'amber'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'icon'] },
    shape: { control: 'inline-radio', options: ['lg', 'xl'] },
    align: { control: 'inline-radio', options: ['center', 'start'] },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'solid',
    tone: 'slate',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const PrimaryBlue: Story = {
  args: { tone: 'blue', children: '확인' },
};

export const Outline: Story = {
  args: { variant: 'outline', tone: 'blue', children: '취소' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', tone: 'rose', children: '삭제' },
};

export const Danger: Story = {
  args: { tone: 'rose', children: '계정 삭제' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, tone: 'blue', children: '로그인' },
};

export const Disabled: Story = {
  args: { disabled: true, children: '비활성' },
};

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button tone="slate">Slate</Button>
      <Button tone="blue">Blue</Button>
      <Button tone="rose">Rose</Button>
      <Button tone="amber">Amber</Button>
    </div>
  ),
};

export const VariantMatrix: Story = {
  render: () => (
    <div className="space-y-3">
      {(['solid', 'outline', 'ghost'] as const).map((v) => (
        <div key={v} className="flex flex-wrap gap-2">
          <span className="w-16 text-xs text-slate-500 self-center">{v}</span>
          <Button variant={v} tone="slate">Slate</Button>
          <Button variant={v} tone="blue">Blue</Button>
          <Button variant={v} tone="rose">Rose</Button>
          <Button variant={v} tone="amber">Amber</Button>
        </div>
      ))}
    </div>
  ),
};
