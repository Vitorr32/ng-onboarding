import { Onboarding } from '../../../ng-onboarding/src/lib/model/Onboarding.model';
import { InjectedData } from '../model/InjectedData.model';

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
                absolutePosition: ['calc(50% - 200px)', 'calc(50% - 200px)']
            },
            stepExit: async (injectedData: InjectedData) => {
                injectedData.onStepExitSubject.next('step1exit')
            }
        },
        {
            stepTitle: 'Saw that? Asynchronous support!',
            stepDescription: ` You can define asynchronous support for each different step so that the Ng Onboarding waits
            for the anchor element or subject to be done, making it easy to continue the guide after a call for API or similar is done`,
            tooltipAnchor: {
                anchorId: 'step2-anchor'
            },
            asyncStep: {
                blockActionsWhilePaused: true,
                maximumWaitTimeInMilliseconds: 10000
            }
        }
    ],
})

export default ShowCaseRepository;