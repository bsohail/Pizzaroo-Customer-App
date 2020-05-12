import React, {useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  YellowBox
} from "react-native";
import {
  Card,
  Tile,
} from "react-native-elements";

import { subscribe } from "react-contextual";

function RestaurantScreen(props) {
 
  let list = [];
  list.push(props.schema[0]);
  list.push(props.schema[0]);  
  list.push(props.schema[0]);
  // console.log("hello props", list);
  YellowBox.ignoreWarnings(['componentWillReceiveProps']);
  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: "white"}}> 
        <Tile
          imageSrc={require("../../images/banner.png")}
        />  
        {list.length !=0 && list && list.sort((a,b) => (a.name < b.name)).map((res, index)=> (
          <View key={index}>
            <TouchableOpacity
              key={index}
              onPress={() =>{


                // clear the order when User goes back to Restuarant screen
                // prevent user order from two restaurant and add into the same order
                // TODO: better implement to save the draft for different restaurant for each order
                props.clearItems();
                props.updateCheckout({
                  store: {
                    id: res.id,
                    address: res.address,
                    phone: res.phone,
                    hour: res.hour,
                    name: res.name,
                    email: res.email
                  }
                })
                props.copyMenu({...res.menu})
                props.navigation.navigate("Menu", { title: res.name + " " + index })
              }}
              activeOpacity={0.75}
            >
            <Card key={index} title={res.name + " " + index} image={require("../../images/pic2.jpg")} containerStyle={styles.cardborder}>
              <Text style={styles.card}>
                {res.description}
              </Text>
            </Card>
            </TouchableOpacity>
          </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default subscribe()(RestaurantScreen);

const styles = StyleSheet.create({
  card: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12
  },
  cardborder: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 10,
  }
});
