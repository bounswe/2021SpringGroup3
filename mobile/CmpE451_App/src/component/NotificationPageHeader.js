import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { container, headerText, photo, iconView } = styles;
    return (
      <SafeAreaView style={container}>
      <Text style={headerText}>Bildirimler</Text>
      </SafeAreaView>
    );
  }
}

const styles = {
    container: {
        width: wp('90%'),
        margin: 20,
        marginBottom: hp('0.5%'),
        justifyContent: 'center',
        flexDirection: 'row',
    },
    photo: {
        width: wp('14.3%'),
        height: wp('14.3%'),
        borderRadius: wp('14.3%')/2,
        borderColor: '#ce6f24',
        borderWidth: 3,
    },
    
    headerText: {
        fontFamily: "SFProDisplay-SemiBold",
        fontSize: 25,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "black",
        marginTop: 10,
    },
    iconView: {
        width: wp('13%'),
        height: wp('13%'),
        borderRadius: wp('13%')/2,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    }
}
