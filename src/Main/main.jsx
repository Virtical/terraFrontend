import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WidgetsStatusProvider } from '../../CustomHooks/WidgetsStatusContext.jsx';
import { MapRefProvider } from '../../CustomHooks/MapRefContext.jsx';
import { TrackParamsProvider } from '../../CustomHooks/TrackParamsContext.jsx';
import { TracksListProvider } from '../../CustomHooks/TracksListContext.jsx';
import { ParametersProvider } from '../../CustomHooks/ParametersContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <WidgetsStatusProvider>
      <TracksListProvider>
        <ParametersProvider>
          <TrackParamsProvider>
            <MapRefProvider>

              <App />
              
            </MapRefProvider>
          </TrackParamsProvider>
        </ParametersProvider>
      </TracksListProvider>
    </WidgetsStatusProvider>
)