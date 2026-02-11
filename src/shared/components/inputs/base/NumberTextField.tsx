import type { TextFieldProps } from '@/shared/components/inputs/base';
import { TextField } from '@/shared/components/inputs/base';

export type NumberTextFieldProps = TextFieldProps;

export function NumberTextField({
    type: _type,
    inputMode = 'numeric',
    ...props
}: NumberTextFieldProps) {
    return (
        <TextField
            {...props}
            type="number"
            inputMode={inputMode}
        />
    );
}
