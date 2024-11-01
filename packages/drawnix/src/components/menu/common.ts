import React, { useContext } from 'react';
import { EVENT } from '../../constants';
import { composeEventHandlers } from '../../utils/common';

export const MenuContentPropsContext = React.createContext<{
  onSelect?: (event: Event) => void;
}>({});

export const getMenuItemClassName = (
  className = '',
  selected = false
) => {
  return `menu-item menu-item-base ${className} ${
    selected ? 'menu-item--selected' : ''
  }`.trim();
};

export const useHandleMenuItemClick = (
  origOnClick:
    | React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
    | undefined,
  onSelect: ((event: Event) => void) | undefined
) => {
  const MenuContentProps = useContext(MenuContentPropsContext);

  return composeEventHandlers(origOnClick, (event) => {
    const itemSelectEvent = new CustomEvent(EVENT.MENU_ITEM_SELECT, {
      bubbles: true,
      cancelable: true,
    });
    onSelect?.(itemSelectEvent);
    if (!itemSelectEvent.defaultPrevented) {
      MenuContentProps.onSelect?.(itemSelectEvent);
    }
  });
};
