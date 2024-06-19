import { useEffect, useRef, useState } from "react";
import { Polyline } from 'react-leaflet';
import CustomMarker from "../../CustomMarker/CustomMarker";

export default function RulerLine({GetCoords, GetDistance}) {
    const [controlPointsOfRuler, setControlPointsOfRuler] = useState([]);
    const [rulerLength, setRulerLength] = useState(0);
    const popRef = useRef(null);

    const handleMapClick = (latlng) => {
        setControlPointsOfRuler((prevPoints) => [...prevPoints, [latlng.lat, latlng.lng]]);
        if (controlPointsOfRuler.length > 0) 
        {
            let length = GetDistance(controlPointsOfRuler[controlPointsOfRuler.length - 1][0], controlPointsOfRuler[controlPointsOfRuler.length - 1][1], latlng.lat, latlng.lng)
            setRulerLength(prev => prev + length)
        }
    };

      useEffect(() => {
        if (popRef.current !== null)
        {
            popRef.current.openPopup();
        }
      }, [popRef.current])

      Array.prototype.last = function() {
        return this[this.length - 1];
    }

    return (
        <>
            <GetCoords onClick={handleMapClick} />
            {controlPointsOfRuler.slice(0, controlPointsOfRuler.length - 1).map(point => <CustomMarker key={Math.random().toString(16).slice(2)} position={point} type={"ruler"} popupSize={[16, 16]} iconAnchor={[8, 8]} popupAnchor={[0,0]} isPopup={false}/>)}
            {controlPointsOfRuler.length > 0 ? <CustomMarker popRef={popRef} length={rulerLength} position={controlPointsOfRuler.last()} type={"ruler"} popupSize={[16, 16]} iconAnchor={[8, 8]} popupAnchor={[0,0]}/> : null}
            <Polyline positions={controlPointsOfRuler} pathOptions={{color: "#707070", weight: 6}}/>
        </>
    )
}