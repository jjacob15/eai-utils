
const line = { id: 'h1', label: 'Line', icon: 'home', link: '/' };
const dendrogram = { id: 'h6', label: 'Dendrogram', icon: 'help', link: '/dendrogram' };

export default {
  main: {
    id: 'main',
    content: [
      {
        label: 'Utils',
        content: [line, dendrogram],
      },
    ],
  },
};
