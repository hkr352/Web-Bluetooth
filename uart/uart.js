//uart.js
const DEVICE_NAME = 'BBC micro:bit';

const UART_SERVICE                    ='6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const UART_TX_SERVICE_CHARACTERISTICS ='6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const UART_RX_SERVICE_CHARACTERISTICS ='6e400003-b5a3-f393-e0a9-e50e24dcca9e';

//const DEVICE_NAME_PREFIX = 'PLEN2'//'BBC micro:bit'
//'E1F40469-CFE1-43C1-838D-DDBC9DAFDDE6'

const SERVICE_UUID = UART_SERVICE;
const CHARACTERISTIC_UUID_1 = UART_TX_SERVICE_CHARACTERISTICS;
const CHARACTERISTIC_UUID_2 = UART_RX_SERVICE_CHARACTERISTICS;

let characteristic;
let connectDevice;

function connect () {
	navigator.bluetooth.requestDevice({
		filters: [{
		  namePrefix: DEVICE_NAME
		}],
		optionalServices: [SERVICE_UUID]
	})
    .then(device => {
      connectDevice = device;
      console.log('device', device);
      return device.gatt.connect();
    })
    .then(server => {
        return server.getPrimaryService(SERVICE_UUID);
        /*
        server.getPrimaryService(SERVICE_UUID)
          .then(service => {
          // start service is here
          startService(service, CHARACTERISTIC_UUID) // start service
        })*/

    })
    .then(service => {
        //return service.getCharacteristic(CHARACTERISTIC_UUID_1);
        service.getCharacteristic(CHARACTERISTIC_UUID_1)
            .then(characteristic1 => {
          //characteristic1.writeValue(new Uint16Array([INTERVAL]))
          characteristic1.startNotifications();
          characteristic1.addEventListener('characteristicvaluechanged',onCharacteristicValueChanged);
        })
        service.getCharacteristic(CHARACTERISTIC_UUID_2)
            .then(characteristic2 => {
          characteristic=chara;
          //characteristic.writeValue(new Uint16Array([INTERVAL]))
        })
    })
    /*
    .then(chara => {
        alert("BLE connected");
        characteristic=chara;
        characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged',onCharacteristicValueChanged);
    })
    */
    .catch(error => {
        alert("BLE error");
    });
}

function post () {
	//characteristic.writeValue(new Uint8Array([1]));
  characteristic.writeValue("neko");
	console.log("送信したはず");
}

function disconnect () {
  postDisconnect();
  if (!connectDevice || !connectDevice.gatt.connected) return
  connectDevice.gatt.disconnect();
  alert(MSG_DISCONNECTED);
}

function postDisconnect () {
  document.js.buttonA.value = ''
  document.js.buttonB.value = ''
}


function onCharacteristicValueChanged(e) {
    var str_arr=[];
    for(var i=0;i<this.value.byteLength;i++){
        str_arr[i]=this.value.getUint8(i);
    }
    var str=String.fromCharCode.apply(null,str_arr);
    alert("msg:"+str);
}
