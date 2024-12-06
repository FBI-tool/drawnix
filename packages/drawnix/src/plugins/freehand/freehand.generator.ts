import { Generator } from '@plait/common';
import { PlaitBoard, Point, setStrokeLinecap } from '@plait/core';
import { Options } from 'roughjs/bin/core';
import { DefaultFreehand, Freehand } from './type';
import { gaussianSmooth } from './utils';

export interface FreehandData {}

function chaikinSmooth(points: Point[], iterations: number) {
  if (points.length < 2) return points;
  
  let result = points;
  
  for (let iter = 0; iter < iterations; iter++) {
    const newPoints = [];
    
    // 保持起点
    newPoints.push(result[0]);
    
    // 对每个线段进行切分
    for (let i = 0; i < result.length - 1; i++) {
      const p0 = result[i];
      const p1 = result[i + 1];
      
      // 计算 1/4 和 3/4 位置的点
      const q = [p0[0] * 0.75 + p1[0] * 0.25,
        p0[1] * 0.75 + p1[1] * 0.25]
      
      const r = [
        p0[0] * 0.25 + p1[0] * 0.75,
        p0[1] * 0.25 + p1[1] * 0.75
      ];
      
      newPoints.push(q, r);
    }
    
    // 保持终点
    newPoints.push(result[result.length - 1]);
    result = newPoints;
  }
  console.log(result);
  return result;
}



export class FreehandGenerator extends Generator<Freehand, FreehandData> {
  protected draw(
    element: Freehand,
    data?: FreehandData | undefined
  ): SVGGElement | undefined {
    let option: Options = { ...DefaultFreehand };
    // const g = PlaitBoard.getRoughSVG(this.board).curve(element.points, option);
    // const g = PlaitBoard.getRoughSVG(this.board).curve(chaikinSmooth(element.points, 1), option);
    const g = PlaitBoard.getRoughSVG(this.board).curve(gaussianSmooth(element.points, 1, 9), option); // y
    // const g = PlaitBoard.getRoughSVG(this.board).curve(chaikinSmooth(gaussianSmooth(element.points, 1, 9), 1), option);// n
    setStrokeLinecap(g, 'round');
    return g;
  }

  canDraw(element: Freehand, data: FreehandData): boolean {
    return true;
  }
}
