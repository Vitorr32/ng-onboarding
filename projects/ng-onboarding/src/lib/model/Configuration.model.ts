import { BACKDROP_COLOR, HIGHLIGHT_CLASS, TOOLTIP_DIMENSIONS } from '../constants/Configuration.const';
import TooltipDimensions from './TooltipDimension.model';

export default class Configuration {
    highlighClassName?: string = HIGHLIGHT_CLASS;
    backdropColor?: string = BACKDROP_COLOR;
    tooltipDimensions?: TooltipDimensions = TOOLTIP_DIMENSIONS;    
}