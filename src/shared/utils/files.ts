export const generateId = () => {
    if (typeof crypto === 'undefined' || typeof crypto.randomUUID !== 'function') {
        return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }
    return crypto.randomUUID();
};

export const base64ToFile = (content: string): File | null => {
    if (!content) {
        return null;
    }

    const dataUrlMatch = content.match(/^data:([^;,]+)(?:;name=([^;]+))?;base64,(.+)$/);
    const mimeType = dataUrlMatch?.[1] ?? 'application/octet-stream';
    const encodedFileName = dataUrlMatch?.[2];
    let fileName: string;

    if (encodedFileName) {
        try {
            fileName = decodeURIComponent(encodedFileName);
        } catch {
            fileName = encodedFileName;
        }
    } else {
        fileName = `file-${generateId()}`;
    }
    const base64Data = dataUrlMatch?.[3] ?? content;

    try {
        const binary = atob(base64Data);
        const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
        return new File([bytes], fileName, { type: mimeType });
    } catch {
        return null;
    }
};

export const fileToBase64 = async (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const withName = reader.result.replace(
                    ';base64,',
                    `;name=${encodeURIComponent(file.name)};base64,`
                );
                resolve(withName);
                return;
            }

            reject(new Error('Failed to convert file to base64.'));
        };
        reader.onerror = () => reject(new Error('Failed to read file.'));

        reader.readAsDataURL(file);
    });
