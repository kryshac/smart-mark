import { animateChild, query, stagger, transition, trigger } from '@angular/animations';

export function feedAnimationFn(fromState: string | number, toState: string | number) {
  console.log(fromState);
  return fromState === 0 && toState > 0;
}

export const feedAnimation = trigger('listAnimation', [
  transition(feedAnimationFn, [
    query('@slideIn', [stagger(25, [animateChild()])], { optional: true }),
  ]),
]);
