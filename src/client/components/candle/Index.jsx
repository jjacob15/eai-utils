import React from 'react';
import Candlestick from '../ui/charts/candlestick';

var data = [
  { date: '01/02/2018', open: 170, high: 172.300003, low: 169.259995, close: 172.259995, volume: 25555900 },
  { date: '01/03/2018', open: 172.529999, high: 174.550003, low: 171.960007, close: 172.229996, volume: 29517900 },
  { date: '01/04/2018', open: 172.539993, high: 173.470001, low: 172.080002, close: 173.029999, volume: 22434600 },
  { date: '01/05/2018', open: 173.440002, high: 175.369995, low: 173.050003, close: 175, volume: 23660000 },
  { date: '01/08/2018', open: 174.350006, high: 175.610001, low: 173.929993, close: 174.350006, volume: 20567800 },
  { date: '01/09/2018', open: 174.550003, high: 175.059998, low: 173.410004, close: 174.330002, volume: 21584000 },
  { date: '01/10/2018', open: 173.160004, high: 174.300003, low: 173, close: 174.289993, volume: 23959900 },
  { date: '01/11/2018', open: 174.589996, high: 175.490005, low: 174.490005, close: 175.279999, volume: 18667700 },
  { date: '01/12/2018', open: 176.179993, high: 177.360001, low: 175.649994, close: 177.089996, volume: 25418100 },
  { date: '01/16/2018', open: 177.899994, high: 179.389999, low: 176.139999, close: 176.190002, volume: 29565900 },
  { date: '01/17/2018', open: 176.149994, high: 179.25, low: 175.070007, close: 179.100006, volume: 34386800 },
  { date: '01/18/2018', open: 179.369995, high: 180.100006, low: 178.25, close: 179.259995, volume: 31193400 },
  { date: '01/19/2018', open: 178.610001, high: 179.580002, low: 177.410004, close: 178.460007, volume: 32425100 },
  { date: '01/22/2018', open: 177.300003, high: 177.779999, low: 176.600006, close: 177, volume: 27108600 },
  { date: '01/23/2018', open: 177.300003, high: 179.440002, low: 176.820007, close: 177.039993, volume: 32689100 },
  { date: '01/24/2018', open: 177.25, high: 177.300003, low: 173.199997, close: 174.220001, volume: 51105100 },
  { date: '01/25/2018', open: 174.509995, high: 174.949997, low: 170.529999, close: 171.110001, volume: 41529000 },
  { date: '01/26/2018', open: 172, high: 172, low: 170.059998, close: 171.509995, volume: 39143000 },
  { date: '01/29/2018', open: 170.160004, high: 170.160004, low: 167.070007, close: 167.960007, volume: 50640400 },
  { date: '01/30/2018', open: 165.529999, high: 167.369995, low: 164.699997, close: 166.970001, volume: 46048200 },
  { date: '01/31/2018', open: 166.869995, high: 168.440002, low: 166.5, close: 167.429993, volume: 32478900 },
  { date: '02/01/2018', open: 167.169998, high: 168.619995, low: 166.759995, close: 167.779999, volume: 47230800 },
  { date: '02/02/2018', open: 166, high: 166.800003, low: 160.100006, close: 160.5, volume: 86593800 },
  { date: '02/05/2018', open: 159.100006, high: 163.880005, low: 156, close: 156.490005, volume: 72738500 },
  { date: '02/06/2018', open: 154.830002, high: 163.720001, low: 154, close: 163.029999, volume: 68243800 },
  { date: '02/07/2018', open: 163.089996, high: 163.399994, low: 159.070007, close: 159.539993, volume: 51608600 },
  { date: '02/08/2018', open: 160.289993, high: 161, low: 155.029999, close: 155.149994, volume: 54390500 },
  { date: '02/09/2018', open: 157.070007, high: 157.889999, low: 150.240005, close: 156.410004, volume: 70672600 },
  { date: '02/12/2018', open: 158.5, high: 163.889999, low: 157.509995, close: 162.710007, volume: 60819500 },
  { date: '02/13/2018', open: 161.949997, high: 164.75, low: 161.649994, close: 164.339996, volume: 32549200 },
  { date: '02/14/2018', open: 163.039993, high: 167.539993, low: 162.880005, close: 167.369995, volume: 40644900 },
  { date: '02/15/2018', open: 169.789993, high: 173.089996, low: 169, close: 172.990005, volume: 51147200 },
  { date: '02/16/2018', open: 172.360001, high: 174.820007, low: 171.770004, close: 172.429993, volume: 40176100 },
  { date: '02/20/2018', open: 172.050003, high: 174.259995, low: 171.419998, close: 171.850006, volume: 33930500 },
  { date: '02/21/2018', open: 172.830002, high: 174.119995, low: 171.009995, close: 171.070007, volume: 37471600 },
  { date: '02/22/2018', open: 171.800003, high: 173.949997, low: 171.710007, close: 172.5, volume: 30991900 },
  { date: '02/23/2018', open: 173.669998, high: 175.649994, low: 173.539993, close: 175.5, volume: 33812400 },
  { date: '02/26/2018', open: 176.350006, high: 179.389999, low: 176.210007, close: 178.970001, volume: 38162200 },
  { date: '02/27/2018', open: 179.100006, high: 180.479996, low: 178.160004, close: 178.389999, volume: 38928100 },
  { date: '02/28/2018', open: 179.259995, high: 180.619995, low: 178.050003, close: 178.119995, volume: 37782100 },
  { date: '03/01/2018', open: 178.539993, high: 179.779999, low: 172.660004, close: 175, volume: 48802000 },
  { date: '03/02/2018', open: 172.800003, high: 176.300003, low: 172.449997, close: 176.210007, volume: 38454000 },
  { date: '03/05/2018', open: 175.210007, high: 177.740005, low: 174.520004, close: 176.820007, volume: 28401400 },
  { date: '03/06/2018', open: 177.910004, high: 178.25, low: 176.130005, close: 176.669998, volume: 23788500 },
  { date: '03/07/2018', open: 174.940002, high: 175.850006, low: 174.270004, close: 175.029999, volume: 31703500 },
  { date: '03/08/2018', open: 175.479996, high: 177.119995, low: 175.070007, close: 176.940002, volume: 23774100 },
  { date: '03/09/2018', open: 177.960007, high: 180, low: 177.389999, close: 179.979996, volume: 32185200 },
  { date: '03/12/2018', open: 180.289993, high: 182.389999, low: 180.210007, close: 181.720001, volume: 32207100 },
  { date: '03/13/2018', open: 182.589996, high: 183.5, low: 179.240005, close: 179.970001, volume: 31693500 },
  { date: '03/14/2018', open: 180.320007, high: 180.520004, low: 177.809998, close: 178.440002, volume: 29368400 },
  { date: '03/15/2018', open: 178.5, high: 180.240005, low: 178.070007, close: 178.649994, volume: 22743800 },
  { date: '03/16/2018', open: 178.649994, high: 179.119995, low: 177.619995, close: 178.020004, volume: 39404700 },
  { date: '03/19/2018', open: 177.320007, high: 177.470001, low: 173.660004, close: 175.300003, volume: 33446800 },
  { date: '03/20/2018', open: 175.240005, high: 176.800003, low: 174.940002, close: 175.240005, volume: 19649400 },
  { date: '03/21/2018', open: 175.039993, high: 175.089996, low: 171.259995, close: 171.270004, volume: 37054900 },
  { date: '03/22/2018', open: 170, high: 172.679993, low: 168.600006, close: 168.850006, volume: 41490800 },
  { date: '03/23/2018', open: 168.389999, high: 169.919998, low: 164.940002, close: 164.940002, volume: 41028800 },
  { date: '03/26/2018', open: 168.070007, high: 173.100006, low: 166.440002, close: 172.770004, volume: 37541200 },
  { date: '03/27/2018', open: 173.679993, high: 175.149994, low: 166.919998, close: 168.339996, volume: 40922600 },
  { date: '03/28/2018', open: 167.25, high: 170.020004, low: 165.190002, close: 166.479996, volume: 41668500 },
  { date: '03/29/2018', open: 167.809998, high: 171.75, low: 166.899994, close: 167.779999, volume: 38398500 },
  { date: '04/02/2018', open: 166.639999, high: 168.940002, low: 164.470001, close: 166.679993, volume: 37586800 },
  { date: '04/03/2018', open: 167.639999, high: 168.75, low: 164.880005, close: 168.389999, volume: 30278000 },
  { date: '04/04/2018', open: 164.880005, high: 172.009995, low: 164.770004, close: 171.610001, volume: 34605500 },
  { date: '04/05/2018', open: 172.580002, high: 174.229996, low: 172.080002, close: 172.800003, volume: 26933200 },
  { date: '04/06/2018', open: 170.970001, high: 172.479996, low: 168.199997, close: 168.380005, volume: 35005300 },
  { date: '04/09/2018', open: 169.880005, high: 173.089996, low: 169.850006, close: 170.050003, volume: 29017700 },
  { date: '04/10/2018', open: 173, high: 174, low: 171.529999, close: 173.25, volume: 28408600 },
  { date: '04/11/2018', open: 172.229996, high: 173.919998, low: 171.699997, close: 172.440002, volume: 22431600 },
  { date: '04/12/2018', open: 173.410004, high: 175, low: 173.039993, close: 174.139999, volume: 22889300 },
  { date: '04/13/2018', open: 174.779999, high: 175.839996, low: 173.850006, close: 174.729996, volume: 25124300 },
  { date: '04/16/2018', open: 175.029999, high: 176.190002, low: 174.830002, close: 175.820007, volume: 21578400 },
  { date: '04/17/2018', open: 176.490005, high: 178.940002, low: 176.410004, close: 178.240005, volume: 26605400 },
  { date: '04/18/2018', open: 177.809998, high: 178.820007, low: 176.880005, close: 177.839996, volume: 20754500 },
  { date: '04/19/2018', open: 173.759995, high: 175.389999, low: 172.660004, close: 172.800003, volume: 34808800 },
  { date: '04/20/2018', open: 170.600006, high: 171.220001, low: 165.429993, close: 165.720001, volume: 65491100 },
  { date: '04/23/2018', open: 166.830002, high: 166.919998, low: 164.089996, close: 165.240005, volume: 36515500 },
  { date: '04/24/2018', open: 165.669998, high: 166.330002, low: 161.220001, close: 162.940002, volume: 33692000 },
  { date: '04/25/2018', open: 162.619995, high: 165.419998, low: 162.410004, close: 163.649994, volume: 28382100 },
  { date: '04/26/2018', open: 164.119995, high: 165.729996, low: 163.369995, close: 164.220001, volume: 27963000 },
  { date: '04/27/2018', open: 164, high: 164.330002, low: 160.630005, close: 162.320007, volume: 35655800 },
  { date: '04/30/2018', open: 162.130005, high: 167.259995, low: 161.839996, close: 165.259995, volume: 42427400 },
  { date: '05/01/2018', open: 166.410004, high: 169.199997, low: 165.270004, close: 169.100006, volume: 53569400 },
  { date: '05/02/2018', open: 175.229996, high: 177.75, low: 173.800003, close: 176.570007, volume: 66539400 },
  { date: '05/03/2018', open: 175.880005, high: 177.5, low: 174.440002, close: 176.889999, volume: 34068200 },
  { date: '05/04/2018', open: 178.25, high: 184.25, low: 178.169998, close: 183.830002, volume: 56201300 },
  { date: '05/07/2018', open: 185.179993, high: 187.669998, low: 184.75, close: 185.160004, volume: 42451400 },
  { date: '05/08/2018', open: 184.990005, high: 186.220001, low: 183.669998, close: 186.050003, volume: 28402800 },
  { date: '05/09/2018', open: 186.550003, high: 187.399994, low: 185.220001, close: 187.360001, volume: 23211200 },
  { date: '05/10/2018', open: 187.740005, high: 190.369995, low: 187.649994, close: 190.039993, volume: 27989300 },
  { date: '05/11/2018', open: 189.490005, high: 190.059998, low: 187.449997, close: 188.589996, volume: 25806600 },
];

class PlayGround extends React.Component {
  constructor() {
    super();
    this.state = {
      data: data.slice(0, 10),
      current: 10,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    let updated = [].concat(this.state.data, data.slice(this.state.current, this.state.current + 10));
    this.setState(prev => ({
      data: updated,
      current: prev.current + 10,
    }));
  }
  render() {
    const { data } = this.state;
    return (
      <div style={{ height: '500px' }}>
        <button onClick={this.onClick}>Add data</button>
        <Candlestick
          data={data}
          style={{ background: 'transparent' }}
          hideYAxis={true}
          hideYAxisLabel={false}
          hideXAxis={false}
          hideXAxisLabel={false}
          showXGrid={false}
          showYGrid={true}
          hideTooltip={false}
        />
      </div>
    );
  }
}

export default PlayGround;
