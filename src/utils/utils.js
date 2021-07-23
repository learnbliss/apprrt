export const normalizeView = (obj) => {
    return Object.keys(obj).reduce((acc, item) => {
        return [...acc, {id: item, ...obj[item]}]
    }, [])
}

export const normalizeTime = (unixDate, timeZone) => {
    const currentTimeZoneInSecond = new Date(1626378521).getTimezoneOffset() * 60
    const parseDate = new Date((+unixDate + currentTimeZoneInSecond + timeZone) * 1000)
    return `${parseDate.getHours()}:${parseDate.getMinutes()}`
}
