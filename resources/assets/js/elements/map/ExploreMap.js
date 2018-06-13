import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { PlaceMarker } from './PlaceMarker'



const GMap = withScriptjs(withGoogleMap((props) => 
<GoogleMap
  ref={props.onMapMounted}
  onZoomChanged={props.handleMapChanged}
  onDragEnd={props.handleMapChanged}
  onBoundsChanged={props.handleMapFullyLoaded}
  defaultCenter={props.center}
  defaultZoom={props.zoom}
>
    {
      props.places.length > 0 && props.places.map(place => (
        <PlaceMarker lat={50.8504500}
                     lng={4.3487800}
                     description={'Description'}
                     name={'Hotel'}
                     price={'10'} />
      ))
    }
  </GoogleMap>
))



export class ExploreMap extends Component {
  constructor(props) {
    super(props)

    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false
    this.zoom = 11

    this.state = {
      places: [],
      lat: 50.8504500,
      lng: 4.3487800
    };
  }


  handleMapChanged = () => {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }

  handleMapMounted(map) {
    this.map = map
  }

  handleMapFullyLoaded = () => {
    if (this.mapFullyLoaded)
      return

    this.mapFullyLoaded = true
    this.handleMapChanged()
  }
 vb
  setMapCenterPoint = () => {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

  fetchPlacesFromApi = () => {
    const place = <PlaceMarker lat={50.8504500} lng={4.3487800} price={20} name={"Hotel"} description={"Hotel desc"} />
    this.setState({ places: [place] })
  }

  getMapBounds = () => {
    var mapBounds = this.map.getBounds()
    var xMapBounds = mapBounds.b
    var yMapBounds = mapBounds.f

    this.xMapBounds.min = xMapBounds.b
    this.xMapBounds.max = xMapBounds.f

    this.yMapBounds.min = yMapBounds.f
    this.yMapBounds.max = yMapBounds.b
  }


  render() {

    const {lat, lng, places} = this.state


    return(
      <div style={{width: `100%`, height: `100%`}}>
        <GMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCC05oXLKKEeKpwJS0zD6A_5CQgRSXkA7Q&v=3.exp&libraries=geometry,drawing,places"
          onMapMounted={this.handleMapMounted.bind(this)}
          handleMapChanged={this.handleMapChanged.bind(this)}
          handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}

          center={{
            lat: lat,
            lng: lng
          }}
          places={places}
          zoom={this.zoom}
          loadingElement={
            <div style={{ height: `100%` }} />
          }
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
      </div>
    );
  }
}

export default ExploreMap