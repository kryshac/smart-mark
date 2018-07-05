import { animate, style, transition, trigger } from '@angular/animations';

export const addBookmarkAnimation = [
  trigger('label', [
    transition('focusOut => focus', [
      style({ transform: 'initial' }),
      animate(
        '300ms ease-in-out',
        style({
          transform: 'translateY(-1.28125em) scale(.75) perspective(100px) translateZ(0.001px)',
        }),
      ),
    ]),
    transition('focus => focusOut', [
      style({
        transform: 'translateY(-1.28125em) scale(.75) perspective(100px) translateZ(0.001px)',
      }),
      animate('300ms ease-in-out', style({ transform: 'initial' })),
    ]),
  ]),
  trigger('ripple', [
    transition('focusOut => focus', [
      style({ left: '50%', width: '0' }),
      animate('300ms ease-in-out', style({ left: '0', width: '100%' })),
    ]),
    transition('focus => focusOut', [style({ left: '50%', width: '0' })]),
  ]),
];
