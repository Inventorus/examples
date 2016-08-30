function getItemDetails(id) {
  if (!id) {
    alert('ID is missing');
    return;
  }

  var container = document.getElementById(id).children[1];

  var url = 'getItem.php?id=' + id;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      var item = JSON.parse(request.responseText);

      var nameElement = document.createElement('li');
      nameElement.appendChild(document.createTextNode('Name: ' + item.name));

      var statusElement = document.createElement('li');
      statusElement.appendChild(document.createTextNode('Status: ' + item.status));

      var appidElement = document.createElement('li');
      appidElement.appendChild(document.createTextNode('AppID: ' + item.appid));

      var contextidElement = document.createElement('li');
      contextidElement.appendChild(document.createTextNode('ContextID: ' + item.contextid));

      container.appendChild(nameElement);
      container.appendChild(statusElement);
      container.appendChild(appidElement);
      container.appendChild(contextidElement);
    } else if (request.readyState == 4 && request.status == 500) {
      alert('Error has occurred while getting item details');
    }
  };
  request.open('GET', url, true);
  request.send();
}

function listWarehouse() {
  var header = document.getElementsByTagName('h1')[0];
  var container = document.getElementById('container');

  var url = 'listWarehouse.php';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      header.remove();
      var warehouse = JSON.parse(request.responseText);
      for (var i = 0; i < warehouse.length; i++) {
        var item = warehouse[i];

        var itemElement = document.createElement('div');
        itemElement.id = item;

        var idElement = document.createElement('a');
        idElement.href = '#';
        idElement.setAttribute('onclick', 'getItemDetails(\'' + item + '\')');
        idElement.appendChild(document.createTextNode('Item #' + i + ' - ' + item));

        itemElement.appendChild(idElement);
        itemElement.appendChild(document.createElement('ul'));
        container.appendChild(itemElement);
      }
    } else if (request.readyState == 4 && request.status == 500) {
      alert('Error has occurred while getting warehouse');
    }
  };
  request.open('GET', url, true);
  request.send();
}

window.onload = listWarehouse;
