import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
    // Exclude the details and profile pages from the animation
    transition((fromState, toState) => {
        const isToExcludedPage =
            toState === 'details' || toState === 'profile';
        return !(isToExcludedPage);
    }, [
        query(':enter, :leave', [
            style({ position: 'absolute', width: '100%' })
        ], { optional: true }),
        query(':enter', [
            style({ opacity: 0 })
        ], { optional: true }),
        group([
            query(':leave', [
                animate('0.2s', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                animate('0.5s ease-in', style({ opacity: 1 }))
            ], { optional: true })
        ])
    ])
]);