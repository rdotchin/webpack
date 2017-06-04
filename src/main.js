// ES6 version of require export
/*import notify from './Notification';*/
/*
import notification from './Notification';

notify("Hello");
log("World!");*/

import notification from './Notification';

notification.notify('hello');
notification.log('world');

require('./main.scss');

class Form {
    constructor() {
        let numbers = [5, 10, 15].map(number => number *2);
        console.log(numbers);
    }
}

new Form();
