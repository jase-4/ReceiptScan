import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
const { createWorker } = require('tesseract.js'); 
import { Camera } from "expo-camera";
import {dataUriToBuffer} from 'data-uri-to-buffer';

var scanImage = async (image, callback) => {

  const worker = await createWorker();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(image);
  await worker.terminate();

  console.log(text);

  callback(text);
};

function parseText(text) {
  const lines = text.split("\n");
  let items = [];
  let start = false;

  for (let i = 0; i < lines.length; i++) {
    if (
      !start &&
      lines[i].substring(0, 2).toLowerCase().localeCompare("st") == 0
    ) {
      start = true;
      continue;
    }
    if (
      start &&
      lines[i].substring(0, 5).toLowerCase().localeCompare("total") == 0
    ) {
      items.push(lines[i]);
      return items;
    }

    if (start) {
      items.push(lines[i]);
    }
  }
}

var findTotal = (items) => {
  let totalLine = items[items.length - 1];
  const parts = totalLine.split(" ");
  if (parts[1].includes(",")) {
    parts[1] = parts[1].replace(",", ".");
  }

  return parseFloat(parts[1]);
};

var findItems = (itemsArr) => {
  const map = new Map();

  for (let i = 0; i < itemsArr.length; i++) {
    if (
      itemsArr[i].toLowerCase().includes("subtotal") ||
      itemsArr[i].toLowerCase().includes("tax") ||
      itemsArr[i].toLowerCase().includes("total")
    ) {
      continue;
    }

    let words = itemsArr[i].split(" ");
    let itemName = "";
    let price = 0.0;

    for (let j = 0; j < words.length; j++) {
      if (words[j].includes(".")) {
        price = parseFloat(words[j]);
      }
      if (/[0-9]/.test(words[j]) || words[j].localeCompare("X") == 0) {
        continue;
      }

      itemName += words[j] + " ";
    }

    itemName = itemName.trim();
    let tags = [];

    let val = new Map();
    val.set("price", price);
    val.set("tags", tags);

    map.set(itemName, val);
  }

  return map;
};

function callback(data) {
  let parsedData = parseText(data);
  let total = findTotal(parsedData);
  let receiptMap = findItems(parsedData);

  let currentDate = new Date();
  let dateTime =
    currentDate.getMonth() +
    1 +
    "/" +
    currentDate.getDate() +
    "/" +
    currentDate.getFullYear() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  console.log(total);
  console.log(receiptMap);
  console.log(dateTime);
}

const CameraScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status == "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);

      setImage(data.uri);
    }
  };

  /*
  const uploadImage = () => {
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;

    storage().ref(filename).putFile(uploadUri);
  }
  */

  const scanReceipt = () => {
    console.log(image);
    scanImage(image, (text) => {
      console.log(text);
    });
  };

  if (hasCameraPermission == false) {
    return <Text>Unable to access camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      <Button
        title="Flip Camera View"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      <Button title="Scan Receipt" onPress={() => scanReceipt()} />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
