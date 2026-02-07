import { Button, ControlledInput } from '@/shared/components';
import { useFormExample } from '@/shared/components/examples/FormExample/useFormExample.ts';

export function FormExample() {
    const { control, onSubmit } = useFormExample();

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={onSubmit}
        >
            <h3>Form Example</h3>
            <ControlledInput
                label="Имя"
                control={control}
                name="name"
            />
            <Button
                variant="outline"
                type="submit"
            >
                Сабмит
            </Button>
        </form>
    );
}
