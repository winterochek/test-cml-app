import { useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useState } from 'react'

export function useGoogleMap() {
   const [, setMap] = useState<unknown>(null)
   const center = {
      lat: 50.44,
      lng: 30.5,
   }

   const onLoad = useCallback((map: unknown) => {
      setMap(map)
   }, [])

   const onUnmount = useCallback(() => {
      setMap(null)
   }, [])

   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      // todo: move to env
      googleMapsApiKey: 'AIzaSyBb6GoLIHASZsLpKZhlAowzoxn3YYWXsPI',
   })

   return { center, onLoad, onUnmount, isLoaded }
}
