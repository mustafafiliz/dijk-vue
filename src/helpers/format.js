export const formatPrice = (value) => {
  // Remove all non-digit characters except comma
  const cleanValue = value.replace(/[^\d,]/g, '')

  // Split by comma to handle decimal part
  const parts = cleanValue.split(',')
  let integerPart = parts[0]
  const decimalPart = parts[1]

  // Add thousand separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  // Combine integer and decimal parts
  return decimalPart ? `${integerPart},${decimalPart}` : integerPart
}
