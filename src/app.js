/**
 * BITCAMP 2015 - PENGUIN TEAM
 */

var UI = require('ui');
//var Vector2 = require('vector2');
var ajax = require('ajax');

var the_results = null;

var loading = new UI.Card({
  title: 'Loading.',
  //subtitle: '',
  body: 'Sending Queries...'
});
// var details = new UI.Card({
//   title: 'PRINTNAME',
//   subtitle: 'Done?',
//   body: 'Created:\nUpdated:'
// });

loading.show();

///////////////////////
// Make the request
ajax(
  {
    url: 'https://dl.dropboxusercontent.com/u/120376/TestObject.json',
    type: 'text'
  },
  function(data) {
    // Success!
    console.log("Successfully fetched data! "+data);
    the_results = JSON.parse(data).results;
    console.log("Length: "+the_results.length);
  
    loading.body('SUCCESS');
//    startMain();
//    main.show();
    loading.hide();
    
    /// Set up the menu
    var menu_array = [];
    for (var i = 0; i < the_results.length && i < 5; i++) { 
      menu_array.push({
            title: the_results[i].printjob,
            subtitle: 'Done? '+the_results[i].done
      });
    }
    var menu = new UI.Menu({
      sections: [{
        items: menu_array
      }]
    });
    menu.on('select', function(e) {
      console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
      console.log('The item is titled "' + e.item.title + '"');
//       details.title = the_results[e.itemIndex].printjob;
//       details.subtitle = 'Done? ' + the_results[e.itemIndex].done;
//       details.body = 'Created:'+the_results[e.itemIndex].createdAt+'\nUpdated:'+the_results[e.itemIndex].updatedAt;
//       details.show();
      new UI.Card({
        title: the_results[e.itemIndex].printjob,
        subtitle: 'Done? ' + the_results[e.itemIndex].done,
        body: 'Created:'+the_results[e.itemIndex].createdAt+'\nUpdated:'+the_results[e.itemIndex].updatedAt
      }).show();
    });
    menu.show();
  },
    function(error) {
    // Failure!
    console.log('Failed fetching data: ' + error.error);
    loading.body('FAIL');
  }
   
);

/*// Old body code
function startMain() {
  main.on('click', 'up', function(e) {
    var menu = new UI.Menu({
      sections: [{
        items: [{
          title: 'Pebble.js',
          icon: 'images/menu_icon.png',
          subtitle: 'Can do Menus'
        }, {
          title: 'Second Item',
          subtitle: 'Subtitle Text'
        }]
      }]
    });
    menu.on('select', function(e) {
      console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
      console.log('The item is titled "' + e.item.title + '"');
    });
    menu.show();
  });
  
  main.on('click', 'select', function(e) {
    var wind = new UI.Window();
    var textfield = new UI.Text({
      position: new Vector2(0, 50),
      size: new Vector2(144, 30),
      font: 'gothic-24-bold',
      text: 'Text Anywhere!',
      textAlign: 'center'
    });
    wind.add(textfield);
    wind.show();
  });
  
  main.on('click', 'down', function(e) {
    var card = new UI.Card();
    card.title('A Card');
    card.subtitle('Is a Window');
    card.body('The simplest window type in Pebble.js.');
    card.show();
  });
}
//*/