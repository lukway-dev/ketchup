import {
    Component,
    Prop,
    Event,
    h,
    EventEmitter,
    Element,
    VNode,
    Host,
    Method,
    forceUpdate,
} from '@stencil/core';
import {
    KupManager,
    kupManagerInstance,
} from '../../managers/kup-manager/kup-manager';
import {
    KupCardListData,
    KupCardListClickEventPayload,
    KupCardListProps,
} from './kup-card-list-declarations';
import { KupCardData, KupCardFamily } from '../kup-card/kup-card-declarations';
import { GenericObject, KupComponent } from '../../types/GenericTypes';
import { componentWrapperId } from '../../variables/GenericVariables';
import { getCellValueForDisplay } from '../../utils/cell-utils';
import { getProps, setProps } from '../../utils/utils';
import { KupDataColumn } from '../../components';

@Component({
    tag: 'kup-card-list',
    styleUrl: 'kup-card-list.scss',
    shadow: true,
})
export class KupCardList {
    /**
     * References the root HTML element of the component (<kup-card-list>).
     */
    @Element() rootElement: HTMLElement;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Sets the number of columns.
     * @default 1
     */
    @Prop()
    columnsNumber = 1;
    /**
     * Custom style of the component.
     * @default ""
     * @see https://smeup.github.io/ketchup/#/customization
     */
    @Prop() customStyle: string = '';
    /**
     * Actual data of the component.
     * @default null
     */
    @Prop()
    data: KupCardListData = null;
    /**
     * Sets whether the component occupies all available width.
     * @default true
     */
    @Prop()
    fullWidth = true;
    /**
     * Sets whether the cards are placed horizontally or not.
     * @default false
     */
    @Prop()
    horizontal = false;
    /**
     * Sets the description column.
     * @default ""
     */
    @Prop()
    descrCol = '';
    /**
     * Sets the icon column.
     * @default ""
     */
    @Prop()
    iconCol = '';
    /**
     * Sets the value column.
     * @default ""
     */
    @Prop()
    valueCol = '';
    /**
     * Sets the unit of measure column.
     * @default ""
     */
    @Prop()
    measureCol = '';
    /**
     * Sets the integer value column.
     * @default ""
     */
    @Prop()
    intvalueCol = '';
    /**
     * Sets the decimal value column.
     * @default ""
     */
    @Prop()
    decvalueCol = '';
    /**
     * Sets the text color column.
     * @default ""
     */
    @Prop()
    textcolorCol = '';
    /**
     * Sets the value color column.
     * @default ""
     */
    @Prop()
    valuecolorCol = '';
    /**
     * Sets the icon color column.
     * @default ""
     */
    @Prop()
    iconcolorCol = '';
    /**
     * Sets the layout column.
     * @default ""
     */
    @Prop()
    layoutCol = '';
    /**
     * Sets whether a single card is clickable or not.
     * @default false
     */
    @Prop()
    isClickable = false;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #kupManager: KupManager = kupManagerInstance();

    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/

