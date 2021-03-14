import React, { useRef, useEffect, useState, Component } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2xhdmFpZGVyIiwiYSI6ImNrbHhxY20xNDF2bDEyb3Azc2h6M3gydW4ifQ.lIJ0H5bCqxE7JmW892Hc6g";

class ModalMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 10,
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const { zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.props.mapLon, this.props.mapLat],
      zoom: zoom,
    });
  }
  render() {
    console.log(this.props);
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

/* 
const ModalMap = (props) => {

  console.log(props.mapLon, props.mapLat);

  return (
    <div
      className={`modal_wrapper ${props.isOpened ? "open" : "close"}`}
      style={{ ...props.style }}
    >
      <div className="modal_body" onClick={(e) => e.stopPropagation}>
        <div className="modal_close" onClick={props.onModalClose}>
          X
        </div>
        <h2>Карта города {props.title}</h2>
        <div className="map" ref={mapContainer} />
      </div>
    </div>
  );
};

export default ModalMap;
 */
export default ModalMap;
