import Toolbar from '../Toolbar/Toolbar'
import Map from '../Map/Map'
import { useWidgetsStatusContext } from '../../CustomHooks/WidgetsStatusContext.jsx';
import TrackWindow from '../Map/Windows/TrackWindow/TrackWindow.jsx';
import { UploadTracksData, useTracksListContext } from '../../CustomHooks/TracksListContext.jsx';
import { useEffect } from 'react';
import MarkerWindow from '../Map/Windows/MarkerWindow/MarkerWindow.jsx';
import { MarkerParamsProvider } from '../../CustomHooks/MarkerParamsContext.jsx';
import InfoWindow from '../Map/Windows/InfoWindow/InfoWindow.jsx';
import FinderWindow from '../Map/Windows/FinderWindow/FinderWindow.jsx';

export default function App() {
  const { widgetStatus } = useWidgetsStatusContext();
  const { tracksList, setTracksList } = useTracksListContext();

  useEffect(() => {
    UploadTracksData(setTracksList);
  }, [])

  return (
    <main>
      <Toolbar />
      <InfoWindow track={tracksList.find(item => item.active === true)}/>

      <MarkerParamsProvider>
        <Map />
        {widgetStatus.trackWidget ? <TrackWindow/> : null}
        {widgetStatus.markerWidget ? <MarkerWindow/> : null}
        {widgetStatus.magnifierWidget ? <FinderWindow/> : null}
      </MarkerParamsProvider>

    </main>
  )
}