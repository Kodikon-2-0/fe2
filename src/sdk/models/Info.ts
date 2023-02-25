/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Info
 */
export interface Info {
    /**
     * 
     * @type {Array<string>}
     * @memberof Info
     */
    names: Array<string>;
}

/**
 * Check if a given object implements the Info interface.
 */
export function instanceOfInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "names" in value;

    return isInstance;
}

export function InfoFromJSON(json: any): Info {
    return InfoFromJSONTyped(json, false);
}

export function InfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): Info {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'names': json['names'],
    };
}

export function InfoToJSON(value?: Info | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'names': value.names,
    };
}
