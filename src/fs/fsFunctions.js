import { access, constants } from 'node:fs/promises';

export const fileExists = async (filePath) => {
    try {
        await access(filePath, constants.F_OK);

        return true;
    } catch {
        return false;
    }
}