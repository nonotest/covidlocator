import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

type RegionCoords = {
  latitudeDelta: number
  longitudeDelta: number
  latitude: number
  longitude: number
}

type Region = {
  coords: RegionCoords
}

export const getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status !== 'granted') {
    const loc: Region = {
      // default
      coords: {
        latitude: -33.8,
        longitude: 151,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    }

    return { location: loc, locPermission: false }
  }

  let location = await Location.getCurrentPositionAsync({})
  location.coords.latitudeDelta = LATITUDE_DELTA
  location.coords.longitudeDelta = LONGITUDE_DELTA
  console.log({ location })

  return { location, locPermission: true }
}

export const generateClusters = coords => {
  let clusters = []
  const severities = ['severe', 'mild', 'critical']

  const count = Math.floor(Math.random() * 5) + 3
  for (let i = 0; i < count; ++i) {
    const modifier = Math.floor(Math.random() * 6) * 0.002 + 0.002
    const severity = Math.floor(Math.random() * Math.floor(3))
    clusters.push({
      uuid: `uuid-${i}`,
      center: {
        coordinate: {
          latitude: coords.latitude + modifier,
          longitude: coords.longitude - modifier
        }
      },
      population: 10,
      created_at: new Date(),
      symptoms_severity: severities[severity],
      symptoms_started_at: new Date()
    })
  }

  return {
    data: clusters
  }
}
