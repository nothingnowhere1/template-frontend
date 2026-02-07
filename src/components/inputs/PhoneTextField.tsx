import type { TextFieldProps } from '@/components/inputs/TextField';
import { TextField } from '@/components/inputs/TextField';

export type PhoneTextFieldProps = TextFieldProps;

export function PhoneTextField({
    type: _type,
    inputMode = 'tel',
    autoComplete = 'tel',
    ...props
}: PhoneTextFieldProps) {
    return (
        <TextField
            {...props}
            type="tel"
            inputMode={inputMode}
            autoComplete={autoComplete}
        />
    );
}
