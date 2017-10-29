import React from 'react';
import ReactDOM from 'react-dom';
import GoogleApiContainer from './GoogleApiContainer';

export class MapContainer extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={{position: 'relative'}}>
        <Map
          google={this.props.google}
          onLocationChange={this.props.onLocationChange}
          locName={this.props.locName}
          locLng={this.props.locLng}
          locLat={this.props.locLat}
          mapId={this.props.mapId}>
          {this.props.children}
        </Map>

      </div>
    )
  }
}

export default GoogleApiContainer({
  apiKey: 'AIzaSyANx2mIntSN2Ss07ZwAdGw0YOPA-bosBhU'
})(MapContainer);

export class Map extends React.Component {
  componentDidMount(){
    this.loadMap();
  }
  componentWillUnmount() {

  }
  loadMap() {
    const onLocationChange = this.props.onLocationChange;
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      let zoom = 14;

      var currentLat = null, currentLng = null;
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;
            console.log(currentLat, currentLng);
          });
      }
      var lat, lng;
      if (this.props.locLat&&this.props.locLng) {
        lat = this.props.locLat||43.653223;
        lng = this.props.locLng||-79.38318429999998;

      } else {
        lat = currentLat||43.653223;
        lng = currentLng||-79.38318429999998;
      }
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        mapTypeControl: true,
        mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          },
      })
      var map = new maps.Map(document.getElementById(this.props.mapId), mapConfig);
      var infoWindow = new google.maps.InfoWindow;

            var marker = new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map
      });

      var input = document.getElementById('searchTextField');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));
          onLocationChange(place);

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
    });
    }
  }
  render() {
    console.log(this.props.mapId);
    return (
      <div>
        {this.props.children}
        <div ref='map' id={this.props.mapId} style={{position: 'relative', height: '300px', zIndex: '0'}}>
          Loading map...
        </div>

      </div>
    )
  }
}

