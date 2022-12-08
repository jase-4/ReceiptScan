import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Button, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ReceiptScreen = ({ route, navigation }) => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { receiptData } = route.params;
  const items = receiptData.items;
  console.log(receiptData);

  const generateData = async () => {
    let renderData = [];

    for (const name in items) {
      if (Object.hasOwnProperty.call(items, name)) {
        const item = items[name];
        renderData.push({
          name: name,
          price: item.price,
        });
      }
    }

    setLoading(false);
    setData(renderData);
  };

  useEffect(() => {
    generateData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button 
        onPress={() => {
          navigation.replace("History")
        }}
        icon="chevron-left"
      >
        Back
      </Button>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.textWrapper}>
            <Text style={styles.receiptInfo}>
              {receiptData.date}
            </Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                right={() => {
                  return <Text>{formatter.format(item.price)}</Text>;
                }}
              />
            )}
          />

          <View style={styles.textWrapper}>
            <Text style={styles.receiptInfo}>
              Total Price: {formatter.format(receiptData.totalPrice)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
  receiptInfo: {
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 0,
    width: '100%',
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
