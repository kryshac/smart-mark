import { animateChild, query, stagger, transition, trigger } from '@angular/animations';

export function feedAnimationFn(fromState: string | number, toState: string | number) {
  return fromState === 0 && toState > 0;
}

export const feedAnimation = trigger('listAnimation', [
  transition(feedAnimationFn, [
    query('@slideIn', [stagger(50, [animateChild()])], { optional: true }),
  ]),
]);
