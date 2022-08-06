
import {
    Text,
    ListItem,
    Avatar,
    Icon,
    Input,
    Dialog, CheckBox, 
    Badge,
    ListItemProps,
    Button,
    Switch,
} from '@rneui/themed';

import { View,Dimensions,StyleSheet, SectionList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { FireStore } from '../helpers/FireStore';
const InputFieldsStyle = {
    borderWidth: 0,
  };

type List2Data = {
    name: string;
    image: string;
    category: string;
    pId: string;
    price: number;
    sCode: string;
    stock: number;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainerStyle: {
        marginTop: 16,
        width: '95%',
      },
    label:{
fontSize:11,
textAlign:'center'
    },
    content:{
        fontSize:14,
        textAlign:'center'
    }
})

export default ({ list2, subCategory }) => {

    const [data,setData] = useState({})
    const [index,setIndex] = useState(-1);
    const [updatedList, setUpdatedList] = useState(list2)
    useEffect(() => {
       setUpdatedList(list2)
    }, [list2])

    const [expanded, setExpanded] = useState(true);
    const [visible5, setVisible5] = useState(false);

    const toggleDialog5 = () => {
        setVisible5(!visible5);
      };
    return <>
    
    <ListItem.Accordion
        content={
            <>
                <ListItem.Content>
                    <ListItem.Title>{subCategory} ({list2?.length})</ListItem.Title>
                </ListItem.Content>
            </>
        }
        isExpanded={expanded}
        icon={<Icon name="chevron-down" type="entypo" />}
        leftRotate
        onPress={() => {
            setExpanded(!expanded);
        }}
    >
        {updatedList?.map((l: Partial<List2Data>, i: React.Key) => (
            <ListItem key={i} onPress={()=>{
                console.log({l})
                setData(l);
                setIndex(i);
                setVisible5(true)}} bottomDivider>
                <Avatar title={l.name} source={{ uri: l.image }} />
                <ListItem.Content>
                    <ListItem.Title><View style={{flex:1,flexDirection:'row',width:SCREEN_WIDTH-75,justifyContent:'space-between',alignItems:'center',height:20}}><Text >{l.name}</Text>
                    <Switch style={{width:20}} />
                    </View></ListItem.Title>
                    <ListItem.Subtitle>
                        <View style={{paddingTop:5, flex:1,flexDirection:'row',width:SCREEN_WIDTH-100,justifyContent:'space-between'}}>
                            <View>
                                <Text style={styles.label}>Code</Text>
                                <Text style={styles.content}>{l.sCode}</Text>

                            </View>

                            <View>
                                <Text style={styles.label}>Id</Text>
                                <Text style={styles.content}>{l.pId}</Text>

                            </View>
                            <View>
                                <Text style={styles.label}>Stock</Text>
                                <Text style={styles.content}>{l.stock || 0}</Text>

                            </View>
                            <View>
                                <Text style={styles.label}>Price</Text>
                                <Text style={styles.content}>₹{l.price}</Text>

                            </View>
                        </View>
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        ))}
    </ListItem.Accordion>
<Dialog isVisible={visible5} onBackdropPress={toggleDialog5}>
<Dialog.Title title="Update Item" />
<Input
            rightIcon={
              <Icon
              color="#86939e"
              size={25}
              name="price-tag"
              type="entypo"
            />
            }
            value={data?.price}
            keyboardType="number-pad"
            containerStyle={styles.inputContainerStyle}
            placeholder="Price"
            onChangeText={(text)=>setData({...data,price:text})}

            // errorMessage="Invalid input"

            style={InputFieldsStyle}
          />
<Input
            rightIcon={
              <Icon
              color="#86939e"
              size={25}
              name="price-tag"
              type="entypo"
            />
            }
            value={data?.stock?.toString()}
            keyboardType="number-pad"
            containerStyle={styles.inputContainerStyle}
            placeholder="Stock"
            onChangeText={(text)=>setData({...data,stock:parseInt(text)})}

            // errorMessage="Invalid input"

            style={InputFieldsStyle}
          />
<Dialog.Actions>
  <Dialog.Button
    title="CONFIRM"
    onPress={async() => {
     let temp = updatedList
     temp[index] = data
      console.log({temp},index)
      setUpdatedList(temp)
      await FireStore.updateDocument('items',data);
      toggleDialog5();
    }}
  />
  <Dialog.Button title="CANCEL" onPress={toggleDialog5} />
</Dialog.Actions>
</Dialog>
</>
}