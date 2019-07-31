declare const generateSalt: () => string;
declare const generateHashedPassword: (salt: string, password: string) => string;
export { generateSalt, generateHashedPassword };
