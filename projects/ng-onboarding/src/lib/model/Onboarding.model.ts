import { Step } from "./Step.model";

export class Onboarding {
    identifier: string;
    steps: Step[];
    skippable?: boolean = true;
    completed?: boolean = false;
    trigger: (injectedData: any) => boolean;
}