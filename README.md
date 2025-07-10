# Manhattan Flight Visualizer

A web application for visualizing flight paths over Manhattan using CesiumJS.

## Features

- Cesium Terrain
- 3D Building Models over Manhattan 
- OpenSky Network Realtime Flights over Manhattan
- Display Animated Flight Path

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

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
- Visualize currently active flights in and around Manhattan, NY (updated every one minute)

## Assumptions

- 

## License

MIT

## Acknowledgements

- CesiumJS for 3D geospatial visualization
- Open data sources for Manhattan terrain and buildings
