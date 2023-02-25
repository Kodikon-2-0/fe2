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
 * @interface LoginDetails
 */
export interface LoginDetails {
    /**
     * 
     * @type {string}
     * @memberof LoginDetails
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof LoginDetails
     */
    password: string;
}

/**
 * Check if a given object implements the LoginDetails interface.
 */
export function instanceOfLoginDetails(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function LoginDetailsFromJSON(json: any): LoginDetails {
    return LoginDetailsFromJSONTyped(json, false);
}

export function LoginDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': json['Username'],
        'password': json['Password'],
    };
}

export function LoginDetailsToJSON(value?: LoginDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Username': value.username,
        'Password': value.password,
    };
}
