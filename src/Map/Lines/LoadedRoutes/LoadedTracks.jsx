import { Polyline } from "react-leaflet";
import { useTracksListContext } from "../../../../CustomHooks/TracksListContext";
import { useWidgetsStatusContext } from "../../../../CustomHooks/WidgetsStatusContext";
import CustomMarker from "../../CustomMarker/CustomMarker";
import { useParametersContext } from "../../../../CustomHooks/ParametersContext";

export default function LoadedTracks() {
    const { tracksList, setTracksList } = useTracksListContext();
    const { widgetStatus } = useWidgetsStatusContext();
    const { parameters } = useParametersContext();
    const activeTrack = tracksList.find(item => item.active === true);

    const colorSet = {
        "#2172D4": "#1F5393",
        "#ffe100": "#ffc400",
        "#47ba00": "#358a00",
        "#fca800": "#c28100"
    }
    
    const typeTable ={
        0: "note",
        1: "sight",
        2: "danger",
        3: "halt",
    }

    function changeHighlightingID(id) {
        setTracksList(tracksList.map(t => t.id == id ? {...t, active: !t.active} : {...t, active: false}))
    }

    return(
        <>
            {tracksList.filter(track => parameters.length !== undefined ? Math.floor(track.length/1000) < parameters.length : track).map(track => <Polyline positions={track.cordinates.map(point => [point.cords[0], point.cords[1]])} 
                                            key={track.id}
                                            pathOptions={{color: track.active ? colorSet[track.color]: track.color, weight: track.active ? 8 : 6}} 
                                            eventHandlers={{click: () => {if (!Object.values(widgetStatus).some(value => value === true)) changeHighlightingID(track.id)}}} 
                                            />)}
            {activeTrack !== undefined ? activeTrack.checkpoints.map(point => <CustomMarker key={Math.random().toString(16).slice(2)} position={[point.x, point.y]} type={typeTable[point.type]} isPopup={false}/>) : null}
        </>
    );
}