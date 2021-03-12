import React, { Component, createRef } from "react";
//import * as ELG from "esri-leaflet-geocoder";
import dynamic from "next/dynamic";
import { Map } from "react-leaflet-universal";
import MapView from "./map"

const ModalMap = (props) => {
  const MapWithNoSSR = dynamic(() => import("./map"), { ssr: false });
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
        {props.children}
      </div>
    </div>
  );
};

export default ModalMap;
