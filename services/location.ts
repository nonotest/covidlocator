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
