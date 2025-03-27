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
        const response = await fetch(`http://localhost:9090/products/${id}/outofstock`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Failed to mark product ${id} as out of stock`);
        }

        console.log(`Product marked as out of stock: ${id}`);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  // Mark products as in stock
  if (removedIds.length > 0) {
    for (const id of removedIds) {
      try {
        const response = await fetch(`http://localhost:9090/products/${id}/instock`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Failed to mark product ${id} as in stock`);
        }

        console.log(`Product marked as in stock: ${id}`);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};