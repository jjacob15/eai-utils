import React from 'react';
import Radar from '../ui/charts/radar';

//Data
var d1 = [[
  { axis: "Coffee", value: 10 },
  { axis: "Tea", value: 3 },
  { axis: "Waffles", value: 2 },
  { axis: "Pancakes", value: 7 },
  { axis: "Eggs", value: 4 },
  { axis: "Ice Tea", value: 15 },
  { axis: "Soup", value: 4 },
  { axis: "Sandwich", value: 6 },
  { axis: "Salad", value: 10 },
  { axis: "Pie", value: 15 },
  { axis: "Cookie", value: 25 },
], [
  { axis: "Coffee", value: 20 },
  { axis: "Tea", value: 9 },
  { axis: "Waffles", value: 12 },
  { axis: "Pancakes", value: 35 },
  { axis: "Eggs", value: 24 },
  { axis: "Ice Tea", value: 45 },
  { axis: "Soup", value: 16 },
  { axis: "Sandwich", value: 36 },
  { axis: "Salad", value: 70 },
  { axis: "Pie", value: 45 },
  { axis: "Cookie", value: 25 },

]]

var d2 = [
  [
    { axis: "Email", value: 0.59 },
    { axis: "Social Networks", value: 0.56 },
    { axis: "Internet Banking", value: 0.42 },
    { axis: "News Sportsites", value: 0.34 },
    { axis: "Search Engine", value: 0.48 },
    { axis: "View Shopping sites", value: 0.14 },
    { axis: "Paying Online", value: 0.11 },
    { axis: "Buy Online", value: 0.05 },
    { axis: "Stream Music", value: 0.07 },
    { axis: "Online Gaming", value: 0.12 },
    { axis: "Navigation", value: 0.27 },
    { axis: "App connected to TV program", value: 0.03 },
    { axis: "Offline Gaming", value: 0.12 },
    { axis: "Photo Video", value: 0.4 },
    { axis: "Reading", value: 0.03 },
    { axis: "Listen Music", value: 0.22 },
    { axis: "Watch TV", value: 0.03 },
    { axis: "TV Movies Streaming", value: 0.03 },
    { axis: "Listen Radio", value: 0.07 },
    { axis: "Sending Money", value: 0.18 },
    { axis: "Other", value: 0.07 },
    { axis: "Use less Once week", value: 0.08 }
  ], [
    { axis: "Email", value: 0.48 },
    { axis: "Social Networks", value: 0.41 },
    { axis: "Internet Banking", value: 0.27 },
    { axis: "News Sportsites", value: 0.28 },
    { axis: "Search Engine", value: 0.46 },
    { axis: "View Shopping sites", value: 0.29 },
    { axis: "Paying Online", value: 0.11 },
    { axis: "Buy Online", value: 0.14 },
    { axis: "Stream Music", value: 0.05 },
    { axis: "Online Gaming", value: 0.19 },
    { axis: "Navigation", value: 0.14 },
    { axis: "App connected to TV program", value: 0.06 },
    { axis: "Offline Gaming", value: 0.24 },
    { axis: "Photo Video", value: 0.17 },
    { axis: "Reading", value: 0.15 },
    { axis: "Listen Music", value: 0.12 },
    { axis: "Watch TV", value: 0.1 },
    { axis: "TV Movies Streaming", value: 0.14 },
    { axis: "Listen Radio", value: 0.06 },
    { axis: "Sending Money", value: 0.16 },
    { axis: "Other", value: 0.07 },
    { axis: "Use less Once week", value: 0.17 }
  ]
];
class PlayGround extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <div style={{ height: '450px', width: '450px', float: 'left' }}>
          <Radar
            data={d1}
            style={{ background: 'transparent' }}
            showMarker={false}
            levels={6}
            color={["#1b9e77", "#d95f02", "#7570b3"]} />
        </div>
        <div style={{ height: '450px', width: '450px', marginLeft: '550px' }}>
          <Radar
            data={d2}
            style={{ background: 'transparent' }}
            showMarker={true}
            levels={4}
            pointRadius={4} />
        </div>

      </div>
    );
  }
}

export default PlayGround;
