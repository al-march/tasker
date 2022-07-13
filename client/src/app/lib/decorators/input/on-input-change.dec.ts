import { OnChanges, SimpleChanges } from '@angular/core';

export function OnInputChange(input: string) {
  return function (component: any, methodName: string) {
    /**
     * Decorated method
     */
    const onChangeMethod = component[methodName];

    component['ngOnChanges'] = onChangesWrapper(component['ngOnChanges']);

    function onChangesWrapper(fn?: OnChanges['ngOnChanges']) {
      return function (this: any, changes: SimpleChanges) {
        if (changes[input]) {
          onChangeMethod.call(this, changes[input]);
        }
        if (fn) {
          fn.apply(this, arguments as any);
        }
      };
    }
  };
}
