import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const cardBookmarkAnimation = trigger('slideIn', [
  transition('void => *', [
    style({ opacity: 0, transform: 'scale(0.5)' }),
    query('.card-bookmark-icon', [style({ opacity: 0, transform: 'translateX(-100%)' })]),
    query('.card-bookmark-title', [style({ opacity: 0, transform: 'translateX(+100%)' })]),
    query('.mat-card-content', [style({ opacity: 0, transform: 'translateY(+50%)' })]),
    group([
      animate('250ms ease-in', style({ opacity: 1, transform: 'scale(1)' })),
      query(
        '.card-bookmark-icon',
        animate(
          '450ms cubic-bezier(0.680, -0.550, 0.265, 1.550)',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ),
      query(
        '.card-bookmark-title',
        animate('250ms ease-in', style({ opacity: 1, transform: 'translateX(0)' })),
      ),
      query(
        '.mat-card-content',
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ),
    ]),
  ]),
  transition('* => void', [
    group([
      animate('350ms ease-in', style({ opacity: 0, transform: 'scale(0.5)' })),
      query(
        '.card-bookmark-icon',
        animate(
          '250ms cubic-bezier(0.680, -0.550, 0.265, 1.550)',
          style({ opacity: 0, transform: 'translateX(+100%)' }),
        ),
      ),
      query(
        '.card-bookmark-title',
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(+100%)' })),
      ),
      query(
        '.mat-card-content',
        animate('250ms ease-in', style({ opacity: 0, transform: 'translateY(+50%)' })),
      ),
    ]),
  ]),
]);
