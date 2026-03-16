import { useState } from 'react'
import { getDistanceKm, calculateDeliveryCharge } from '../lib/deliveryUtils'
import { BUSINESS_CONFIG } from '../constants/businessConfig'
import { toast } from 'react-hot-toast'

export function useDeliveryCharge() {
  const [distanceKm, setDistanceKm] = useState(null)
  const [deliveryCharge, setDeliveryCharge] = useState(null)
  const [chargeLabel, setChargeLabel] = useState('')
  const [isEligible, setIsEligible] = useState(null) // null = unchecked, true, false
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const checkPincode = async (pincode) => {
    if (!pincode || pincode.length < 6) return
    setIsLoading(true)
    setError(null)
    try {
      // Use Google Maps Geocoding API
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        throw new Error('Maps API key not configured')
      }

      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pincode},+India&key=${apiKey}`)
      const data = await res.json()

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location
        const dKm = getDistanceKm(
          BUSINESS_CONFIG.storeLocation.lat,
          BUSINESS_CONFIG.storeLocation.lng,
          lat,
          lng
        )
        setDistanceKm(dKm)
        
        const calculation = calculateDeliveryCharge(dKm, BUSINESS_CONFIG.delivery)
        
        if (calculation.error) {
          setIsEligible(false)
          setError(calculation.error)
          setDeliveryCharge(null)
          setChargeLabel('')
          toast.error(calculation.error)
        } else {
          setIsEligible(true)
          setDeliveryCharge(calculation.charge)
          setChargeLabel(calculation.label)
          toast.success(`Delivery available! Distance: ${dKm.toFixed(1)}km`)
        }
      } else {
        throw new Error('Could not find location for this pincode')
      }
    } catch (err) {
      console.error(err)
      
      // Fallback for dev without maps key
      if (err.message === 'Maps API key not configured') {
        // mock logic for dev mode
        const dKm = parseInt(pincode.slice(-2)) // fake distance based on pincode
        setDistanceKm(dKm)
        const calc = calculateDeliveryCharge(dKm, BUSINESS_CONFIG.delivery)
        if (calc.error) {
          setIsEligible(false)
          setError(calc.error)
          setDeliveryCharge(null)
        } else {
          setIsEligible(true)
          setDeliveryCharge(calc.charge)
          setChargeLabel(calc.label)
        }
      } else {
        setError(err.message || 'Failed to check pincode')
        setIsEligible(false)
        setDeliveryCharge(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setDistanceKm(null)
    setDeliveryCharge(null)
    setChargeLabel('')
    setIsEligible(null)
    setError(null)
  }

  return { distanceKm, deliveryCharge, chargeLabel, isEligible, isLoading, error, checkPincode, reset }
}