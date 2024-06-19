export default function InfoWindow({track}){
    return (
        track !== undefined 
        ?
            <div className="infoWindow">
                <h1>{track.name}</h1>
            </div>
        :
        null
    );
}