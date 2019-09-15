export function mergeState(oldState, newState) {
    return {
        ...oldState,
        ...newState,
    }
}