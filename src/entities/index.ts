import type { WixDataItem } from '../../integrations/cms/types';

/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file
 */

/**
 * Collection ID: newslettersubscribers
 * Interface for NewsletterSubscribers
 */
export interface NewsletterSubscribers extends WixDataItem {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @fieldType text */
  emailAddress?: string;
  /** @fieldType datetime */
  subscriptionDate?: Date | string;
  /** @fieldType text */
  status?: string;
  /** @fieldType text */
  firstName?: string;
  /** @fieldType text */
  lastName?: string;
}


/**
 * Collection ID: productreviews
 * Interface for ProductReviews
 */
export interface ProductReviews extends WixDataItem {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @fieldType text */
  reviewText?: string;
  /** @fieldType number */
  rating?: number;
  /** @fieldType text */
  productName?: string;
  /** @fieldType text */
  reviewerName?: string;
  /** @fieldType date */
  reviewDate?: Date | string;
}


/**
 * Collection ID: products
 * @catalog This collection is an eCommerce catalog
 * Interface for Products
 */
export interface Products extends WixDataItem {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @fieldType text */
  itemName?: string;
  /** @fieldType number */
  itemPrice?: number;
  /** @fieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @fieldType text */
  itemDescription?: string;
  /** @fieldType text */
  ingredients?: string;
  /** @fieldType text */
  category?: string;
}
