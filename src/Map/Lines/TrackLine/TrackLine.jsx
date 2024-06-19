import CustomMarker from "../../CustomMarker/CustomMarker";
import { Polyline } from "react-leaflet";
import { useTrackParamsContext } from "../../../../CustomHooks/TrackParamsContext";
import { useWidgetsStatusContext } from "../../../../CustomHooks/WidgetsStatusContext";
import { useTracksListContext } from '../../../../CustomHooks/TracksListContext';

export default function TrackLine({GetCoords, GetDistance}) {
    const { creationTrackParams, setCreationTrackParams } = useTrackParamsContext();
    const { widgetStatus } = useWidgetsStatusContext();
    const { tracksList } = useTracksListContext();

    const handleChangeDistance = (newDistance) => {
        setCreationTrackParams((prev) => ({
            ...prev,
            distance: creationTrackParams.distance + newDistance,
          }))
    }

    const handleChangeControlPoints = (points) => {
        setCreationTrackParams((prev) => ({
            ...prev,
            track: [...creationTrackParams.track, ...points]
          }))
    }

    const transportTable = {
        0 : "bike",
        1 : "car",
        2 : "foot"
    }

    const colorType = {
        0: "#0022ba",
        1: "#d18100",
        2: "#058c00",
        3: "#a62700"
    }

    Array.prototype.last = function() {
        return this[this.length - 1];
    }
    
    Array.prototype.first = function() {
        return this[0];
    }

    const handleMapClick = (latlng) => {
        if (creationTrackParams.mode === 1 || creationTrackParams.track.length === 0) {
            handleChangeControlPoints([[latlng.lat, latlng.lng]]);
            if (creationTrackParams.track > 0) {
                handleChangeDistance(GetDistance(creationTrackParams.track.last()[0], creationTrackParams.track.last()[1], latlng.lat, latlng.lng))
            }
        } else {
            getRequest(creationTrackParams.track.last(), [latlng.lat, latlng.lng]);
        }
    }

    async function getRequest(start, end) {
        let response = await fetch(`https://routing.openstreetmap.de/routed-${transportTable[creationTrackParams.transport]}/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?alternatives=false&geometries=geojson`)
        let data = await response.json()
        let routes = data.routes[0].geometry.coordinates;
        routes.map(p => p.reverse())
        handleChangeControlPoints(routes);
        handleChangeDistance(data.routes[0].distance)
    }

    const typeTable ={
        0: "note",
        1: "sight",
        2: "danger",
        3: "halt",
    }

    return (
        <>
            {!widgetStatus.markerWidget ? <GetCoords onClick={handleMapClick} /> : null}
            {creationTrackParams.track.length > 0 ? <CustomMarker position={creationTrackParams.track.first()} type={"startTrack"} isPopup={false}/> : null}
            {creationTrackParams.track.slice(1, creationTrackParams.track.length-1).map(point => <CustomMarker key={Math.random().toString(16).slice(2)} position={point} type={"intermediateTrack"} popupSize={[14, 14]} iconAnchor={[7, 7]} popupAnchor={[0,0]} isPopup={false}/>)}
            {creationTrackParams.track.length > 1 ? <CustomMarker position={creationTrackParams.track.last()} type={"endTrack"} isPopup={false}/> : null}
            {creationTrackParams.checkpoints.map(point => <CustomMarker key={Math.random().toString(16).slice(2)} position={[point.x, point.y]} type={typeTable[point.type]} isPopup={false}/>)}
            <Polyline positions={creationTrackParams.track} pathOptions={{color: colorType[creationTrackParams.season], weight: 6}}/>
        </>
    )
}