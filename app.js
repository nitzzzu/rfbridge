const lirc = require('lirc-client')({
    host: '127.0.0.1',
    port: 8765
  });
  
  lirc.on('connect', () => {
    //   lirc.send('VERSION').then(res => {
    //       console.log('LIRC Version', res);
    //   });
  });
  
  lirc.on('receive', function (remote, button, repeat) {
      console.log('button ' + button + ' on remote ' + remote + ' was pressed!' + ' ' + repeat);
  });