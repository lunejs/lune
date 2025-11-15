import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * A lune shop
 */
export interface Shop extends LuneEntity {
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
  logo?: string | null;
  /**
   * The shop's storefront url, used for technical connections to the storefront
   */
  storefrontUrl?: string | null;
  /**
   * The shop's socials, used for branding and social media links in emails and storefront
   */
  socials?: ShopSocial | null;
}

export interface ShopTable extends LuneTable {
  name: string;
  slug: string;
  storefront_api_key: string;
  email: string;
  phone_number: string;
  logo?: string | null;
  socials?: ShopSocial | null;
  storefront_url?: string | null;

  owner_id: string; // Foreign key to users table
}

type ShopSocial = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
};
