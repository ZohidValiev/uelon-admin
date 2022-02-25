
export function callcSequenceIndex(ix: number, page: number, perPage: number): number {
    return ix + (perPage * (page - 1))
}

export function arrayRepeat<T>(length: number, value: T): T[] {
    const result = Array<T>(length)

    for (let i = 0; i < length; i++) {
        result.push(value)
    }

    return result
}