let obj = {
    '-MePCcAp-q1km_umyn7P': {aid: 'запись номер 1', comment: '', date: '2021-07-12', time: '13:14'},
    '-MePCmwAcI4OehObi3jQ': {aid: 'запись номер 2', comment: '', date: '2021-07-12', time: '13:15'},
    '-MePH0ltyvaV2y8-v7oD': {aid: 'dwa', comment: '', date: '2021-07-12', time: '13:33'},
    '-MePHh-fqQ-Jwc9yiYEA': {aid: 'нет', comment: '', date: '2021-07-19', time: '13:36'},
}

let b = Object.keys(obj).reduce((acc, item) => {
    return [...acc, {id: item, ...obj[item]}]
}, [])
