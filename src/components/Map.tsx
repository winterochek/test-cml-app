/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useEffect, useState } from 'react'
import { createVisit, db, deleteAllVisits } from '../firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { Visit } from '../types'

export function Map() {
   const containerStyle = {
      width: '800px',
      height: '800px',
   }
   const [clicks, setClicks] = useState<google.maps.LatLngLiteral[]>([])
   console.log(clicks)
   const [center] = useState<google.maps.LatLngLiteral>({
      lat: 50,
      lng: 30,
   })

   const [visits, setVisits] = useState<Visit[]>([])
   const fetchPost = useCallback(async () => {
      await getDocs(query(collection(db, 'visits'), orderBy('timestamp'))).then(querySnapshot => {
         const newData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
         setVisits(newData as Visit[])
      })
   }, [])

   console.log(visits)

   useEffect(() => {
      fetchPost()
      const locations = visits.map(visit => ({
         lat: visit.location.latitude,
         lng: visit.location.longitude,
      }))
      setClicks(locations)
   }, [fetchPost, visits])

   const onClick = async (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return
      const coordinates = e.latLng?.toJSON()
      if (!coordinates) return
      console.log('coordidnates', coordinates)
      await createVisit({
         location: { latitude: coordinates.lat, longitude: coordinates.lng },
         timestamp: new Date().getTime(),
      })
      setClicks([...clicks, e.latLng?.toJSON()])
   }

   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: 'AIzaSyBb6GoLIHASZsLpKZhlAowzoxn3YYWXsPI',
   })

   const [, setMap] = useState(null)

   const onLoad = useCallback(function callback(map: any) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center)
      map.fitBounds(bounds)

      setMap(map)
   }, [])

   const onUnmount = useCallback(function callback() {
      setMap(null)
   }, [])

   return isLoaded ? (
      <>
         <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onClick}
         >
            {clicks.map((latLng, i) => (
               <MarkerF label={`Quest: ${i + 1}`} key={i} position={latLng} />
            ))}
            <></>
         </GoogleMap>
         <button
            style={{ marginTop: '1rem' }}
            type='button'
            onClick={() => {
               deleteAllVisits()
               setVisits([])
               setClicks([])
            }}
         >
            Delete all
         </button>
      </>
   ) : (
      <></>
   )
}
