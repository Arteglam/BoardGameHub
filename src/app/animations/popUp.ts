import { trigger, state, style, transition, animate } from '@angular/animations';

export const popUp = trigger('popUp', [
  state('rest', style({ transform: 'scale(1)' })),
  state('hover', style({ transform: 'scale(1.05)' })),
  transition('rest <=> hover', [
    animate('0.3s ease-in-out')
  ])
]);