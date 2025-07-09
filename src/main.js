/**************************************************************************
 *  Cesium Demo                                                          * 
 *  Flight over Manhattan                                                *
 **************************************************************************/

import { startOpenSkyFlights } from './third-party-integrations/opensky.js';

// ------------------------------------------------------------------
// Auth
// ------------------------------------------------------------------
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmODg1NDQ4NS02Mzg4LTQ2ZjgtOGUxNy05Yjg5OWI1OGRjNjciLCJpZCI6ODIwNzIsImlhdCI6MTc1MTIzNTUxMX0.nb_x6vP8r1vOuCt0zo4yDw_p9SVxJk9zhUw9PwEJViM";   // <-- paste token

// ------------------------------------------------------------------
// Viewer with global curated data (World Terrain)
// ------------------------------------------------------------------
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
  animation: true,
  timeline : true,
});


// ------------------------------------------------------------
// Add Manhattan dataset from Cesium Ion
// This is a custom asset ID for a 3D tileset of Manhattan.
// ------------------------------------------------------------
const MANHATTAN_MODEL_ID = 3523558;
try {
  const manhattanTileset = await Cesium.Cesium3DTileset.fromIonAssetId(MANHATTAN_MODEL_ID);
  viewer.scene.primitives.add(manhattanTileset);
  viewer.flyTo(manhattanTileset);
} catch (err) {
  console.warn(`Custom asset ${MANHATTAN_MODEL_ID} not ready or bad id`);
}


// ------------------------------------------------------------
// OpenSky Network Live Aircraft Visualization for Manhattan
// ------------------------------------------------------------

// Start OpenSky flights with a refresh every 2 seconds (2000 ms)
const stopOpenSky = startOpenSkyFlights(viewer, 2000);

