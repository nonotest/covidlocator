import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-web-maps'

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { clusters } from '../../mock/clusters'

function Map() {
  // TODO: useLocationData
  const [location, setLocation] = useState<Location.LocationData>(null)
  const markerRef = useRef(null)
  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      const loc: Location.LocationData = {
        // default
        coords: {
          latitude: -33.8,
          longitude: 151,
          altitude: 0,
          accuracy: 100,
          speed: 0,
          heading: 0
        },
        timestamp: new Date().getTime()
      }
      setLocation(loc)
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    return
  }

  useEffect(() => {
    // get initial location.
    _getLocationAsync()
  }, [])

  if (!location) {
    return null
  }

  console.log({ location })

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <MapView defaultZoom={13} region={location ? { ...location.coords } : {}}>
        {clusters.data.map(cluster => {
          let options = {}
          if (cluster.symptoms_severity === 'critical') {
            options = {
              strokeColor: 'black',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: 'black',
              fillOpacity: 0.35
            }
          } else if (cluster.symptoms_severity === 'mild') {
            options = {
              strokeColor: 'blue',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: 'blue',
              fillOpacity: 0.35
            }
          } else if (cluster.symptoms_severity === 'severe') {
            options = {
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35
            }
          }

          return (
            <MapView.Circle
              radius={Math.sqrt(cluster.population) * 100}
              options={options}
              center={cluster.center.coordinate}
              // onPress={() => {
              //   markerRef.current.showCallout && markerRef.current.showCallout()
              // }}
              // ref={markerRef}
            />
          )
        })}
      </MapView>
    </View>
  )
}

export default Map
