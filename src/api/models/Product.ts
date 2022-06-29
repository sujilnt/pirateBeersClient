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
 * A model for products
 * @export
 * @interface Product
 */
export interface Product {
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    category?: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    image: string;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    rating: number;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    abv?: number;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    ibu?: number;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    price: number;
    /**
     * 
     * @type {Date}
     * @memberof Product
     */
    listedSince?: Date;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    type?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Product
     */
    tags?: Array<string>;
}

export function ProductFromJSON(json: any): Product {
    return ProductFromJSONTyped(json, false);
}

export function ProductFromJSONTyped(json: any, ignoreDiscriminator: boolean): Product {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'description': json['description'],
        'category': !exists(json, 'category') ? undefined : json['category'],
        'image': json['image'],
        'rating': json['rating'],
        'abv': !exists(json, 'abv') ? undefined : json['abv'],
        'ibu': !exists(json, 'ibu') ? undefined : json['ibu'],
        'price': json['price'],
        'listedSince': !exists(json, 'listedSince') ? undefined : (new Date(json['listedSince'])),
        'type': !exists(json, 'type') ? undefined : json['type'],
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
    };
}

export function ProductToJSON(value?: Product | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'description': value.description,
        'category': value.category,
        'image': value.image,
        'rating': value.rating,
        'abv': value.abv,
        'ibu': value.ibu,
        'price': value.price,
        'listedSince': value.listedSince === undefined ? undefined : (value.listedSince.toISOString()),
        'type': value.type,
        'tags': value.tags,
    };
}

