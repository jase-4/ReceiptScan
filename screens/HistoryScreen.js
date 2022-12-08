import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Button, List } from "react-native-paper";
import { useNavigation } from '@react-navigation/core'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  FieldPath,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import moment from "moment";


const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const HistoryScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  
  const navigation = useNavigation()
  const db = getFirestore();
  const auth = getAuth();

  const getReceipts = async () => {
    const uid = auth.currentUser.uid;

    console.log("Looking for " + uid);

    const userReceiptsRef = collection(db, `users/${uid}/receipts`);
    const userRef = doc(db, "users", uid);
    const data = await getDocs(userReceiptsRef);

    // date: doc.id,
    // items: doc.data()

    let receipts = [];

    data.docs.map((doc) => {
      let receipt = {};
      const items = doc.data();

      receipt = {};
      receipt.id = doc.id;
      receipt.items = items;
      receipt.totalPrice = 0;

      const date = new Date(receipt.id);
      receipt.date = moment(date).format("dddd MMM D - YYYY");

      for (const name in items) {
        if (Object.hasOwnProperty.call(items, name)) {
          const item = items[name];
          receipt.totalPrice += parseFloat(item.price);
        }
      }

      receipts.push(receipt);
    });

    setLoading(false);
    setData(receipts);
  };

  useEffect(() => {
    getReceipts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
    <Button 
        onPress={() => {
          navigation.replace("Home")
        }}
        icon="chevron-left"
      >
        Back
      </Button>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <List.Item
              title={item.date}
              description={formatter.format(item.totalPrice)}
              left={(props) => <List.Icon {...props} icon="receipt" />}
              onPress={() => {
                navigation.replace("Receipt", {
                  receiptData: item
                })
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default HistoryScreen;
