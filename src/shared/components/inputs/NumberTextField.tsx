import type { TextFieldProps } from '@/shared/components/inputs/TextField.tsx';
import { TextField } from '@/shared/components/inputs/TextField.tsx';

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
