import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {IconButton} from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import MapView, {Marker} from 'react-native-maps';
import ConfirmButton from '../component/ConfirmButton';
import {COLORS} from '../theme/colors';
import {headerContainerStyle} from '../theme/styles';

const MapInput = ({fields, index, chooseLocation}) => {
  const [address, setAddress] = useState('');
  const [markerState, setMarker] = useState({
    target: 347,
    coordinate: fields[index].value.geo,
    position: {
      x: 150,
      y: 269,
    },
  });
  const [regionState, setRegion] = useState({
    latitude: fields[index].value.geo.latitude,
    longitude: fields[index].value.geo.longitude,
    latitudeDelta: 3.5,
    longitudeDelta: 0.421,
  });

  return (
    <View style={styles.container}>
      <View style={headerContainerStyle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', fontSize: 20}}>Choose Location</Text>
        </View>
        <ConfirmButton
          onPress={() =>
            chooseLocation({
              name: fields[index].name,
              value: {
                geo: markerState.coordinate,
                range: fields[index].value.range,
                isSelected: true,
              },
            })
          }
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          icon="magnify"
          color={COLORS.buttonColor}
          size={20}
          onPress={() => {
            Geocoder.from(address)
              .then(res => {
                var location = res.results[0].geometry.location;
                setRegion({
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: regionState.latitudeDelta,
                  longitudeDelta: regionState.longitudeDelta,
                });
              })
              .catch(error => console.warn(error));
          }}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setAddress}
          placeholder="search an address"
        />
      </View>
      <MapView
        style={styles.map}
        region={regionState}
        onLongPress={e => setMarker(e.nativeEvent)}
        onRegionChangeComplete={setRegion}>
        <Marker coordinate={markerState.coordinate} />
      </MapView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.formBackgroundColor,
  },
  map: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    height: 48,
    width: 48,
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
  fieldHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#00227b',
  },
  fieldHeader: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
};

export default MapInput;
