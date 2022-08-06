//@ts-nocheck
import React, { useState, useRef } from 'react';
// import { getFirestore } from "firebase/firestore";
import {Picker} from '@react-native-picker/picker';

import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  ToastAndroid,
  Vibration,
} from 'react-native';
import {
  Input,
  SearchBar,
  Icon,
  Button,
  ThemeProvider,
  InputProps,
} from '@rneui/themed';
import { Header, SubHeader } from '../components/header';
import { FireStore } from '../helpers/FireStore';

const SCREEN_WIDTH = Dimensions.get('window').width;
const dummySearchBarProps = {
  showLoading: true,
  onFocus: () => console.log('focus'),
  onBlur: () => console.log('blur'),
  onCancel: () => console.log('cancel'),
  onClear: () => console.log('cleared'),
};

const SearchBarCustom = (props) => {
  const [value, setValue] = useState('');
  return <SearchBar value={value} onChangeText={setValue} {...props} />;
};

// const db = getFirestore(app);

type InputsComponentProps = {};

const Inputs: React.FunctionComponent<InputsComponentProps> = () => {


  const InputFieldsStyle = {
    borderWidth: 0,
  };
  const [data,setData] = useState({category:'veggies',stock:0,subCategory:'Ooty Veggies'})
  const inputProps = {};
  const updateText=(e,name)=>{
    console.log(e);
    setData({...data,[name]:e.target.value})
  }
  return (
    <View style={{flex:1}} >
  
      <Header title="Add New Item" view="input" />
        
       
        
     
      
        <ScrollView  >
         <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Input
          value={data.name}
          name="name"
          onChangeText={(text)=>setData({...data,name:text})}
            {...(inputProps as InputProps)}
            rightIcon={
              <Icon
                name="add-to-list"
                type="entypo"
                color="#86939e"
                size={25}
              />
            }
            containerStyle={styles.inputContainerStyle}
            placeholder="Name"
            // errorMessage="Invalid input"

            style={InputFieldsStyle}
          />

<Input
          value={data.pId}

            {...(inputProps as InputProps)}
            rightIcon={
              <Icon
                name="idcard"
                type="antdesign"
                color="#86939e"
                size={25}
              />
            }
            containerStyle={styles.inputContainerStyle}
            placeholder="Product ID"
            // errorMessage="Invalid input"
            onChangeText={(text)=>setData({...data,pId:text})}

            style={InputFieldsStyle}
          />



<Input

value={data.sCode}

            {...(inputProps as InputProps)}
            rightIcon={
              <Icon
              color="#86939e"
              size={25}
              name="devices"
              type="octicons"
            />
            }
            containerStyle={styles.inputContainerStyle}
            placeholder="Search Code"
            onChangeText={(text)=>setData({...data,sCode:text})}

            // errorMessage="Invalid input"

            style={InputFieldsStyle}
          />


          <Input
          value={data.price}

            {...(inputProps as InputProps)}
            rightIcon={
              <Icon
              color="#86939e"
              size={25}
              name="price-tag"
              type="entypo"
            />
            }
            keyboardType="number-pad"
            containerStyle={styles.inputContainerStyle}
            placeholder="Price"
            onChangeText={(text)=>setData({...data,price:text})}

            // errorMessage="Invalid input"

            style={InputFieldsStyle}
          />

<Input
          value={data.image}

            {...(inputProps as InputProps)}
            rightIcon={
              <Icon
              color="#86939e"
              size={25}
              name="image"
              type="entypo"
            />
            }
           
            containerStyle={styles.inputContainerStyle}
            placeholder="Image"
            // errorMessage="Invalid input"
            onChangeText={(text)=>setData({...data,image:text})}

            style={InputFieldsStyle}
          />
<View   
                    style={{
                        width: '92%',
marginLeft:-1,
marginTop:16,
                        borderColor: 'grey',
                        borderBottomWidth:1,
                        alignSelf: 'center'
                    }}>
<Picker
selectedValue={data.category}
style={[styles.inputContainerStyle,{ 
  borderColor: 'black',
  paddingLeft:100,

  borderWidth: 1}]}
  itemStyle={{width: 200,
    height: 44,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1}}
  onValueChange={(text)=>setData({...data,'category':text})
  }>
  <Picker.Item label="Veggies" value="veggies" />
  <Picker.Item label="Fruits" value="fruits" />

</Picker>
</View>
<View   
                     style={{
                      width: '92%',
marginLeft:-1,
                      borderColor: 'grey',
                      borderBottomWidth:1,
                      alignSelf: 'center'
                  }}>
<Picker
selectedValue={data.subCategory}

style={[styles.inputContainerStyle,{borderBottomWidth:1,borderBottomColor:'red',paddingRight:20}]}
  onValueChange={(text)=>setData({...data,'subCategory':text})
  }>
  <Picker.Item label="Ooty Veggies" value="Ooty Veggies" />
  <Picker.Item label="Local Veggies" value="Local Veggies" />
</Picker>
</View>
          <Button
                title="Add"
                
                titleStyle={{ fontWeight: '700' }}
               onPress={async ()=>{
                 console.log(data);
                 await FireStore.addDocument('items',data);
                ToastAndroid.show("Items are added", ToastAndroid.SHORT);
             setData({category:'veggies',stock:0,subCategory:'Ooty Veggies'})
                // addDoc(collection(db, "items"), data);

               }}
                containerStyle={{
                  width: 200,
                  height: 40,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
              />
              </View>
        </ScrollView>
        </View>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleLeft: {
    position: 'absolute',
    left: -20,
    top: 0,
    width: 0,
    height: 0,
    borderRightWidth: 20,
    borderRightColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  triangleRight: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  inputContainerStyle: {
    marginTop: 16,
    width: '95%',
  },
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
