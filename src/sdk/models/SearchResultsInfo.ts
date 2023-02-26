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
 * @interface SearchResultsInfo
 */
export interface SearchResultsInfo {
    /**
     * 
     * @type {number}
     * @memberof SearchResultsInfo
     */
    resourceId: number;
    /**
     * 
     * @type {number}
     * @memberof SearchResultsInfo
     */
    owner: number;
    /**
     * 
     * @type {string}
     * @memberof SearchResultsInfo
     */
    state: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultsInfo
     */
    district: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultsInfo
     */
    mandal: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultsInfo
     */
    data: string;
    /**
     * 
     * @type {Date}
     * @memberof SearchResultsInfo
     */
    availableFrom: Date;
    /**
     * 
     * @type {Date}
     * @memberof SearchResultsInfo
     */
    availableTill: Date;
}

/**
 * Check if a given object implements the SearchResultsInfo interface.
 */
export function instanceOfSearchResultsInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "resourceId" in value;
    isInstance = isInstance && "owner" in value;
    isInstance = isInstance && "state" in value;
    isInstance = isInstance && "district" in value;
    isInstance = isInstance && "mandal" in value;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "availableFrom" in value;
    isInstance = isInstance && "availableTill" in value;

    return isInstance;
}

export function SearchResultsInfoFromJSON(json: any): SearchResultsInfo {
    return SearchResultsInfoFromJSONTyped(json, false);
}

export function SearchResultsInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchResultsInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'resourceId': json['resource_id'],
        'owner': json['owner'],
        'state': json['state'],
        'district': json['district'],
        'mandal': json['mandal'],
        'data': json['data'],
        'availableFrom': (new Date(json['available_from'])),
        'availableTill': (new Date(json['available_till'])),
    };
}

export function SearchResultsInfoToJSON(value?: SearchResultsInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'resource_id': value.resourceId,
        'owner': value.owner,
        'state': value.state,
        'district': value.district,
        'mandal': value.mandal,
        'data': value.data,
        'available_from': (value.availableFrom.toISOString()),
        'available_till': (value.availableTill.toISOString()),
    };
}
