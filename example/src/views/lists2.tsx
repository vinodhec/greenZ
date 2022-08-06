import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, Image, FlatList,Dimensions, ScrollView } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
const SCREEN_WIDTH = Dimensions.get('window').width;

import {
  Text,
  ListItem,
  Avatar,
  Icon,
  Badge,
  ListItemProps,
  Button,
  Switch,
} from '@rneui/themed';
import { Header } from '../components/header';
import colors from '../config/colors';
import { FireStore } from '../helpers/FireStore';
import AccordionContent from './AccordionContent';
import { groupBy } from 'lodash';

const log = () => console.log('this is an example method');

type List1Data = {
  title: string;
  icon: string;
};




type ListComponentProps = ListItemProps;

const Lists2: React.FunctionComponent<ListComponentProps> = () => {

  const [list2,setList2] = useState({})
  const [veggies,setVeggies] = useState([])
  const [fruits,setFruits] = useState([])

  const [index, setIndex] = React.useState(0);


  useEffect(() => {
  FireStore.getDocuments('items').then((querySnapshot)=>{
    const veglist =[];
    const fruitlist = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if(data.category === 'veggies'){
        veglist.push({ ...data, id: doc.id })
      }
      else if(data.category === 'fruits'){
        fruitlist.push({ ...data, id: doc.id })

      }
    });
  const veg1= groupBy(veglist,'subCategory') as any
    setVeggies(Object.keys(veg1))
    const fruit1= groupBy(fruitlist,'subCategory') as any
    setList2({...fruit1,...veg1});
    setFruits(Object.keys(fruit1))
  })
    
  }, [])

  const listItemProps = {};
  const RenderRow = ({ item }: { item: string }) => {
    return (
      <View style={styles.list}>
      <AccordionContent list2 = {list2[item]} subCategory={item} />
    </View>
    );
  };
 

  return (
    <>
      <Header title="Manage Items" view="listitem" />
      <Tab
        value={Math.ceil(index > -1 ? index : 0)}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'grey',
          height: 3,
        }}
        scrollable
        variant="primary"
      >
        
        <Tab.Item
          containerStyle={{
            width: SCREEN_WIDTH/3,
          }}
          title="Veggies"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'person', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          containerStyle={{
            width: SCREEN_WIDTH/3,
          }}
          title="Fruits"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          containerStyle={{
            width: SCREEN_WIDTH/3,
          }}
          title="Groceries"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
        
      </Tab>
      <TabView
        onSwipeStart={(e) => console.log(e)}
        value={index}
        onChange={setIndex}
        animationType="spring"
        // containerStyle={{ width: 240, height: 200 }}
      >
        <TabView.Item style={{ width: '100%' }}>
        <FlatList
       
       data={veggies}
       keyExtractor={(a: List1Data, index: number) => index.toString()}
       renderItem={RenderRow}
     />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
        <FlatList
       
       data={fruits}
       keyExtractor={(a: List1Data, index: number) => index.toString()}
       renderItem={RenderRow}
     />
        </TabView.Item>
      
       
      </TabView>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

export default Lists2;
