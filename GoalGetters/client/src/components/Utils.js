export const DateRestructure = (dateString) =>{
    const justMDY = dateString.slice([0], [10]).split("-")
    return `${justMDY[1]}-${justMDY[2]}-${justMDY[0]}`
}