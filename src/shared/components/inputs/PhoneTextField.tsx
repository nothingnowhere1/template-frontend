import type { TextFieldProps } from '@/shared/components/inputs/TextField.tsx';
import { TextField } from '@/shared/components/inputs/TextField.tsx';

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
