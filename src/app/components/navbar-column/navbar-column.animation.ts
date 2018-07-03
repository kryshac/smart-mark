import {
  animate,
  animateChild,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const tagAnimation = [
  trigger('fade', [
    transition(':enter', [
      sequence([
        style({ opacity: '1', transform: 'translateX(+50%)' }),
        animate('200ms ease-in', style({ opacity: '1', transform: 'translateX(0)' })),
      ]),
    ]),
  ]),
  trigger('tagAnimation', [
    transition('* => *', [query(':enter', stagger('50ms', [animateChild()]), { optional: true })]),
  ]),
];
