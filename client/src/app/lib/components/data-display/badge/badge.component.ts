import { Component, Input } from '@angular/core';
import { Color, Size } from '@ng-daisy/types';

@Component({
  selector: 'nd-badge',
  template: `
    <span
      class="badge"
      [class.badge-lg]="size === 'lg'"
      [class.badge-md]="size === 'md'"
      [class.badge-sm]="size === 'sm'"
      [class.badge-xs]="size === 'xs'"

      [class.badge-primary]="color === 'primary'"
      [class.badge-secondary]="color === 'secondary'"
      [class.badge-accent]="color === 'accent'"
      [class.badge-ghost]="color === 'ghost'"
      [class.badge-info]="color === 'info'"
      [class.badge-success]="color === 'success'"
      [class.badge-warning]="color === 'warning'"
      [class.badge-error]="color === 'error'"

      [class.badge-outline]="outline"
    >
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input()
  color?: Color;

  @Input()
  size?: Size;

  @Input()
  outline = false;
}
