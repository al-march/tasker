import { bgColors, brandColors, Colors, Positions, Shadows, Shapes, Sizes, Statuses } from './constants.type';

export type Color = typeof Colors[number];
export type Position = typeof Positions[number];
export type Shape = typeof Shapes[number];
export type Size = typeof Sizes[number];
export type Status = typeof Statuses[number];
export type BrandColors = typeof brandColors[number];
export type BgColors = typeof bgColors[number];
export type Shadow = typeof Shadows[number];
