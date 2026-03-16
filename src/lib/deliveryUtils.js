// Haversine formula — calculates distance between two lat/lng points
export function getDistanceKm(lat1, lng1, lat2, lng2) {
  if (!lat1 || !lng1 || !lat2 || !lng2) return null;
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

export function calculateDeliveryCharge(distanceKm, config) {
  if (distanceKm === null || isNaN(distanceKm)) return { charge: null, label: 'Calculating...', error: 'Invalid distance' }
  if (distanceKm > config.maxRadiusKm) return { charge: null, error: 'Outside delivery zone (40km limit)' }
  if (distanceKm <= config.freeDeliveryKm) return { charge: 0, label: 'FREE' }
  const charge = Math.ceil(distanceKm - config.freeDeliveryKm) * config.perKmCharge
  return { charge, label: `₹${charge}` }
}