import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class Step {
    stepIdentifier?: string;
    stepTitle: string;
    stepDescription: string;
    customClass?: string;
    stepHighlightedIds?: string[];
    stepHighlightedTags?: string[];
    stepEntry?: (data: any) => Promise<any>;
    stepExit?: (data: any) => Promise<any>;
    tooltipAnchor: {
        absolutePosition?: string[];
        anchorTagName?: string;
        anchorId?: string;
        offsetFromAnchor?: number[];
    };
    pointer?: {
        direction: 'NONE' | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
        location?: 'START' | 'MIDDLE' | 'END';
    };
    asyncStep?: {
        blockActionsWhilePaused?: boolean;
        maximumWaitTimeInMilliseconds?: number;
        subjectToListen?: Subject<boolean> | EventEmitter<boolean>;
    };
}