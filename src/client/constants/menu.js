
const candle = { id: 'h1', label: 'Candle', icon: 'home', link: '/' };
const dendrogram = { id: 'h6', label: 'Dendrogram', icon: 'help', link: '/dendrogram' };
const box = { id: 'h3', label: 'Box Plot', icon: 'help', link: '/box' };

export default {
  main: {
    id: 'main',
    content: [
      {
        label: 'Utils',
        content: [candle, dendrogram,box],
      },
    ],
  },
};
