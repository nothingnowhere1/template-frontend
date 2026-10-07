import type * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;
export type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

export * from './SelectTrigger';
export * from './SelectContent';
export * from './SelectItem';
export { Select, SelectGroup, SelectValue };
