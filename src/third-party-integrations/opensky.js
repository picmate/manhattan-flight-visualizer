/**************************************************************************
 *  Displays Live OpenSky Network Aircraft Data over Manhattan            *
 **************************************************************************/

let openSkyAircraftEntities = [];
let refreshTimerId = null;

/**
 * Starts fetching and displaying OpenSky flights periodically.
 * @param {Cesium.Viewer} viewer - Cesium viewer instance.
 * @param {number} refreshIntervalMs - Refresh interval in milliseconds.
 * @returns {function} stop function to cancel periodic refresh.
 */
export function startOpenSkyFlights(viewer, refreshIntervalMs = 30000) {
  async function fetchAndDisplay() {
    // Remove previous aircraft entities
    openSkyAircraftEntities.forEach(entity => viewer.entities.remove(entity));
    openSkyAircraftEntities = []; // Reset the array for new data

    const url = 'https://opensky-network.org/api/states/all?lamin=40.68&lomin=-74.05&lamax=40.85&lomax=-73.85';

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch OpenSky data');
      const data = await response.json();

      if (data.states) {
        data.states.forEach(state => {
          const lon = state[5];
          const lat = state[6];
          const alt = state[7];
          const callsign = state[1];

          if (lon !== null && lat !== null && alt !== null) {
            const entity = viewer.entities.add({
              position: Cesium.Cartesian3.fromDegrees(lon, lat, alt),
              point: {
                pixelSize: 8,
                color: Cesium.Color.RED.withAlpha(0.7)
              },
              label: {
                text: callsign ? callsign.trim() : '',
                font: '12px sans-serif',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -12)
              }
            });
            openSkyAircraftEntities.push(entity);
          }
        });
      }
    } catch (e) {
      console.error('OpenSky fetch error:', e);
    }
  }

  // Initial fetch
  fetchAndDisplay();

  // Set up periodic refresh
  refreshTimerId = setInterval(fetchAndDisplay, refreshIntervalMs);

  // Return a stop function to clear the interval if needed. Would be useful for adding a stop button later.
  return function stop() {
    if (refreshTimerId !== null) {
      clearInterval(refreshTimerId);
      refreshTimerId = null;
      // Remove any remaining entities
      openSkyAircraftEntities.forEach(entity => viewer.entities.remove(entity));
      openSkyAircraftEntities = [];
    }
  };
}