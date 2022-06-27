/* tslint:disable */
/* eslint-disable */
/**
 * Pirate Beers
 * A ecommerce app that sells beers
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * A model of identify the min and max values
 * @export
 * @interface Range
 */
export interface Range {
    /**
     * 
     * @type {number}
     * @memberof Range
     */
    min: number;
    /**
     * 
     * @type {number}
     * @memberof Range
     */
    max: number;
}

export function RangeFromJSON(json: any): Range {
    return RangeFromJSONTyped(json, false);
}

export function RangeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Range {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'min': json['min'],
        'max': json['max'],
    };
}

export function RangeToJSON(value?: Range | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'min': value.min,
        'max': value.max,
    };
}
