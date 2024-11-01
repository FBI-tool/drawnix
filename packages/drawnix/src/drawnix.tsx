import { Board, BoardChangeData, Wrapper } from '@plait/react-board';
import {
  PlaitBoardOptions,
  PlaitElement,
  PlaitPlugin,
  PlaitPointerType,
  PlaitTheme,
  Selection,
  ThemeColorMode,
  Viewport,
} from '@plait/core';
import React, { useState } from 'react';
import { withGroup } from '@plait/common';
import { DrawPointerType, withDraw } from '@plait/draw';
import { MindPointerType, withMind } from '@plait/mind';
import { withMindExtend } from './plugins/with-mind-extend';
import { withCommonPlugin } from './plugins/with-common';
import { CreationToolbar } from './components/toolbar/creation-toolbar';

import './styles/index.scss';
import { MainMenu } from './components/app-menu/main-menu';
import { ZoomToolbar } from './components/toolbar/zoom-toolbar';
import { PopupToolbar } from './components/toolbar/popup-toolbar/popup-toolbar';
import { AppToolbar } from './components/toolbar/app-toolbar/app-toolbar';

export type DrawnixProps = {
  value: PlaitElement[];
  viewport?: Viewport;
  theme?: PlaitTheme;
  onChange?: (value: BoardChangeData) => void;
  onSelectionChange?: (selection: Selection) => void;
  onValueChange?: (value: PlaitElement[]) => void;
  onViewportChange?: (value: Viewport) => void;
  onThemeChange?: (value: ThemeColorMode) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export type DrawnixPointerType =
  | PlaitPointerType
  | MindPointerType
  | DrawPointerType;

export type DrawnixState = {
  pointer: DrawnixPointerType;
};

export const Drawnix: React.FC<DrawnixProps> = ({
  value,
  viewport,
  theme,
  onChange,
}) => {
  const plugins: PlaitPlugin[] = [
    withDraw,
    withGroup,
    withMind,
    withMindExtend,
    withCommonPlugin,
  ];
  const options: PlaitBoardOptions = {};
  const [appState, setAppState] = useState<DrawnixState>(() => {
    // TODO: need to consider how to maintenance the pointer state in future
    return { pointer: PlaitPointerType.hand };
  });

  return (
    <div className="drawnix">
      <Wrapper
        value={value}
        viewport={viewport}
        theme={theme}
        options={options}
        plugins={plugins}
        onChange={(data: BoardChangeData) => {
          onChange && onChange(data);
        }}
      >
        <Board></Board>
        <AppToolbar></AppToolbar>
        <CreationToolbar
          setPointer={(pointer: DrawnixPointerType) => {
            setAppState({ pointer });
          }}
        ></CreationToolbar>
        <ZoomToolbar></ZoomToolbar>
        <PopupToolbar></PopupToolbar>
      </Wrapper>
    </div>
  );
};
