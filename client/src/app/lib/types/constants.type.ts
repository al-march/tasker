export const Positions = ['top', 'bottom', 'left', 'right'] as const;
export const Shapes = ['circle', 'square'] as const;
export const Sizes = ['lg', 'md', 'sm', 'xs'] as const;
export const Statuses = ['info', 'success', 'warning', 'error',] as const;
export const brandColors = ['primary', 'secondary', 'accent'] as const;
export const Colors = [...brandColors, 'ghost', ...Statuses,] as const;
export const bgColors = ['base-100', 'base-200', 'base-300', 'neutral'] as const;
