
export function callcSequenceIndex(ix, page, perPage) {
    return ix + (perPage * (page - 1))
}