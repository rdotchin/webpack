// ES6 version of require export
/*import notify from './Notification';*/
/*
import notification from './Notification';

notify("Hello");
log("World!");*/

//import notification from './Notification';

/*notification.notify('hello');
notification.log('world');*/

/*
don't need to reference this since it's in the app entry point in webpack.config
require('./main.scss');*/

class Form {
    constructor() {
        let numbers = [5, 10, 15].map(number => number *2);
        console.log(numbers);
    }
}

new Form();

import zelda from './images/zelda.jpg';
