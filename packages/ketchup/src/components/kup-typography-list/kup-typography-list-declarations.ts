import { KupDataNode } from '../../managers/kup-data/kup-data-declarations';
import { KupObj } from '../../managers/kup-objects/kup-objects-declarations';
import { GenericObject, KupEventPayload } from '../../types/GenericTypes';

/**
 * Props of the kup-typography component.
 * Used to export every prop in an object.
 */
export enum KupTypographyListProps {
    data = 'prop of the sub compoennt',
    Style = 'it is the style of the text',
    Border = 'when true it will appear a border',
    BorderWidth = 'it is the width of the border',
    Align = 'text alignment',
    FontBold = 'when true it will display the bold font',
    FontItalic = 'when true it will display the italic ( cursive )',
    FontName = 'it is the name of the font',
    FontSize = 'it is the size of the font of the text',
    FontULine = 'when true it will show the underline',
    FontColor = 'it is the color of the font of the text',
    BackColor = 'it is the background color of the text',
    Type = 'it is the type of the font. It is an enum that can take from different variant such as body, heading1, caption and so on',
}

export interface KupTypographyListIconClickEventPayload
    extends KupEventPayload {
    index: number;
    node: KupDataNode;
}

export interface KupTypographyListClickEventPayload extends KupEventPayload {
    index: string;
    subIndex: string;
    obj: KupObj;
}
