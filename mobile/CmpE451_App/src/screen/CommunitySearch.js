import React, {useState, useEffect} from 'react';
import {View, ToastAndroid, Text, Image, ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {COLORS} from '../theme/colors';
import DynamicFormField from '../component/DynamicFormField';
import DynamicFormFieldInterval from '../component/DynamicFormFieldInterval';
import DynamicDateTimePickerInterval from '../component/DynamicDateTimePickerInterval';
import DynamicLocationInput from '../component/DynamicLocationInput';
import MapInput from '../component/MapInput';
import CommonIcon from '../component/CommonIcon';
import {postTypeIcon} from '../image/index';
import {tagIcon} from '../image/index';
import * as client from '../services/BoxyClient';
import {PAGE_VARIABLES} from '../constants';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {useIsFocused} from '@react-navigation/native';
import {headerContainerStyle} from '../theme/styles';
import CommonButton from '../component/CommonButton';
import SwitchButton from '../component/SwitchButton';
import CommonTextInput from '../component/CommonTextInput';
import {IconButton} from 'react-native-paper';

export function convertNumberFields(field) {
  return {
    name: field.name,
    value: {
      start: field.value.start === '' ? Number.MIN_SAFE_INTEGER : field.value.start,
      end: field.value.end === '' ? Number.MAX_SAFE_INTEGER : field.value.end,
    },
  };
}

export function convertLocationFields(field) {
  return {
    name: field.name,
    value: {
      geo: {
        latitude: field.value.geo.latitude,
        longitude: field.value.geo.longitude,
        range: field.value.range === 0 ? 100 : field.value.range,
      },
    },
  };
}

export default function CommunitySearch({navigation}) {
  const [filterByPostType, setFilterByPostType] = useState(true);
  const [filterByTags, setFilterByTags] = useState(true);

  const [tags, setTags] = useState('');

  const [selectedItem, setSelectedItem] = useState({id: -1, name: ''});
  const [items, setItems] = useState([]);

  const [dateFields, setDateFields] = useState([]);
  const [linkFields, setLinkFields] = useState([]);
  const [textFields, setTextFields] = useState([]);
  const [numberFields, setNumberFields] = useState([]);
  const [locationFields, setLocationFields] = useState([]);

  const textFieldKey = 'text';
  const numberFieldKey = 'number';
  const dateFieldKey = 'date';
  const linkFieldKey = 'link';
  const locationFieldKey = 'location';

  const [showMap, setShowMap] = useState(false);
  const [locationIndex, setLocationIndex] = useState(-1);

  const [sortType, setSortType] = useState('createdAt');

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getPostTypes();
    }
  }, [isFocused]);

  const getPostTypes = async () => {
    let response = await client.getPostTypes({
      communityId: PAGE_VARIABLES.communityId,
    });
    const status = response.status;
    if (status == 200) {
      setItems(response.data);
    } else {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  };

  const inputHandler = (fieldType, input, index) => {
    switch (fieldType) {
      case 'text':
        const _textInputs = [...textFields];
        _textInputs[index] = input;
        setTextFields(_textInputs);
        break;
      case 'number':
        const _numberInputs = [...numberFields];
        _numberInputs[index] = input;
        setNumberFields(_numberInputs);
        break;
      case 'date':
        const _dateInputs = [...dateFields];
        _dateInputs[index] = input;
        setDateFields(_dateInputs);
        break;
      case 'link':
        const _linkInputs = [...linkFields];
        _linkInputs[index] = input;
        setLinkFields(_linkInputs);
        break;
      case 'location':
        const _locationInputs = [...locationFields];
        _locationInputs[index] = input;
        setLocationFields(_locationInputs);
        break;
      default:
        console.info('field type not found');
    }
  };

  function chooseLocation(coordinate) {
    inputHandler(locationFieldKey, coordinate, locationIndex);
    setShowMap(false);
  }

  function openMap(index) {
    setShowMap(true);
    setLocationIndex(index);
  }

  function postForm() {
    return (
      <View style={{width: '100%'}}>
        <DynamicFormField
          fields={textFields}
          fieldKey={textFieldKey}
          onChangeText={inputHandler}
        />
        <DynamicFormField
          fields={linkFields}
          fieldKey={linkFieldKey}
          onChangeText={inputHandler}
        />
        <DynamicFormFieldInterval
          fields={numberFields}
          fieldKey={numberFieldKey}
          onChangeText={inputHandler}
        />
        <DynamicLocationInput
          fields={locationFields}
          fieldKey={locationFieldKey}
          onChangeText={inputHandler}
          onPress={openMap}
        />
        <DynamicDateTimePickerInterval
          fields={dateFields}
          fieldKey={dateFieldKey}
          onChangeDate={inputHandler}
        />
      </View>
    );
  }

  const getPostTypeDetail = async item => {
    const postTypeDetail = await client.getPostTypeDetail({
      communityId: PAGE_VARIABLES.communityId,
      postTypeId: item.id,
    });
    const {
      dateFieldNames,
      linkFieldNames,
      numberFieldNames,
      textFieldNames,
      locationFieldNames,
    } = JSON.parse(postTypeDetail);
    if (dateFieldNames != null) {
      const dataFieldsTemp = [];
      for (let i = 0; i < dateFieldNames.length; i++) {
        dataFieldsTemp.push({name: dateFieldNames[i], value: {}});
      }
      setDateFields(dataFieldsTemp);
    }
    if (linkFieldNames != null) {
      const linkFieldsTemp = [];
      for (let i = 0; i < linkFieldNames.length; i++) {
        linkFieldsTemp.push({name: linkFieldNames[i], value: ''});
      }
      setLinkFields(linkFieldsTemp);
    }
    if (textFieldNames != null) {
      const textFieldsTemp = [];
      for (let i = 0; i < textFieldNames.length; i++) {
        textFieldsTemp.push({name: textFieldNames[i], value: ''});
      }
      setTextFields(textFieldsTemp);
    }
    if (numberFieldNames != null) {
      const numberFieldsTemp = [];
      for (let i = 0; i < numberFieldNames.length; i++) {
        numberFieldsTemp.push({name: numberFieldNames[i], value: {}});
      }
      setNumberFields(numberFieldsTemp);
    }
    if (locationFieldNames != null) {
      const locationFieldsTemp = [];
      for (let i = 0; i < locationFieldNames.length; i++) {
        locationFieldsTemp.push({
          name: locationFieldNames[i],
          value: {
            geo: {
              latitude: 41,
              longitude: 29,
            },
            range: 0,
            isSelected: false,
          },
        });
      }
      setLocationFields(locationFieldsTemp);
    }
  };

  function navigateSearchResults() {
    let body = {
      postTypeId: '',
      communityId: PAGE_VARIABLES.communityId,
      textFields: [],
      dateFields: [],
      numberFields: [],
      locationFields: [],
      linkFields: [],
      tag: '',
    };
    if (filterByPostType) {
      body.postTypeId = selectedItem.id;
      body.textFields = textFields.filter(text => text.value !== '');
      body.dateFields = dateFields.filter(
        interval => Object.keys(interval.value).length !== 0,
      );
      body.numberFields = numberFields
        .filter(interval => Object.keys(interval.value).length !== 0)
        .map(convertNumberFields);
      body.locationFields = locationFields
        .filter(location => location.value.isSelected)
        .map(convertLocationFields);
      body.linkFields = linkFields.filter(text => text.value !== '');
    }
    if (filterByTags) {
      body.tag = tags;
    }
    navigation.navigate('PostSearchResults', {
      body: body,
      filterByPostType: filterByPostType,
      filterByTags: filterByTags,
      sortBy: sortType,
    });
  }

  return (
    <View style={styles.container}>
      {showMap ? (
        <MapInput
          fields={locationFields}
          index={locationIndex}
          chooseLocation={chooseLocation}
        />
      ) : (
        <>
          <View style={headerContainerStyle}>
            <CommonIcon
              icon={'arrow-left-circle'}
              IconColor={'white'}
              onPress={navigation.goBack}
            />
            <View style={{flexDirection: 'row', flex: 4}}>
              <Text style={{color: 'white', fontSize: 20}}>Search Post</Text>
            </View>
            <View />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Image source={postTypeIcon} style={styles.image} />
            </View>
            <View style={{flex: 6}}>
              <Text> Filter By Post Type </Text>
            </View>
            <CheckBox
              value={filterByPostType}
              onValueChange={setFilterByPostType}
              style={{flex: 1}}
            />
          </View>
          <SearchableDropdown
            selectedItems={selectedItem}
            onItemSelect={item => {
              setSelectedItem(item);
              getPostTypeDetail(item);
            }}
            containerStyle={{padding: 5, marginHorizontal: 7, width: '96%'}}
            onRemoveItem={(item, index) => {
              this.setState({});
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{color: '#222'}}
            itemsContainerStyle={{maxHeight: 140}}
            items={items}
            defaultIndex={2}
            resetValue={false}
            textInputProps={{
              placeholder: 'Choose',
              style: {
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              },
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
          <ScrollView
            style={styles.inputsContainer}
            keyboardShouldPersistTaps="handled">
            {selectedItem != null && filterByPostType && postForm()}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 25,
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <Image source={tagIcon} style={styles.image} />
              </View>
              <View style={{flex: 6}}>
                <Text> Filter By Tags </Text>
              </View>
              <CheckBox
                value={filterByTags}
                onValueChange={setFilterByTags}
                style={{flex: 1}}
              />
            </View>
            {filterByTags && <CommonTextInput onChangeText={setTags} />}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <IconButton
                  icon="sort-ascending"
                  color={COLORS.fieldHeaderColor}
                  size={40}
                  style={{margin: 0, marginLeft: 7}}
                />
              </View>
              <View style={{flex: 6}}>
                <Text> Sort </Text>
              </View>
            </View>
            <SwitchButton
              firstText={'New'}
              secondText={'Popular'}
              firstPress={setSortType}
              secondPress={setSortType}
            />
            <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
              <CommonButton
                text="Apply Filters"
                onPress={navigateSearchResults}
                buttonWidth={'60%'}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.formBackgroundColor,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    backgroundColor: COLORS.screenHeaderBackground,
    height: 55,
  },
  feedItem: {
    width: '100%',
  },
  content: {
    color: COLORS.textColor,
    fontSize: 16,
    marginTop: 5,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
};
