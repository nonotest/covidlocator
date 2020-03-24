//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView from 'react-native-web-maps'
import { useDispatch, storeActions, useStore } from '../../context/StoreContext'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { clusters } from '../../mock/clusters'
import { markers } from '../../mock/markers'

function renderClusters() {
  return clusters.data.map(cluster => {
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
        key={cluster.uuid}
      />
    )
  })
}

function renderFriends() {
  return markers.data.map(marker => {
    console.log({ marker })
    return (
      <MapView.Marker
        title={marker.name}
        coordinate={marker.coordinate}
        key={marker.uuid}
      />
    )
  })
}

function Map() {
  const store = useStore()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [friends, setFriends] = useState(false)

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

      dispatch({
        type: storeActions.LOCATION_RECEIVED,
        payload: { location: loc }
      })
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    dispatch({
      type: storeActions.LOCATION_RECEIVED,
      payload: { location }
    })
    return
  }

  useEffect(() => {
    // get initial location.
    _getLocationAsync()
  }, [])

  if (!store.location) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <MapView
        defaultZoom={13}
        region={store.location.coords}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false
        }}
      >
        {renderClusters()}
        {friends === true && renderFriends()}
      </MapView>
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          width: 200
        }}
      >
        <Button
          accessibilityLabel="Make a submission"
          onPress={() => navigation.navigate('SubmissionModal')}
          mode="contained"
        >
          <Text>Make a submission</Text>
        </Button>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 10,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: 200
        }}
      >
        <Button
          accessibilityLabel="Show/Hide Friends"
          onPress={() => {
            setFriends(!friends)
          }}
          mode="contained"
        >
          <Text>Show/Hide Friends</Text>
        </Button>
      </View>
      <View
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}
      >
        <Button
          accessibilityLabel="Make a submission"
          onPress={() => {}}
          mode="contained"
        >
          <Text>Authenticate</Text>
        </Button>
      </View>
    </View>
  )
}

export default Map
