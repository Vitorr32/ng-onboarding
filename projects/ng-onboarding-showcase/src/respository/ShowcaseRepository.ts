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
                injectedData.onStepExitSubject.next('anchor-2')
            }
        },
        {
            stepTitle: 'Automatic Anchoring 1',
            stepDescription: `Starting by the automatic anchor feature, the NgOnboarding allow you to just assing a specific tag name or
            id of a HTML element, then the onboarding tooltip will anchor automatically.

            The library will try to fit the tooltip for the best of it's ability without overflowing in the screen, let's
            show some examples:

            This one is in the top left corner of the screen`,
            tooltipAnchor: {
                anchorId: 'anchor-1'
            }
        },
        {
            stepTitle: 'Automatic Anchoring 2',
            stepDescription: `You will notice that not only the tooltip position will change, but also the tooltip arrow, 
            it will automatically adjust for the best position avaliable for the anchor element`,
            tooltipAnchor: {
                anchorId: 'anchor-2'
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