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
 * @interface ResourceAvailabilityDetails
 */
export interface ResourceAvailabilityDetails {
    /**
     * 
     * @type {Date}
     * @memberof ResourceAvailabilityDetails
     */
    start: Date;
    /**
     * 
     * @type {Date}
     * @memberof ResourceAvailabilityDetails
     */
    end: Date;
}

/**
 * Check if a given object implements the ResourceAvailabilityDetails interface.
 */
export function instanceOfResourceAvailabilityDetails(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "start" in value;
    isInstance = isInstance && "end" in value;

    return isInstance;
}

export function ResourceAvailabilityDetailsFromJSON(json: any): ResourceAvailabilityDetails {
    return ResourceAvailabilityDetailsFromJSONTyped(json, false);
}

export function ResourceAvailabilityDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResourceAvailabilityDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'start': (new Date(json['start'])),
        'end': (new Date(json['end'])),
    };
}

export function ResourceAvailabilityDetailsToJSON(value?: ResourceAvailabilityDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'start': (value.start.toISOString()),
        'end': (value.end.toISOString()),
    };
}
