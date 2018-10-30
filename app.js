const lirc_client = require('lirc-client');
const hue = require('node-hue-api');

let host = '192.168.1.10';
let username = 'b1zllTTGsHt5164UPwleqRgXlDd0VlbC7cH9eF7D';

let api = new hue.HueApi(host, username);
let state = hue.lightState.create();

let lirc = new lirc_client({
    host: '127.0.0.1',
    port: 8765
});

lirc.on('connect', () => {
    lirc.send('VERSION').then(res => {
        console.log('LIRC Version', res);
    });
});

lirc.on('receive', async (remote, button, repeat) => {
    console.log('button ' + button + ' on remote ' + remote + ' was pressed');

    if (repeat == 0) {
        switch (button) {
            case 'power':
                let isOn = (await api.lightStatus(1)).state.on;
                if (!isOn) {
                    await api.setLightState(1, state.on());
                } else {
                    await api.setLightState(1, state.off());
                }
                break;
        }
    }
});
