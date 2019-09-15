import {mergeState} from "./mergeState";

export function createMerger(oldState) {
    return newState => {
        return mergeState(oldState, newState);
    }
}