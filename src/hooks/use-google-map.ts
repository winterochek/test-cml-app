import { useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useState } from 'react'

export function useGoogleMap() {
   const [, setMap] = useState<unknown>(null)
   const center = {
      lat: 50.44,
      lng: 30.5,
   }

   const onLoad = useCallback(function callback(map: unknown) {
      setMap(map)
   }, [])

   const onUnmount = useCallback(function callback() {
      setMap(null)
   }, [])
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: 'AIzaSyBb6GoLIHASZsLpKZhlAowzoxn3YYWXsPI',
   })

   return { center, onLoad, onUnmount, isLoaded }
}
