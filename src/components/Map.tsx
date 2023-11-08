/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { useCallback, useEffect, useState } from 'react'
import { createVisit, deleteAllVisits, getVisits } from '../firebase'
import { useGoogleMap } from '../hooks/use-google-map'

export function Map() {
   const containerStyle = {
      width: '800px',
      height: '800px',
   }
   const [clicks, setClicks] = useState<google.maps.LatLngLiteral[]>([])

   const fetchVisits = useCallback(async () => {
      const data = await getVisits()
      const locations = data.map(visit => ({
         lat: visit.location.latitude,
         lng: visit.location.longitude,
      }))
      setClicks(locations)
   }, [])

   useEffect(() => {
      fetchVisits()
   }, [fetchVisits])

   const onClick = async (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return
      const coordinates = e.latLng?.toJSON()
      if (!coordinates) return
      setClicks([...clicks, coordinates])
      await createVisit({
         location: { latitude: coordinates.lat, longitude: coordinates.lng },
         timestamp: new Date().getTime(),
      })
   }

   const { isLoaded, onUnmount, onLoad, center } = useGoogleMap()

   const onDelete = () => {
      deleteAllVisits()
      setClicks([])
   }

   return isLoaded ? (
      <>
         <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onClick}
         >
            {clicks.map((latLng, i) => (
               <MarkerF label={(i + 1).toString()} key={i} position={latLng} />
            ))}
            <></>
         </GoogleMap>
         <button
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
            type='button'
            onClick={onDelete}
         >
            Delete all
         </button>
      </>
   ) : (
      <></>
   )
}
