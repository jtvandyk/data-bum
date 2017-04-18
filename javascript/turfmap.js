var bbox = [-77.14702606201172, 38.81005601494022, -76.91994639892578, 39.05];

  var map = L.mapbox.map('map').setView([38.8961302513129,-77.04025268554688,], 13);

  var grid = turf.hex(bbox, 0.001);
  var grid = turf.count(grid, pts, 'pt_count');

  var layerGroup = L.layerGroup().addTo(map);

  var hex = L.geoJson(grid, {
    style: function(feature){
      var fillColor,
        ptcount = feature.properties.pt_count;
      if (ptcount >= 20) fillColor = "#E9D362", weight=3, fillOpacity = 0.55;
      else if (ptcount >= 15) fillColor = "#E9D362", wight=2, fillOpacity = 0.35;
      else if (ptcount >= 10) fillColor = "#E9D362", weight=1, fillOpacity = 0.2;
      else if (ptcount >= 5) fillColor = "#E9D362", fillOpacity = 0.1;
      else if (ptcount = 0) fillColor = "#E9D362", fillOpacity = 0;
      else fillColor = "#000000", fillOpacity = 0; // no data
      return { color: false, weight: 0.5, fillColor: fillColor, fillOpacity: fillOpacity };
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup( "<strong>" + feature.properties.pt_count + "</strong>")
    }
    }).addTo(layerGroup);

  L.geoJson(pts, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 1,
        fillColor: '#fff',
        fillOpacity: 0.4,
        stroke: false
      });
    }
  }).addTo(layerGroup);

  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    {
      attribution: 'Map tiles by <a href="http://cartodb.com/attributions">CartoDB</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL,</a>',
      maxZoom: 17,
      minZoom: 9
    }).addTo(map);
