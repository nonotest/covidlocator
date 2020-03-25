import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export const getLocationAsync = async () => {
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

    return { location: loc, locPermission: false }
  }

  let location = await Location.getCurrentPositionAsync({})
  return { location, locPermission: true }
}

export const generateClusters = coords => {
  let clusters = []
  const severities = ['severe', 'mild', 'critical']

  const count = Math.floor(Math.random() * 5) + 3
  for (let i = 0; i < count; ++i) {
    const modifier = Math.floor(Math.random() * 6) * 0.001 + 0.001
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
