import React, { useRef, useEffect, useState, Component } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2xhdmFpZGVyIiwiYSI6ImNrbHhxY20xNDF2bDEyb3Azc2h6M3gydW4ifQ.lIJ0H5bCqxE7JmW892Hc6g";

class ModalMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.mapLon,
      lat: this.props.mapLat,
      zoom: 11,
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    this.getMap();
  }

  getMap() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({ lng: this.props.mapLon });
      this.setState({ lat: this.props.mapLat });
      this.getMap();
    }
  }

  render() {
    return (
      <>
        <div
          className={`modal_wrapper ${this.props.isOpened ? "open" : "close"}`}
          style={{ ...this.props.style }}
        >
          <div className="modal_body" onClick={(e) => e.stopPropagation}>
            <div className="modal_close" onClick={this.props.onModalClose}>
              X
            </div>
            <div ref={this.mapContainer} className="map" />
          </div>
        </div>
      </>
    );
  }
}

export default ModalMap;
