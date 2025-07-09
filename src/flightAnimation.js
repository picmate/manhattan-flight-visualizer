/**************************************************************************
 *  Animates an aircraft flight path                                      *
 **************************************************************************/

import { flightPath } from '../res/flightPathData.js';

export async function animateFlight(viewer) {
  const start = Cesium.JulianDate.now();
  const lastTimeInSeconds = flightPath[flightPath.length - 1][3];
  const stop = Cesium.JulianDate.addSeconds(start, lastTimeInSeconds, new Cesium.JulianDate());

  viewer.clock.startTime = Cesium.JulianDate.addSeconds(start, flightPath[0][3], new Cesium.JulianDate());
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = viewer.clock.startTime.clone();
  viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
  viewer.clock.multiplier = 1;
  viewer.clock.shouldAnimate = false;

  viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime);

  const positionProperty = new Cesium.SampledPositionProperty();
  const polylinePositions = [];

  for (let i = 0; i < flightPath.length; i++) {
    const [lon, lat, height, timeInSeconds] = flightPath[i];
    const time = Cesium.JulianDate.addSeconds(start, timeInSeconds, new Cesium.JulianDate());
    const position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    positionProperty.addSample(time, position);
    polylinePositions.push(position);
  }

  // Create wall connecting polyline to ground
  const groundPositions = flightPath.map(([lon, lat]) =>
    Cesium.Cartesian3.fromDegrees(lon, lat, 0)
  );
  const wallPositions = polylinePositions.concat(groundPositions.slice().reverse());

  viewer.entities.add({
    polygon: {
      hierarchy: wallPositions,
      material: Cesium.Color.YELLOW.withAlpha(0.3),
      perPositionHeight: true
    }
  });

  // Load and animate aircraft model
  const AIRCRAFT_MODEL_ID = 3523558;
  const airplaneUri = await Cesium.IonResource.fromAssetId(AIRCRAFT_MODEL_ID);
  const airplaneEntity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({ start: viewer.clock.startTime, stop: viewer.clock.stopTime })
    ]),
    position: positionProperty,
    model: {
      uri: airplaneUri,
      minimumPixelSize: 148,
      maximumScale: 200
    },
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    path: new Cesium.PathGraphics({
      width: 3,
      material: Cesium.Color.CYAN
    })
  });

  viewer.trackedEntity = airplaneEntity;
}