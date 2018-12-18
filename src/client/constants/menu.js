
const candle = { id: 'h1', label: 'Candle', icon: 'home', link: '/' };
const dendrogram = { id: 'h6', label: 'Dendrogram', icon: 'help', link: '/dendrogram' };

export default {
  main: {
    id: 'main',
    content: [
      {
        label: 'Utils',
        content: [candle, dendrogram],
      },
    ],
  },
};
