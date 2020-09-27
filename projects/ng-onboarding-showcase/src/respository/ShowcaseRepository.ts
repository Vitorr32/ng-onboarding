import { Onboarding } from '../../../ng-onboarding/src/lib/model/Onboarding.model';

const ShowCaseRepository = (): Onboarding => ({
    identifier: 'showcase-guide',
    steps: [
        {
            stepTitle: 'Welcome to the Angular Onboarding Library showcase!',
            stepDescription: 'Through this onboarding guide we will teach you how to use and configure the onboarding library',
            pointer: {
                direction: 'NONE',
            },
            tooltipAnchor: {
                absolutePosition: ['calc(50% - 50%)', 'calc(50% - 50%)']
            }
        }
    ],
})

export default ShowCaseRepository;