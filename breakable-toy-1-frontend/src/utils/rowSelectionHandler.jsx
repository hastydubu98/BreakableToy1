import { markProductOutOfStock, markProductInStock } from '../api/api'; // Import the new API functions

/**
 * Handles row selection changes by marking products as "out of stock" or "in stock."
 * @param {Array} addedIds - IDs of rows added to the selection.
 * @param {Array} removedIds - IDs of rows removed from the selection.
 */
export const handleRowSelection = async (addedIds, removedIds) => {
  // Mark products as out of stock
  if (addedIds.length > 0) {
    for (const id of addedIds) {
      try {
        // Use the API function to mark the product as out of stock
        await markProductOutOfStock(id);
        console.log(`Product marked as out of stock: ${id}`);
      } catch (error) {
        console.error(`Error marking product ${id} as out of stock:`, error);
      }
    }
  }

  // Mark products as in stock
  if (removedIds.length > 0) {
    for (const id of removedIds) {
      try {
        // Use the API function to mark the product as in stock
        await markProductInStock(id);
        console.log(`Product marked as in stock: ${id}`);
      } catch (error) {
        console.error(`Error marking product ${id} as in stock:`, error);
      }
    }
  }
};