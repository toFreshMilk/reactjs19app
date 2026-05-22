import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, EmailInput, PasswordInput, SearchInput } from './Input';

const meta: Meta<typeof Input> = {
  title: 'uikit/form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'inline-radio', options: ['slate', 'rose', 'blue'] },
    inputSize: { control: 'inline-radio', options: ['md', 'lg'] },
    shape: { control: 'inline-radio', options: ['md', 'xl'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: '이름',
    placeholder: '홍길동',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: '필수 항목입니다.' },
};

export const Large: Story = {
  args: { inputSize: 'lg', shape: 'xl' },
};

export const Disabled: Story = {
  args: { disabled: true, value: '수정 불가' },
};

export const Email: Story = {
  render: () => <EmailInput label="이메일" placeholder="you@example.com" />,
};

export const Password: Story = {
  render: () => <PasswordInput label="비밀번호" placeholder="********" />,
};

export const Search: Story = {
  render: () => <SearchInput label="검색" placeholder="검색어 입력" />,
};