    @Event({
        eventName: 'kup-cardlist-click',
        composed: true,
        cancelable: true,
        bubbles: true,
    })
    kupCardListClickEvent: EventEmitter<KupCardListClickEventPayload>;

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KupCardListProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }
    /**
     * Sets the props to the component.
     * @param {GenericObject} props - Object containing props that will be set to the component.
     */
    @Method()
    async setProps(props: GenericObject): Promise<void> {
        setProps(this, KupCardListProps, props);
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.#kupManager.debug.logLoad(this, false);
        this.#kupManager.theme.register(this);
    }

    componentDidLoad() {
        this.#kupManager.debug.logLoad(this, true);
    }

    componentDidRender() {
        this.#kupManager.debug.logRender(this, true);
    }

    render() {
        if (!this.data || !this.data.columns || !this.data.columns.length) {
            return;
        }
        const content: VNode[] = [];

        let decvalueCol: KupDataColumn,
            descrCol: KupDataColumn,
            iconCol: KupDataColumn,
            iconcolorCol: KupDataColumn,
            intvalueCol: KupDataColumn,
            layoutCol: KupDataColumn,
            measureCol: KupDataColumn,
            textcolorCol: KupDataColumn,
            valueCol: KupDataColumn,
            valuecolorCol: KupDataColumn;

        for (let index = 0; index < this.data.columns.length; index++) {
            const column = this.data.columns[index];
            if (column.name) {
                switch (column.name) {
                    case this.decvalueCol:
                        decvalueCol = column;
                        break;
                    case this.descrCol:
                        descrCol = column;
                        break;
                    case this.iconCol:
                        iconCol = column;
                        break;
                    case this.iconcolorCol:
                        iconcolorCol = column;
                        break;
                    case this.intvalueCol:
                        intvalueCol = column;
                        break;
                    case this.layoutCol:
                        layoutCol = column;
                        break;
                    case this.measureCol:
                        measureCol = column;
                        break;
                    case this.textcolorCol:
                        textcolorCol = column;
                        break;
                    case this.valueCol:
                        valueCol = column;
                        break;
                    case this.valuecolorCol:
                        valuecolorCol = column;
                        break;
                }
            }
        }

        for (let index = 0; index < this.data.rows.length; index++) {
            const row = this.data.rows[index];
            const data: KupCardData = {
                color: [],
                image: [],
                text: [],
            };
            const layout =
                layoutCol && row.cells[layoutCol.name].value
                    ? parseInt(row.cells[layoutCol.name].value)
                    : 1;
            const card: VNode = (
                <kup-card
                    class={this.isClickable ? 'is-clickable' : ''}
                    customStyle="#kup-component, .scalable-card { min-height: var(--kup_cardlist_cardsminheight) }"
                    data={data}
                    layoutFamily={KupCardFamily.SCALABLE}
                    layoutNumber={layout}
                    key={index}
                    onKup-card-click={() => {
                        if (this.isClickable) {
                            this.kupCardListClickEvent.emit({
                                comp: this,
                                id: this.rootElement.id,
                                index,
                                row: row,
                            });
                        }
                    }}
                    slot={index.toString()}
                ></kup-card>
            );
            const loadData = (
                col: KupDataColumn,
                prop: string,
                index: number
            ) => {
                if (col) {
                    const cell = row.cells[col.name];
                    if (cell) {
                        const value = cell.value;
                        switch (prop) {
                            case 'color':
                                data[prop][index] =
                                    this.#kupManager.theme.colorCheck(
                                        value
                                    ).hexColor;
                                break;

                            case 'image':
                                data[prop][index] = { resource: value };
                                break;

                            default:
                                data[prop][index] = getCellValueForDisplay(
                                    col,
                                    cell
                                );
                                break;
                        }
                    }
                }
            };
            switch (layout) {
                case 1:
                    loadData(textcolorCol, 'color', 0);
                    loadData(valuecolorCol, 'color', 1);
                    loadData(descrCol, 'text', 0);
                    loadData(valueCol, 'text', 1);
                    break;
                case 2:
                    loadData(iconcolorCol, 'color', 0);
                    loadData(valuecolorCol, 'color', 1);
                    loadData(iconCol, 'image', 0);
                    loadData(intvalueCol, 'text', 0);
                    loadData(decvalueCol, 'text', 1);
                    loadData(measureCol, 'text', 2);
                    break;
                case 3:
                    loadData(valuecolorCol, 'color', 0);
                    loadData(textcolorCol, 'color', 1);
                    loadData(valueCol, 'text', 0);
                    loadData(descrCol, 'text', 1);
                    break;
                case 4:
                    loadData(iconcolorCol, 'color', 0);
                    loadData(valuecolorCol, 'color', 1);
                    loadData(textcolorCol, 'color', 2);
                    loadData(iconCol, 'image', 0);
                    loadData(intvalueCol, 'text', 0);
                    loadData(decvalueCol, 'text', 1);
                    loadData(measureCol, 'text', 2);
                    loadData(descrCol, 'text', 3);
                    break;
                case 5:
                    loadData(iconcolorCol, 'color', 0);
                    loadData(textcolorCol, 'color', 1);
                    loadData(valuecolorCol, 'color', 2);
                    loadData(iconCol, 'image', 0);
                    loadData(descrCol, 'text', 0);
                    loadData(valueCol, 'text', 1);
                    break;
                case 6:
                    loadData(iconcolorCol, 'color', 0);
                    loadData(valuecolorCol, 'color', 1);
                    loadData(textcolorCol, 'color', 2);
                    loadData(iconCol, 'image', 0);
                    loadData(valueCol, 'text', 0);
                    loadData(descrCol, 'text', 1);
                    break;
                case 7:
                    loadData(iconcolorCol, 'color', 0);
                    loadData(valuecolorCol, 'color', 1);
                    loadData(textcolorCol, 'color', 2);
                    loadData(iconCol, 'image', 0);
                    loadData(valueCol, 'text', 0);
                    loadData(descrCol, 'text', 1);
                    break;
                case 8:
                    loadData(iconcolorCol, 'color', 0);
                    loadData(valuecolorCol, 'color', 1);
                    loadData(textcolorCol, 'color', 2);
                    loadData(iconCol, 'image', 0);
                    loadData(valueCol, 'text', 0);
                    loadData(descrCol, 'text', 1);
                    break;
            }
            content.push(card);
        }

        return (
            <Host>
                <style>
                    {this.#kupManager.theme.setKupStyle(
                        this.rootElement as KupComponent
                    )}
                </style>
                <div id={componentWrapperId}>
                    <kup-grid
                        class={`${
                            this.fullWidth ? 'kup-full-width' : ''
                        } scalable-cards`}
                        columns={this.columnsNumber}
                        singleLine={this.horizontal}
                    >
                        {content}
                    </kup-grid>
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.#kupManager.theme.unregister(this);
    }
}
