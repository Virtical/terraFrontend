import { useEffect } from "react";
import { useMarkerParamsContext } from "../../../../CustomHooks/MarkerParamsContext";
import CustomMarker from "../../CustomMarker/CustomMarker";

export default function MarkerLine({GetCoords}) {
    const { creationMarkerParams, setCreationMarkerParams } = useMarkerParamsContext();

    const handleMapClick = (latlng) => {
        setCreationMarkerParams((prev) => ({
            ...prev,
            position: [latlng.lat, latlng.lng],
          }))
    }

    const typeTable ={
        0: "note",
        1: "sight",
        2: "danger",
        3: "halt",
    }

    return (
        <>
            <GetCoords onClick={handleMapClick} />
            {creationMarkerParams.position.length === 2 ? <CustomMarker position={creationMarkerParams.position} type={typeTable[creationMarkerParams.type]} isPopup={false}/> : null}
        </>
    )
}