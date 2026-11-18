import { World } from './worlds';

let currentWorld: World | undefined;

export const setWorld = (world: World) => {
    currentWorld = world;
};

export const getWorld = (): World => {
    if (!currentWorld) {
        throw new Error('World is not initialized');
    }

    return currentWorld;
};