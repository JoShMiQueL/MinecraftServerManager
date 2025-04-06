import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { FontSizeOption, FontSizeSelectorProps } from '@/types/log-console';

const fontSizes: readonly FontSizeOption[] = [
  { value: 'xs', label: 'Small' },
  { value: 'sm', label: 'Medium' },
  { value: 'base', label: 'Large' }
] as const;

export function FontSizeSelector({ fontSize, setFontSize }: FontSizeSelectorProps) {
  return (
    <Select value={fontSize} onValueChange={setFontSize}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder="Font size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fontSizes.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
