function fetchItems(steamid, appid) {
  if (!steamid || isNaN(steamid)) {
    alert('Invalid Steam ID');
    return;
  }
  if (!appid || isNaN(appid)) {
    alert('Invalid App ID');
    return;
  }

  var container = document.getElementById('container');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  var url = 'fetchItems.php?steamid=' + steamid + '&appid=' + appid;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var items = JSON.parse(request.responseText)[0];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        var itemElement = document.createElement('div');

        var nameElement = document.createElement('p');
        nameElement.appendChild(document.createTextNode(item.attributes.displayName));

        var imageElement = document.createElement('img');
        imageElement.src = item.icon_url;
        imageElement.alt = item.attributes.displayName;

        itemElement.appendChild(nameElement);
        itemElement.appendChild(imageElement);
        container.appendChild(itemElement);
      }
    } else if (request.readyState == 4 && request.status == 500) {
      alert('Error has occurred while fetching items');
    }
  };
  request.open('GET', url, true);
  request.send();
}

function fetchApps() {
  var steamid = document.getElementById('steamid').value;
  if (!steamid || isNaN(steamid)) {
    alert('Invalid Steam ID');
    return;
  }

  var button = document.getElementsByTagName('button')[0];
  var container = document.getElementById('container');
  button.disabled = true;

  var url = 'fetchApps.php?steamid=' + steamid;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      var apps = JSON.parse(request.responseText);
      for (var i = 0; i < apps.length; i++) {
        var app = apps[i];

        var appElement = document.createElement('a');
        appElement.id = app.appid;
        appElement.href = '#';
        appElement.setAttribute('onclick', 'fetchItems(\'' + steamid + '\',' + app.appid + ')');

        var nameElement = document.createElement('p');
        nameElement.appendChild(document.createTextNode(app.name));

        var imageElement = document.createElement('img');
        imageElement.src = app.icon;
        imageElement.alt = app.name;

        appElement.appendChild(nameElement);
        appElement.appendChild(imageElement);
        container.appendChild(appElement);
      }
      button.disabled = false;
    } else if (request.readyState == 4 && request.status == 500) {
      alert('Error has occurred while fetching apps');
    }
  };
  request.open('GET', url, true);
  request.send();
}
