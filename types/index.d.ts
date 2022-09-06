import { IOptions } from '../interfaces/index';
export declare type TMethods = 'single' | 'array' | 'fields' | 'none' | 'any';
export declare type TStorageTypes = 'diskStorage' | 'memoryStorage';
export declare type TOptions = IOptions & {
    method: TMethods;
    args: any[];
    storage: {
        type: TStorageTypes;
    };
};
