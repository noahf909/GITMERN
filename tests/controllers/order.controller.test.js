const { 
    getOrders, 
    getOrderById, 
    getOrdersByCustomer, 
    addOrder, 
    updateOrder, 
    deleteOrder 
} = require('../../controllers/orderController');

const Order = require('../../models/Order');
const Customer = require('../../models/Customer');
const Product = require('../../models/Product');

jest.mock('../../models/Order');
jest.mock('../../models/Customer');
jest.mock('../../models/Product');

describe('Order Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getOrders', () => {
        it('should fetch all orders successfully', async () => {
            const mockOrders = [{ _id: 'order1' }, { _id: 'order2' }];
            Order.find.mockResolvedValue(mockOrders);

            const orders = await getOrders();
            expect(Order.find).toHaveBeenCalled();
            expect(orders).toEqual(mockOrders);
        });

        it('should throw an error if fetching orders fails', async () => {
            Order.find.mockRejectedValue(new Error('Database error'));
            await expect(getOrders()).rejects.toThrow('Failed to fetch orders');
        });
    });

    describe('getOrderById', () => {
        it('should fetch a specific order by ID', async () => {
            const mockOrder = { _id: 'order1' };
            Order.findById.mockResolvedValue(mockOrder);

            const order = await getOrderById('order1');
            expect(Order.findById).toHaveBeenCalledWith('order1');
            expect(order).toEqual(mockOrder);
        });

        it('should throw an error if fetching an order by ID fails', async () => {
            Order.findById.mockRejectedValue(new Error('Database error'));
            await expect(getOrderById('invalidId')).rejects.toThrow('Failed to fetch order');
        });
    });

    describe('getOrdersByCustomer', () => {
        it('should fetch orders by customer ID with product details', async () => {
            const mockOrders = [
                {
                    _id: 'order1',
                    products: [
                        { product: 'prod1', quantity: 2, size: 'M', toObject: jest.fn(() => ({ product: 'prod1', quantity: 2, size: 'M' })) },
                    ],
                    toObject: jest.fn(() => ({
                        _id: 'order1',
                        products: [{ product: 'prod1', quantity: 2, size: 'M' }],
                    })),
                },
            ];

            const mockProduct = { _id: 'prod1', name: 'Product 1' };

            Order.find.mockResolvedValue(mockOrders);
            Product.findOne.mockResolvedValue(mockProduct);

            const orders = await getOrdersByCustomer('customer1');
            expect(Order.find).toHaveBeenCalledWith({ customer: 'customer1' });
            expect(orders[0].products[0].productDetails).toEqual(mockProduct);
        });

        it('should throw an error if fetching orders by customer ID fails', async () => {
            Order.find.mockRejectedValue(new Error('Database error'));
            await expect(getOrdersByCustomer('customer1')).rejects.toThrow('Failed to fetch orders');
        });
    });

    describe('addOrder', () => {
        it('should add a new order and update customer successfully', async () => {
            const mockOrder = { _id: 'order1', customer: 'customer1', products: [{ product: 'prod1', quantity: 2, size: 'M' }] };
            const mockCustomer = {
                _id: 'customer1',
                orders: [],
                save: jest.fn().mockImplementation(function () {
                    this.orders.push('order1');
                }),
            };

            Order.prototype.save = jest.fn().mockResolvedValue(mockOrder);
            Customer.findById.mockResolvedValue(mockCustomer);

            const savedOrder = await addOrder({
                customer: 'customer1',
                products: [{ product: 'prod1', quantity: 2, size: 'M' }],
                total: 100,
                address: '123 Test St',
            });

            expect(Order.prototype.save).toHaveBeenCalled();
            expect(Customer.findById).toHaveBeenCalledWith('customer1');
            expect(mockCustomer.orders).toContain('order1');
            expect(mockCustomer.save).toHaveBeenCalled();
            //expect(savedOrder).toEqual(mockOrder);
        });

        it('should throw an error if adding a new order fails', async () => {
            Order.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));
            await expect(addOrder({})).rejects.toThrow('Failed to add order');
        });
    });

    describe('updateOrder', () => {
        it('should update an order successfully', async () => {
            const mockUpdatedOrder = { _id: 'order1', total: 200 };

            Order.findByIdAndUpdate.mockResolvedValue(mockUpdatedOrder);
            Order.findById.mockResolvedValue(mockUpdatedOrder);

            const updatedOrder = await updateOrder('order1', { total: 200 });

            expect(Order.findByIdAndUpdate).toHaveBeenCalledWith('order1', { total: 200 });
            expect(Order.findById).toHaveBeenCalledWith('order1');
            expect(updatedOrder).toEqual(mockUpdatedOrder);
        });

        it('should throw an error if updating an order fails', async () => {
            Order.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));
            await expect(updateOrder('order1', { total: 200 })).rejects.toThrow('Failed to update order');
        });
    });

    describe('deleteOrder', () => {
        it('should delete an order and update customer successfully', async () => {
            const mockOrder = { _id: '1', customer: 'customer1' };
            const mockCustomer = {
                _id: 'customer1',
                orders: ['1'],
                save: jest.fn().mockImplementation(function () {
                    this.orders = this.orders.filter((orderId) => orderId !== '1');
                }),
            };

            Order.findByIdAndDelete.mockResolvedValue(mockOrder);
            Customer.findById.mockResolvedValue(mockCustomer);

            const deletedOrder = await deleteOrder('1');

            expect(Order.findByIdAndDelete).toHaveBeenCalledWith('1');
            //expect(Customer.findById).toHaveBeenCalledWith('customer1');
            expect(mockCustomer.orders).not.toContain('1');
           // expect(mockCustomer.save).toHaveBeenCalled();
            expect(deletedOrder).toEqual(mockOrder);
        });

        it('should throw an error if deleting an order fails', async () => {
            Order.findByIdAndDelete.mockRejectedValue(new Error('Database error'));
            await expect(deleteOrder('order1')).rejects.toThrow('Failed to delete order');
        });
    });
});
