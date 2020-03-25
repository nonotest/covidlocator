//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MapView from 'react-native-web-maps'
import { useDispatch, storeActions, useStore } from '../../context/StoreContext'
import { Text, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { getLocationAsync } from '../../services/location'

function renderClusters(clusters) {
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

function renderFriends(markers) {
  return markers.data.map(marker => {
    return (
      <MapView.Marker
        title={marker.name}
        coordinate={marker.coordinate}
        key={marker.uuid}
      />
    )
  })
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function Map() {
  const store = useStore()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [friends, setFriends] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  const _authenticate = async val => {
    setAuthenticating(true)
    await timeout(1000)
    dispatch({
      type: storeActions.SET_AUTHENTICATION,
      payload: { authed: val }
    })
    setAuthenticating(false)
  }

  useEffect(() => {
    const it = setInterval(() => {
      const updated = store.clusters.data.map(cluster => {
        return {
          ...cluster,
          population: cluster.population + 50
        }
      })

      dispatch({
        type: storeActions.UPDATE_CLUSTERS_AUTO,
        payload: { clusters: updated }
      })
    }, 4000)
    return () => {
      clearInterval(it)
    }
  }, [store.clusters])

  useEffect(() => {
    // get initial location.
    ;(async () => {
      const payload = await getLocationAsync()
      dispatch({
        type: storeActions.LOCATION_RECEIVED,
        payload
      })
    })()
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
        {renderClusters(store.clusters)}
        {friends === true && renderFriends(store.markers)}
      </MapView>
      {store.submitted === false && (
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
            accessibilityLabel="I Have COVID-19 Symptoms"
            onPress={() => navigation.navigate('SubmissionModal')}
            mode="contained"
          >
            <Text>I Have COVID-19 Symptoms</Text>
          </Button>
        </View>
      )}
      {store.authed && (
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
            <Text>{friends ? 'Hide' : 'Show'} Friends</Text>
          </Button>
        </View>
      )}

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
        {!store.authed ? (
          <Button
            accessibilityLabel="Make a submission"
            onPress={async () => _authenticate(true)}
            mode="contained"
            loading={authenticating}
          >
            <Text>Authenticate</Text>
          </Button>
        ) : (
          <Button
            accessibilityLabel="Make a submission"
            onPress={async () => _authenticate(false)}
            mode="contained"
            loading={authenticating}
          >
            <Text>Logout</Text>
          </Button>
        )}
      </View>
    </View>
  )
}

export default Map
