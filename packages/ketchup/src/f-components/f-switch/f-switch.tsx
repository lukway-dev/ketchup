import { FSwitchSizing, type FSwitchProps } from './f-switch-declarations';
import { FunctionalComponent, h } from '@stencil/core';

/*-------------------------------------------------*/
/*                C o m p o n e n t                */
/*-------------------------------------------------*/

export const FSwitch: FunctionalComponent<FSwitchProps> = (
    props: FSwitchProps
) => {
    if (!props.sizing) {
        props.sizing = FSwitchSizing.MEDIUM;
    }
    const isSmall: boolean = props.sizing.toLowerCase() === FSwitchSizing.SMALL;
    const classObj: Record<string, boolean> = {
        switch: true,
        'switch--checked': props.checked,
        'switch--disabled': props.disabled,
        [`switch--${props.sizing}`]: props.sizing ? true : false,
    };

    return (
        <div
            class={`f-switch ${props.danger ? 'kup-danger' : ''} ${
                props.info ? 'kup-info' : ''
            } ${props.secondary ? 'kup-secondary' : ''} ${
                props.success ? 'kup-success' : ''
            } ${props.warning ? 'kup-warning' : ''} ${
                props.wrapperClass ? props.wrapperClass : ''
            }`}
            {...props.dataSet}
            id={props.id}
            title={props.title}
        >
            <div
                class={`form-field ${
                    props.leadingLabel ? 'form-field--align-end' : ''
                }`}
            >
                <div class={classObj}>
                    <div class="switch__track"></div>
                    <div class="switch__thumb-underlay">
                        <div class="switch__thumb">
                            <input
                                type="checkbox"
                                class="switch__native-control"
                                role="switch"
                                checked={props.checked}
                                disabled={props.disabled}
                                value={props.checked ? 'on' : 'off'}
                                onBlur={props.onBlur}
                                onChange={props.onChange}
                                onFocus={props.onFocus}
                            ></input>
                        </div>
                    </div>
                </div>
                <label onClick={props.onChange}>{props.label}</label>
            </div>
        </div>
    );
};
