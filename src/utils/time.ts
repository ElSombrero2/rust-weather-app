export const delay = (ms) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms)
    })
}