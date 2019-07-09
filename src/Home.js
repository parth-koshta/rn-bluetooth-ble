import React, { Component } from "react";
import { View, Text, PermissionsAndroid } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { Observable, pipe } from "rxjs";
import evaluate from "./SwingLogic";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      one: [],
      two: [],
      three: [],
      final: [],
      device: ""
    };
    this.manager = new BleManager();
    
  }
  CHARACTERISTIC_ARRAY = [];
  componentWillMount() {
    const subscription = this.manager.onStateChange(state => {
      console.log(state);
      if (state === "PoweredOn") {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }



  characteristicOne = () => {
    return new Observable(observer => {
      this.manager.monitorCharacteristicForDevice(
        this.state.device.id,
        "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
        "beb5484e-36e1-4688-b7f5-ea07361b26a8",
        (error, char) => {
          observer.next(char.value);
        }
      );
    });
  };

  characteristicTwo = () => {
    return new Observable(observer => {
      this.manager.monitorCharacteristicForDevice(
        this.state.device.id,
        "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
        "beb5485e-36e1-4688-b7f5-ea07361b26a8",
        (error, char) => {
          observer.next(char.value);
        }
      );
    });
  };

  characteristicThree = () => {
    return new Observable(observer => {
      this.manager.monitorCharacteristicForDevice(
        this.state.device.id,
        "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
        "beb5486e-36e1-4688-b7f5-ea07361b26a8",
        (error, char) => {
          observer.next(char.value);
        }
      );
    });
  };

  async scanAndConnect() {
    await this.manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log(error);

        return;
      }
      console.log("Scanning...");
      console.log(device);
      if (device.name == "ANTON") {
        this.setState({ device });

        await this.manager.stopDeviceScan();
        console.log(await this.manager.isDeviceConnected(this.state.device.id));

        // if(await this.manager.isDeviceConnected(this.state.device.id) == true){
        //   console.log("cancelling");

        //   await this.manager.cancelDeviceConnection(this.state.device.id);
        // }
        await this.manager.connectToDevice(this.state.device.id);
        console.log(await this.manager.isDeviceConnected(this.state.device.id));

        const deviceConnected = await device.isConnected();
        console.log("=>", deviceConnected);
        await device.discoverAllServicesAndCharacteristics();

        // await Promise.all([
        //   this.manager.monitorCharacteristicForDevice(
        //     device.id,
        //     "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
        //     "beb5484e-36e1-4688-b7f5-ea07361b26a8",
        //     (error, char) => {
        //       console.log("1", atob(char.value));
        //       this.setState({ one: atob(char.value) });
        //     }
        //   ),
        //   this.manager.monitorCharacteristicForDevice(
        //     device.id,
        //     "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
        //     "beb5485e-36e1-4688-b7f5-ea07361b26a8",
        //     (error, char) => {
        //       this.setState({ two: atob(char.value) });
        //     }
        //   ),
        //   this.manager.monitorCharacteristicForDevice(
        //     device.id,
        //     "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
        //     "beb5486e-36e1-4688-b7f5-ea07361b26a8",
        //     (error, char) => {
        //       this.setState({ three: atob(char.value) });
        //     }
        //   )
        // ]);

        this.characteristicOne().subscribe(char => {
          let charOneArray = atob(char)
            .trim()
            .split(",")
            .map(ite => {
              return ite.trim();
            });
          console.log(charOneArray);
          
          this.setState({ one: charOneArray });
          // console.log(this.state.one)
        });

        this.characteristicTwo().subscribe(char => {
          let charTwoArray = atob(char)
            .trim()
            .split(",")
            .map(ite => {
              return ite.trim();
            });
            this.setState({ two: charTwoArray });

            // evaluate(this.state.one[1], this.state.two[2], this.state.one[3], this.state.two[0], this.state.two[1], this.state.two[2])
        });

        // this.characteristicThree().subscribe(char => {
        //   let charThreeArray = atob(char)
        //     .trim()
        //     .split(",")
        //     .map(ite => {
        //       return ite.trim();
        //     });
        // });

      }

      if (error) {
        console.log(error.message);
        return;
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.device != nextState.device) {
      return true;
    }
    return false;
  }

  render() {

    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

export default Home;
