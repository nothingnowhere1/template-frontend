export function phoneValidate(value: string): string | null {
    const phone = value.replace(/[^0-9]/gmi, '');

    if (phone.length === 10 && phone.startsWith('7')) {
        return '7' + phone.slice(1);
    } else if (phone.length === 11 && phone.startsWith('8')) {
        return '7' + phone.slice(1);
    } else if (phone.length === 11 && phone.startsWith('7')) {
        return phone;
    }

    return null;
}
