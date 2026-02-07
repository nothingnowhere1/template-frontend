import type { TextFieldProps } from '@/components/inputs/TextField';
import { TextField } from '@/components/inputs/TextField';

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
