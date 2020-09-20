import { Observable } from 'rxjs';

export class Step {
    stepTitle: string;
    stepDescription: string;
    customClass?: string;
    stepHighlightedIds?: string[];
    stepHighlightedTags?: string[];
    stepEntry?: (data: any) => Observable<any>;
    stepExit?: (data: any) => Observable<any>;
    tooltipAnchor: {
        absolutePosition?: string[];
        anchorTagName?: string;
        anchorId?: string;
        offsetFromAnchor?: number[];
    };
    pointer: {
        direction: 'NONE' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
        location?: 'START' | 'MIDDLE' | 'END';
    };
    asyncStep?: {
        actionsToListen: string[]
    };
}