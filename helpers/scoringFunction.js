const weight = [90, 80, 85, 75, 60]
const totalWeight = weight.reduce((a, b) => a + b, 0)
const alternates = [
  [12, 60, 2, 2, 2],
  [16, 50, 1, 1, 2],
  [16, 50, 1, 1, 4],
  [17, 70, 2, 2, 4],
]
const cMax = [25, 100, 2, 2, 4]
const cMin = [6, 50, 1, 1, 0]

//normalisasi bobot
const calcNormalize = (weight, totalWeight) => {
  const normalize = weight.map((weightIndex) => weightIndex / totalWeight)
  return normalize
}

//mendapatkan nilai utility
const calcUtility = (alternate, Cmin, Cmax) => {
  const utils = alternate.map((outerIndex) =>
    outerIndex.map(
      (mainIndex, index) =>
        (mainIndex - Cmin[index]) / (Cmax[index] - Cmin[index])
    )
  )
  return utils
}

//nilai akhir
const calcFinalValue = (normalizeWeight, utils) => {
  const result = []

  const final = utils.map((outerIndex, indexOut) => {
    result[indexOut] = 0
    outerIndex.map((mainIndex, index) =>
        (result[indexOut] += mainIndex * normalizeWeight[index])
    )
  })
  return result
}

calcFinalValue(
  calcNormalize(weight, totalWeight),
  calcUtility(alternates, cMax, cMin)
)

module.exports = {
  calcNormalize,
  calcUtility,
  calcFinalValue,
}
