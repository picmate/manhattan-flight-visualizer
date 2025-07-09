/**************************************************************************
 *  Cesium Demo                                                          * 
 *  Flight over Manhattan                                                *
 **************************************************************************/

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
