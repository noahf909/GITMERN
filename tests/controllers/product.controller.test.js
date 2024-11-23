const { getProducts, getProductById, updateProduct, deleteProduct } = require('../../controllers/productController');
const Product = require('../../models/Product');

jest.mock('../../models/Product');

describe('Product Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch all products successfully', async () => {
      const mockProducts = [{ _id: 'product1', name: 'Product 1' }, { _id: 'product2', name: 'Product 2' }];
      Product.find.mockResolvedValue(mockProducts);

      const products = await getProducts();
      expect(Product.find).toHaveBeenCalled();
      expect(products).toEqual(mockProducts);
    });

    it('should throw an error if fetching products fails', async () => {
      Product.find.mockRejectedValue(new Error('Database error'));
      await expect(getProducts()).rejects.toThrow('Failed to fetch products');
    });
  });

  describe('getProductById', () => {
    it('should fetch a specific product by ID', async () => {
      const mockProduct = { _id: 'product1', name: 'Product 1' };
      Product.findById.mockResolvedValue(mockProduct);

      const product = await getProductById('product1');
      expect(Product.findById).toHaveBeenCalledWith('product1');
      expect(product).toEqual(mockProduct);
    });

    it('should throw an error if fetching a product by ID fails', async () => {
      Product.findById.mockRejectedValue(new Error('Database error'));
      await expect(getProductById('invalidId')).rejects.toThrow('Failed to fetch product');
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      const mockUpdatedProduct = { _id: 'product1', name: 'Updated Product' };

      Product.findByIdAndUpdate.mockResolvedValue(mockUpdatedProduct);
      Product.findById.mockResolvedValue(mockUpdatedProduct);

      const updatedProduct = await updateProduct('product1', { name: 'Updated Product' });

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('product1', { name: 'Updated Product' });
      expect(Product.findById).toHaveBeenCalledWith('product1');
      expect(updatedProduct).toEqual(mockUpdatedProduct);
    });

    it('should throw an error if updating a product fails', async () => {
      Product.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));
      await expect(updateProduct('product1', { name: 'Updated Product' })).rejects.toThrow('Failed to update product');
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      const mockProduct = { _id: 'product1', name: 'Product 1' };

      Product.findByIdAndDelete.mockResolvedValue(mockProduct);

      const deletedProduct = await deleteProduct('product1');

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('product1');
      expect(deletedProduct).toEqual(mockProduct);
    });

    it('should throw an error if deleting a product fails', async () => {
      Product.findByIdAndDelete.mockRejectedValue(new Error('Database error'));
      await expect(deleteProduct('product1')).rejects.toThrow('Failed to delete product');
    });
  });
});
