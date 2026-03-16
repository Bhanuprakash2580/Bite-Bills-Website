import type { WixDataItem } from ".";
import { supabase, TABLES } from "../../src/lib/supabase";

/**
 * Pagination options for querying collections
 */
export interface PaginationOptions {
  /** Number of items per page (default: 50, max: 1000) */
  limit?: number;
  /** Number of items to skip (for offset-based pagination) */
  skip?: number;
}

/**
 * Metadata for a multi-reference field (available on item._refMeta[fieldName])
 * Only populated by getById, not getAll
 */
export interface RefFieldMeta {
  /** Total count of referenced items */
  totalCount: number;
  /** Number of items returned */
  returnedCount: number;
  /** Whether there are more items beyond what was returned */
  hasMore: boolean;
}

/**
 * Paginated result with metadata for infinite scroll
 */
export interface PaginatedResult<T> {
  /** Array of items for current page */
  items: T[];
  /** Total number of items in the collection */
  totalCount: number;
  /** Whether there are more items after current page */
  hasNext: boolean;
  /** Current page number (0-indexed) */
  currentPage: number;
  /** Number of items per page */
  pageSize: number;
  /** Offset to use for next page */
  nextSkip: number | null;
}

/**
 * Supabase-based CRUD Service for Bite Bills bakery data
 * Falls back to in-memory storage when Supabase is not configured
 */
export class BaseCrudService {
  // Fallback in-memory store when Supabase is not available
  private static collections = new Map<string, WixDataItem[]>();

  /**
   * Creates a new item in the collection
   * @param itemData - Data for the new item
   * @param multiReferences - Multi-reference fields as Record<fieldName, arrayOfIds>
   * @returns Promise<T> - The created item
   */
  static async create<T extends WixDataItem>(
    collectionId: string,
    itemData: Partial<T> | Record<string, unknown>,
    multiReferences?: Record<string, any>
  ): Promise<T> {
    if (supabase) {
      // Use Supabase
      const { data, error } = await supabase
        .from(collectionId)
        .insert([itemData])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create item in ${collectionId}: ${error.message}`);
      }

      return data as T;
    } else {
      // Fallback to in-memory storage
      const list = this.collections.get(collectionId) ?? [];
      const newItem: WixDataItem = {
        _id: crypto.randomUUID(),
        _createdDate: new Date(),
        _updatedDate: new Date(),
        ...(itemData as Record<string, unknown>),
      } as WixDataItem;
      const next = [...list, newItem];
      this.collections.set(collectionId, next);
      return newItem as T;
    }
  }

  /**
   * Retrieves items from the collection with pagination (default: 50 per page)
   * @param includeRefs - { singleRef: [...], multiRef: [...] } or string[] for backward compatibility
   */
  static async getAll<T extends WixDataItem>(
    collectionId: string,
    includeRefs?: { singleRef?: string[]; multiRef?: string[] } | string[],
    pagination?: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    if (supabase) {
      // Use Supabase
      const limit = Math.min(pagination?.limit ?? 50, 1000);
      const skip = pagination?.skip ?? 0;

      let query = supabase
        .from(collectionId)
        .select('*', { count: 'exact' })
        .range(skip, skip + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        throw new Error(`Failed to fetch items from ${collectionId}: ${error.message}`);
      }

      const totalCount = count ?? 0;
      const hasNext = skip + limit < totalCount;

      return {
        items: (data ?? []) as T[],
        totalCount,
        hasNext,
        currentPage: Math.floor(skip / limit),
        pageSize: limit,
        nextSkip: hasNext ? skip + limit : null,
      };
    } else {
      // Fallback to in-memory storage
      const limit = Math.min(pagination?.limit ?? 50, 1000);
      const skip = pagination?.skip ?? 0;
      const list = (this.collections.get(collectionId) ?? []) as T[];
      const slice = list.slice(skip, skip + limit);
      const hasNext = skip + limit < list.length;

      return {
        items: slice,
        totalCount: list.length,
        hasNext,
        currentPage: Math.floor(skip / limit),
        pageSize: limit,
        nextSkip: hasNext ? skip + limit : null,
      };
    }
  }

  /**
   * Retrieves a single item by ID with full reference support
   * Use this for detail pages where you need multi-reference fields populated
   */
  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string,
    includeRefs?: { singleRef?: string[]; multiRef?: string[] } | string[]
  ): Promise<T | null> {
    if (supabase) {
      // Use Supabase
      const { data, error } = await supabase
        .from(collectionId)
        .select('*')
        .eq('_id', itemId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw new Error(`Failed to fetch item ${itemId} from ${collectionId}: ${error.message}`);
      }

      return data as T;
    } else {
      // Fallback to in-memory storage
      const list = (this.collections.get(collectionId) ?? []) as T[];
      return list.find((item) => item._id === itemId) ?? null;
    }
  }

  /**
   * Updates an existing item
   * @param itemData - Updated item data (must include _id, only include fields to update)
   * @returns Promise<T> - The updated item
   */
  static async update<T extends WixDataItem>(collectionId: string, itemData: T): Promise<T> {
    if (!itemData._id) {
      throw new Error(`${collectionId} ID is required for update`);
    }

    if (supabase) {
      // Use Supabase
      const { data, error } = await supabase
        .from(collectionId)
        .update(itemData)
        .eq('_id', itemData._id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update item in ${collectionId}: ${error.message}`);
      }

