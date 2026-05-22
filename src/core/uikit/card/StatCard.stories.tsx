import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'uikit/card/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: {
    title: '진행 중 계약',
    value: 12,
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {};

export const Highlight: Story = {
  args: { highlight: true, title: '완료 계약', value: 87 },
};

export const Alert: Story = {
  args: { alert: true, title: '연체', value: 3 },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[700px]">
      <StatCard title="전체" value={102} />
      <StatCard title="진행 중" value={12} highlight />
      <StatCard title="연체" value={3} alert />
    </div>
  ),
};
