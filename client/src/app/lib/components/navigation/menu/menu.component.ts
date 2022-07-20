import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { BgColors, Shadow } from '@ng-daisy/types';

@Component({
  selector: 'nd-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menu', [
      transition(':enter', [
        style({
          overflow: 'hidden',
          transform: `scale(0.9) translateY(10px)`,
          opacity: 0,
        }),
        animate(`200ms ease-out`, style({
          overflow: 'hidden',
          transform: 'scale(1) translateY(0)',
          opacity: 1,
        })),
      ]),
    ])
  ],
  template: `
    <ul
      @menu
      tabindex="1"
      class="menu bg-neutral"
      [class.menu-compact]="compact"
      [class.menu-normal]="normal"
      [class.menu-horizontal]="horizontal"

      [class.bg-neutral]="bgColor === 'neutral'"
      [class.bg-base-100]="bgColor === 'base-100'"
      [class.bg-base-200]="bgColor === 'base-200'"
      [class.bg-base-300]="bgColor === 'base-300'"

      [class.shadow]="shadow === 'base'"
      [class.shadow-none]="shadow === 'none'"
      [class.shadow-2xl]="shadow === '2xl'"
      [class.shadow-xl]="shadow === 'xl'"
      [class.shadow-lg]="shadow === 'lg'"
      [class.shadow-md]="shadow === 'md'"
      [class.shadow-sm]="shadow === 'sm'"
    >
      <ng-content></ng-content>
    </ul>
  `,
})
export class MenuComponent {

  @Input()
  bgColor: BgColors = 'neutral';

  @Input()
  shadow: Shadow = 'none';

  @Input()
  compact = false;

  @Input()
  normal = false;

  @Input()
  horizontal = false;
}

@Component({
  selector: 'nd-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li
      [class.disabled]="disabled"
      [class.active]="active"
    >
      <a>
        <ng-content></ng-content>
      </a>
    </li>
  `,
})
export class MenuItem {
  @Input()
  active = false;

  @Input()
  disabled = false;
}
