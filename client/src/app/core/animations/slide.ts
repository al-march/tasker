import { animate, style, transition } from '@angular/animations';

export const SlideAnimation = [
  transition(':enter', [
    style({
      overflow: 'hidden',
      transform: 'translateY(-30px)',
      opacity: 0,
      height: '0px',
    }),
    animate('180ms ease-out', style({
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
    animate('120ms cubic-bezier(.4,0,.2,1)', style({
      overflow: 'hidden',
      transform: 'translateY(30px)',
      opacity: 0,
      height: '0px',
    })),
  ]),
]
