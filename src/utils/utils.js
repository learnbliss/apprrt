export const normalizeView = (obj) => {
    return Object.keys(obj).reduce((acc, item) => {
    return [...acc, {id: item, ...obj[item]}]
}, [])
}
