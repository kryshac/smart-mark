import { animate, sequence, style, transition, trigger } from '@angular/animations';

export const dialogAlertAnimation = [
  trigger('loading', [
    transition('* => active', [
      sequence([
        animate('150ms', style({ left: '0', top: '0', height: '5px', borderRadius: '2px' })),
        animate('150ms', style({ left: '0', top: '50%', height: '50%' })),
        animate('150ms', style({ left: '0', top: '100%', height: '5px' })),
        animate('150ms', style({ left: '50%', top: '100%', width: '50%' })),
        animate('150ms', style({ left: '100%', top: '100%', width: '5px' })),
        animate('150ms', style({ left: '100%', top: '50%', height: '50%' })),
        animate('150ms', style({ left: '100%', top: '0', height: '5px' })),
        animate('150ms', style({ left: '50%', top: '0', width: '50%' })),
        animate('150ms', style({ left: '0', top: '0', width: '5px' })),
        animate('150ms', style({ left: '0', top: '28px', height: '47px' })),
      ]),
    ]),
  ]),
  trigger('loadingRage', [
    transition('* => active', [style({ opacity: '0' }), animate('100ms', style({ opacity: '1' }))]),
    transition('active => *', [style({ opacity: '1' }), animate('100ms', style({ opacity: '0' }))]),
  ]),
];
