import { Step } from './Step.model';

export class StepRender {
    //4 element string that was the distance from top, left, bottom, right in css terms (percentage, pixels and so forth)
    position: string[];
    //Guide proguess elements
    proguess: {
        steps: string,
        percentage: number
    };
    //The step itself
    step: Step;
}