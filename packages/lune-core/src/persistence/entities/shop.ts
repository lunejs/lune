import type { VendyxEntity, VendyxTable } from './entity';

/**
 * A vendyx shop
 */
export interface Shop extends VendyxEntity {
  /**
   * The shop's name
   */
  name: string;
  /**
   * The shop's slug
   */
  slug: string;
  /**
   * Api key for other stores to connect to this store
   */
  storefrontApiKey: string;
  /**
   * Contact email for the shop, used to show as contact information in emails
   */
  email: string;
  /**
   * Contact phone number for the shop, used to show as contact information in emails
   */
  phoneNumber: string;
  /**
   * The shop's logo, used for emails and branding in admin and storefront
   */
  logo?: string;
  /**
   * The shop's storefront url, used for technical connections to the storefront
   */
  storefrontUrl?: string;
  /**
   * The shop's socials, used for branding and social media links in emails and storefront
   */
  socials?: ShopSocial;
}

export interface ShopTable extends VendyxTable {
  name: string;
  slug: string;
  storefront_api_key: string;
  email: string;
  phone_number: string;
  logo?: string;
  socials?: ShopSocial;
  storefront_url?: string;

  owner_id: string; // Foreign key to users table
}

type ShopSocial = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
};
