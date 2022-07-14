import { animate, style, transition } from '@angular/animations';

export interface SlideAnimationConfig {
  duration: {
    enter: string;
    leave: string;
  };
  translateY: string;
}

export const SlideAnimation = (config: Partial<SlideAnimationConfig> = {}) => {

  const defaultConfig: SlideAnimationConfig = {
    duration: {
      enter: '180ms',
      leave: '120ms',
    },
    translateY: '30px'
  }

  const currentConfig = {...defaultConfig, ...config};

  return [
    transition(':enter', [
      style({
        overflow: 'hidden',
        transform: `translateY(-${currentConfig.translateY})`,
        opacity: 0,
        height: '0px',
      }),
      animate(`${currentConfig.duration.enter} ease-out`, style({
        overflow: 'hidden',
        transform: 'translateY(0)',
        opacity: 1,
        height: '*',
      })),
    ]),
    transition(':leave', [
      style({
        overflow: 'hidden',
        transform: 'translateY(0)',
        height: '*',
        opacity: 1,
      }),
      animate(`${currentConfig.duration.leave} cubic-bezier(.4,0,.2,1)`, style({
        overflow: 'hidden',
        transform: `translateY(${currentConfig.translateY})`,
        opacity: 0,
        height: '0px',
      })),
    ]),
  ]
}
