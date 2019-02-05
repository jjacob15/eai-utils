
const candle = { id: 'h1', label: 'Candle', icon: 'home', link: '/' };
const dendrogram = { id: 'h6', label: 'Dendrogram', icon: 'help', link: '/dendrogram' };
const box = { id: 'h3', label: 'Box Plot', icon: 'help', link: '/box' };
const scatter = { id: 'scatter', label: 'Scatter Plot', icon: 'help', link: '/scatter' };
const biPlot = { id: 'bi', label: 'Bi Plot', icon: 'help', link: '/biplot' };
const correlation = { id: 'correlation', label: 'Correlation Plot', icon: 'help', link: '/correlation' };
const radar = { id: 'radar', label: 'Radar', icon: 'help', link: '/radar' };
const funnel = { id: 'funnel', label: 'Funnel', icon: 'help', link: '/funnel' };

export default {
  main: {
    id: 'main',
    content: [
      {
        label: 'Utils',
        content: [candle, dendrogram, box, scatter, correlation, biPlot, radar, funnel],
      },
    ],
  },
};
