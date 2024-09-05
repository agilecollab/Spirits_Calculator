import { alcArray } from "@/ALC_TAB" 
  
const FirstDimensionSize = 1105

export const lookupIndexByTempAndSG = (temp: number, sg: number): number => {
  const arrayIndex = (FirstDimensionSize * (( temp + 20 ) / 0.5)) * 5
  const toIndex = arrayIndex + ( FirstDimensionSize * 5 ) 
  let fromIndex = arrayIndex
  let found = false
  console.log(sg, typeof(sg))
   do {
    if( alcArray[fromIndex + 1]?.toFixed(1) === sg.toFixed(1)) {
      found = true
      return fromIndex
    }
    fromIndex = fromIndex + 5
  } while ( fromIndex < toIndex && !found )

  return -1;
}
  

export const lookupIndexByTempAndPercent = (temp: number, percent: number): number => {
    const arrayIndex = (FirstDimensionSize * (( temp + 20 ) / 0.5)) * 5
    const toIndex = arrayIndex + ( FirstDimensionSize * 5 ) 
    let fromIndex = arrayIndex
    let found = false

    do {
      if( alcArray[fromIndex + 3]?.toFixed(1) === percent.toFixed(1)) {
        found = true
        return fromIndex
      }
      fromIndex = fromIndex + 5
    } while ( fromIndex < toIndex && !found )

    return -1;
  }



export const getGravity = (index: number): number => parseFloat(alcArray[index + 1].toFixed(1))
export const getKGtoLiterConversionFactor = (index: number): number => parseFloat(alcArray[index + 2].toFixed(4))
export const getPercentAbsoluteAlcByVol = (index: number): number => parseFloat(alcArray[index + 3].toFixed(1))
export const getLiterToLiterConversionFactor = (index: number): number => parseFloat(alcArray[index+4].toFixed(4))