      return data as T;
    } else {
      // Fallback to in-memory storage
      const list = (this.collections.get(collectionId) ?? []) as T[];
      const idx = list.findIndex((item) => item._id === itemData._id);
      if (idx === -1) {
        throw new Error(`${collectionId} item not found for update`);
      }
      const updated = { ...list[idx], ...itemData, _updatedDate: new Date() };
      const next = [...list];
      next[idx] = updated;
      this.collections.set(collectionId, next);
      return updated;
    }
  }

  /**
   * Deletes an item by ID
   * @param itemId - ID of the item to delete
   * @returns Promise<T> - The deleted item
   */
  static async delete<T extends WixDataItem>(collectionId: string, itemId: string): Promise<T> {
    if (!itemId) {
      throw new Error(`${collectionId} ID is required for deletion`);
    }

    if (supabase) {
      // Use Supabase
      const { data, error } = await supabase
        .from(collectionId)
        .delete()
        .eq('_id', itemId)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to delete item from ${collectionId}: ${error.message}`);
      }

      return data as T;
    } else {
      // Fallback to in-memory storage
      const list = (this.collections.get(collectionId) ?? []) as T[];
      const idx = list.findIndex((item) => item._id === itemId);
      if (idx === -1) {
        throw new Error(`${collectionId} item not found for deletion`);
      }
      const [removed] = list.splice(idx, 1);
      this.collections.set(collectionId, list);
      return removed;
    }
  }

  /**
   * Adds references to a multi-reference field
   * @param collectionId - The collection containing the item
   * @param itemId - The item to add references to
   * @param references - Record of field names to arrays of reference IDs
   */
  static async addReferences(
    collectionId: string,
    itemId: string,
    references: Record<string, string[]>
  ): Promise<void> {
    // For Supabase, we'll need to implement this based on your specific schema
    // This is a placeholder - you'll need to adjust based on how you handle relationships
    console.warn('addReferences not yet implemented for Supabase');
  }

  /**
   * Removes references from a multi-reference field
   * @param collectionId - The collection containing the item
   * @param itemId - The item to remove references from
   * @param references - Record of field names to arrays of reference IDs to remove
   */
  static async removeReferences(
    collectionId: string,
    itemId: string,
    references: Record<string, string[]>
  ): Promise<void> {
    // For Supabase, we'll need to implement this based on your specific schema
    // This is a placeholder - you'll need to adjust based on how you handle relationships
    console.warn('removeReferences not yet implemented for Supabase');
  }
}