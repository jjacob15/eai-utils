/**
 * Created by John.Doe on 7/11/2018.
 */
import {
  TOGGLE_SIDEBAR,
  TOGGLE_HEADER_NAVBAR,
  SET_BROWSER_SIZE,
  SET_SELECTED_MENU,
  // SET_LANDING_MENU,
  SET_SELECTED_LANDING_MENU,
  ADD_LANDING_MENU,
  REMOVE_LANDING_MENU,
  SET_MENU,
} from '../constants';
import menu from '../constants/menu';

const initialState = {
  isSmallDevice: false,
  headerMinimized: true,
  displaySideBar: true,
  displayOptionIcons: true,
  // menu: menu.main,
  // landingMenu: {
  //   selected: {},
  //   content: [],
  //   context: null,
  // },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BROWSER_SIZE:
      return {
        ...state,
        isSmallDevice: action.size,
        headerMinimized: action.size ? true : state.headerMinimized,
        displaySideBar: !action.size,
      };
    case TOGGLE_HEADER_NAVBAR:
      return {
        ...state,
        headerMinimized: !state.headerMinimized,
      };
    case TOGGLE_SIDEBAR: {
      return {
        ...state,
        displaySideBar: !state.displaySideBar,
      };
    }
    // case SET_MENU: {
    //   return {
    //     ...state,
    //     menu: action.content,
    //   };
    // }
    // case SET_SELECTED_MENU:
    //   if (action.item.content) {
    //     return {
    //       ...state,
    //       menu: {
    //         ...state.menu,
    //         content: state.menu.content.map(x => ({
    //           ...x,
    //           content: x.content.map(
    //             c =>
    //               c.id === action.item.id
    //                 ? {
    //                     ...c,
    //                     expand: !c.expand,
    //                   }
    //                 : {
    //                     ...c,
    //                     expand: false,
    //                   }
    //           ),
    //         })),
    //       },
    //     };
    //   }
    //   return {
    //     ...state,
    //     menu: {
    //       ...state.menu,
    //       selected: action.item,
    //       content: state.menu.content.map(x => ({
    //         ...x,
    //         content: x.content.map(
    //           c =>
    //             c.id === action.item.id || (action.item.parentId && action.item.parentId === c.id)
    //               ? {
    //                   ...c,
    //                 }
    //               : {
    //                   ...c,
    //                   expand: false,
    //                 }
    //         ),
    //       })),
    //     },
    //   };
    // case SET_LANDING_MENU:
    //   return {
    //     ...state,
    //     landingMenu: {
    //       content: action.content.content,
    //       selected: action.content.content[0],
    //       context: action.content.context,
    //     },
    //   };
    // case ADD_LANDING_MENU:
    //   return {
    //     ...state,
    //     landingMenu: {
    //       content: [].concat(state.landingMenu.content, action.content),
    //       selected: action.content,
    //     },
    //   };
    // case REMOVE_LANDING_MENU:
    //   var newMenu = [
    //     ...state.landingMenu.content.slice(0, action.idx),
    //     ...state.landingMenu.content.slice(action.idx + 1, state.landingMenu.content.length),
    //   ];
    //   return {
    //     ...state,
    //     landingMenu: {
    //       content: newMenu,
    //       selected: newMenu[newMenu.length - 1],
    //     },
    //   };
    // case SET_SELECTED_LANDING_MENU:
    //   return {
    //     ...state,
    //     landingMenu: {
    //       ...state.landingMenu,
    //       selected: action.content,
    //     },
    //   };

    default:
      return state;
  }
};
