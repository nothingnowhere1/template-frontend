import type { TextFieldProps } from '@/shared/components/inputs/base';
import { TextField } from '@/shared/components/inputs/base';

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
