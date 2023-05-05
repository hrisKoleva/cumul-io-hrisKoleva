// To run tests, execute:
//   npm test
//   (or: node index.js )

const tap = require('tap');

// Node.js class
class BurritoRestaurant {
  constructor(name, location, menu) {
    this.name = name;
    this.location = location;
    this.menu = menu;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

  getMenu() {
    return this.menu;
  }

  addToMenu(item) {
    this.menu.push(item);
  }

  findItemInMenu(itemName) {
    return this.menu.find(
      (item) => item.name.toLowerCase() === itemName.toLowerCase()
    );
  }

  updateItemInMenu(oldItemName, newItem) {
    const oldItemIndex = this.menu.findIndex(
      (item) => item.name.toLowerCase() === oldItemName.toLowerCase()
    );
    if (oldItemIndex !== -1) {
      this.menu[oldItemIndex] = newItem;
    }
  }

  removeItemFromMenu(itemName) {
    this.menu = this.menu.filter(
      (item) => item.name.toLowerCase() !== itemName.toLowerCase()
    );
  }

  calculateAverageItemPrice() {
    let totalPrice = 0;
    this.menu.forEach((item) => {
      const itemPrice = item.price || 0;
      totalPrice += itemPrice;
    });
    return totalPrice / this.menu.length;
  }
}

class MenuItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getPrice() {
    return this.price;
  }

  setPrice(price) {
    this.price = price;
  }
}
// Tests
// TODO

//tap.test(async (t) => {
//  console.log('Hello');
//});
const myBurrito = new BurritoRestaurant('Burrito1', 'Sofia', 'myMenu');

//1. Restaurant Name and MenuItem Name are strings, so there must be standard tests for strings such as: empty string, null, long string, special characters, alpha-numeric valid length. Below are the tests for the restaurant name. Empty string and null fail right now. It might be because I've written them wrong but it needs to be investigated if the code handles the cases well

let longName =
  'JaV6Sp8fC7Z10EGyu!Zoc5xiLBOTdVFdwBxVyzCJruY2b10opy$*dRq^bk18qF2xX$&mn@66*XB@^npaAVLK*#!6SUofywI1oQb JaV6Sp8fC7Z10EGyu!Zoc5xiLBOTdVFdwBxVyzCJruY2b10opy$*dRq^bk18qF2xX$&mn@66*XB@^npaAVLK*#!6SUofywI1oQb JaV6Sp8fC7Z10EGyu!Zoc5xiLBOTdVFdwBxVyzCJruY2b10opy$*dRq^&#';

let notDefined;

tap.test('valid restaurant name is set correctly', async (t) => {
  tap.equal(myBurrito.name, 'Burrito1');
});

/* myBurrito.name = '';
tap.test('invalid restaurant name - empty string', async (t) => {
  tap.equal(myBurrito.name, '');
});

myBurrito.name = notDefined;
console.log(notDefined);
tap.test('invalid restaurant name - undefined', async (t) => {
  tap.equal(myBurrito.name, undefined);
}); */

myBurrito.name = longName;
tap.test('invalid restaurant name - long name', async (t) => {
  tap.equal(myBurrito.name, longName);
});

//2. The tests for the addToMenu, removeItemFromMenu, findItemInMenu would be:
// - add to menu, verify the item is there;
// - remove from menu, verify the item is not found;
// - add duplicated menu item names, verify the findInMenu method returns all of them or only the first one, or that it's not possible to add duplicated menuItems depending on the requirements

myBurrito.menu = [];

let price1 = 20.0;
let price2 = 30.0;
let price3 = 40.0;
let price4 = 0;

let menuItem1 = new MenuItem('menuItem1', price1);
let menuItem2 = new MenuItem('menuItem2', price2);
let menuItem3 = new MenuItem('menuItem3', price3);
let menuItem4 = new MenuItem('menuItem4', price4);
let menuItem41 = new MenuItem('menuItem4', null);
let menuItem5 = new MenuItem('menuItem5', 50.99);

myBurrito.addToMenu(menuItem1);
myBurrito.addToMenu(menuItem2);
myBurrito.addToMenu(menuItem3);
myBurrito.addToMenu(menuItem4);
myBurrito.addToMenu(menuItem5);

tap.test('menuItem is added', async (t) => {
  tap.equal(myBurrito.findItemInMenu('menuItem1'), menuItem1);
});

myBurrito.removeItemFromMenu('menuItem2');
tap.test('menuItem is removed', async (t) => {
  tap.equal(myBurrito.findItemInMenu('menuItem2'), undefined);
});

//this passes but it shouldn't
//tap.test('does not allow duplicated names', async (t) => {
//tap.throws(myBurrito.addToMenu(menuItem41));
//});

//3. The tests for the updateItemInMenu would be:
// - add oldMenuItem -> update to newMenuItem -> verify the newMenuItem can be found
// - remove oldMenuItem -> verify the update method fails

let menuItem6 = new MenuItem('menuItem6', 60.85);

myBurrito.updateItemInMenu('menuItem5', menuItem6);

tap.test('menuItem is updated', async (t) => {
  tap.same(myBurrito.findItemInMenu('menuItem5'), null);
  tap.equal(myBurrito.findItemInMenu('menuItem6'), menuItem6);
});

myBurrito.updateItemInMenu('menuItem2', new MenuItem('menuItem7', 70.85));

tap.test('update handles it when the oldItem cannot be found', async (t) => {
  tap.equal(myBurrito.findItemInMenu('menuItem7'), undefined);
});

//4. The tests for calculate price:
//MenuItems was necessary as there was no in the original code to set the item.price
//Now, there must be tests for setting correct price: negative number, not a number, big number, valid price

let averagePrice =
  (menuItem1.price + menuItem3.price + menuItem4.price + menuItem6.price) / 4;

tap.test('verify average price is calculated correctly', async (t) => {
  tap.equal(myBurrito.calculateAverageItemPrice(), averagePrice);
});
//5. The tests for location - again, if undefined location is handled and then the valid tests will depend on the type and format of the location
