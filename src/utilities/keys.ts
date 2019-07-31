import { readFileSync } from 'fs';

/**
 *  This function is for extract any key from a file, see ./keys file
 */

export function extractKey(path: string) {
    return readFileSync(path)
        .toString()
        .replace(/\n|\r/g, '')
        .replace(/[-]+[\w\s]+[-]+/g, '');
}
