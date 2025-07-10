# Manhattan Flight Visualizer

A lightweight CesiumJS web app that visualizes a custom flight over Manhattan and overlays live OpenSky traffic.
Live demo: https://picmate.github.io/manhattan-flight-visualizer/ (OpenSky aircrafts may be absent in the hosted build because the demo uses anonymous API access).

## Features

- Streamed World Terrain
- Manhattan 3D Buildings
- Live OpenSky Traffic Layer
- Animated Demo Flight

## Getting Started

### Installation

```bash
git clone https://github.com/picmate/manhattan-flight-visualizer.git
cd manhattan-flight-visualizer
```

### Running the App

```bash
npx serve .

or

python3 -m http.server 8080
```

## Usage

- Add flight data as a JS array of longitude, latitude, height in meters, time in seconds to visualize
- Hit the Cesium play/pause button for the aircraft animation
- Visualize currently active flights in and around Manhattan, NY (updated every minute)
- Zoom out for OpenSky’s live flight traffic to show up


## Limitations

- OpenSky’s anonymous quota is sufficient for an occasional refresh every 60 s during a short demo; no back-end proxy or token refresh is included in the hosted version

## Assumptions

- The Manhattan 3-D tileset was manually aligned and clamped to the terrain in ion before being referenced here; the client code assumes that z-offset is correct
- Heights provided in the flight-path CSV and returned by the OpenSky API are interpreted as height above the WGS-84 ellipsoid. They are not corrected to height above ground
- Each flight-path row contains an absolute offset (seconds after start) rather than a timestamp

## License

MIT

## Acknowledgements

- CesiumJS for 3D geospatial visualization
- Open data sources for Manhattan terrain and buildings
