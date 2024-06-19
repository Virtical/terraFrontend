import './Map.css'
import { MapContainer, TileLayer, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import RulerLine from './Lines/RulerLine/RulerLine.jsx'
import { useWidgetsStatusContext } from '../../CustomHooks/WidgetsStatusContext.jsx';
import { useMapRefContextContext } from '../../CustomHooks/MapRefContext.jsx';
import TrackLine from './Lines/TrackLine/TrackLine.jsx';
import LoadedTracks from './Lines/LoadedRoutes/LoadedTracks.jsx';
import MarkerLine from './Lines/MarkerLine/MarkerLine.jsx';

export default function Map() {

    const { widgetStatus } = useWidgetsStatusContext();
    const { mapRef } = useMapRefContextContext();

    function GetCoordsOfClick({ onClick }) {
        useMapEvents({
            click(e) {
                onClick(e.latlng);
            }
        });
        return null;
    }

    function deg2rad(num) {
        return num * Math.PI / 180;
    }

    function GetDistance(lat_1, lon_1, lat_2, lon_2) {
        const radius_earth = 6371e3;
        const lat1_rad = deg2rad(lat_1);
        const lon1_rad = deg2rad(lon_1);
        const lat2_rad = deg2rad(lat_2);
        const lon2_rad = deg2rad(lon_2);
        const delta_lat = lat2_rad - lat1_rad;
        const delta_lon = lon2_rad - lon1_rad;
    
        const a = Math.sin(delta_lat / 2) * Math.sin(delta_lat / 2) +
                  Math.cos(lat1_rad) * Math.cos(lat2_rad) *
                  Math.sin(delta_lon / 2) * Math.sin(delta_lon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distance = radius_earth * c;
        return distance;
    }



    return (
        <MapContainer 
                    ref={mapRef}
                    zoomControl={false} 
                    attributionControl={false} 
                    className='map'
                    center={[56.837405, 60.656652]} 
                    zoom={13} 
                    doubleClickZoom={false}>
            <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} subdomains={['a', 'b', 'c']}/>

            <LoadedTracks/>

            {widgetStatus.rulerWidget ? <RulerLine GetCoords={GetCoordsOfClick} GetDistance={GetDistance}/> : null}
            {widgetStatus.trackWidget ? <TrackLine GetCoords={GetCoordsOfClick} GetDistance={GetDistance}/> : null}
            {widgetStatus.markerWidget ? <MarkerLine GetCoords={GetCoordsOfClick}/> : null}

        </MapContainer>
    )
}