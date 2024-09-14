import alcData from './alc_data.json'
export const alcArray = new Float32Array(alcData.map(value => value === null ? NaN : value))
