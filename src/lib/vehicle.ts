export const getVehiclePrices = (time: number) => {
  return time < 1680555600000
    ? [80, 100, 150, 200, 250]
    : time < 1728864000000
    ? [100, 150, 200, 250, 350]
    : [100, 200, 250, 300, 500]
}

export const vehicleColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]

export const vehicleTypes = [
  'Small Vehicle',
  'Light Truck',
  'Medium Truck',
  'Large Truck',
  'Trailer Truck',
]
