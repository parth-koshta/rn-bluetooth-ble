import React, { Component } from "react";
import { View, Text, PermissionsAndroid } from "react-native";
import { BleManager } from "react-native-ble-plx";

class Home extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
  }
  discoveredDevices=[]
  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }
    //   console.log("scanning", device);
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (this.discoveredDevices.includes(device.id)==false) {
        this.discoveredDevices.push(device.id)
        console.log(device)
        console.log(this.discoveredDevices)

        // device
        //   .connect()
        //   .then(device => {
        //     return device.discoverAllServicesAndCharacteristics();
        //   })
        //   .then(device => {
        //     // Do work on device with services and characteristics
        //     console.log("connected device", device)
        //   })
        //   .catch(error => {
        //     // Handle errors
        //     console.log(error, "error on connection")
        //   });
      }
    });
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange(state => {
      console.log(state);
      if (state === "PoweredOn") {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  render() {
    console.log("discovered",this.discoveredDevices);
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

export default Home;
