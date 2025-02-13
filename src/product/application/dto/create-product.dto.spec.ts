/**
 * @jest-enviroment node
 */

import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

describe('CreateProductDto', () => {
  it('should validate a correct product', async () => {
    const product = plainToInstance(CreateProductDto, {
      name: 'Product Name',
      ingredients: [
        { id: '550e8400-e29b-41d4-a716-446655440000', quantity: 2 },
      ],
      price: 10000,
      userId: '550e8400-e29b-41d4-a716-446655440000',
    });
    const errors = await validate(product);
    expect(errors.length).toBe(0);
  });

  it('should fail when name is empty', async () => {
    const product = plainToInstance(CreateProductDto, {
      name: '',
      description: 'Product description',
      ingredients: [
        { id: '550e8400-e29b-41d4-a716-446655440000', quantity: 2 },
      ],
      price: 10000,
      userId: '550e8400-e29b-41d4-a716-446655440000',
    });
    const errors = await validate(product);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail when ingredients array is empty', async () => {
    const product = plainToInstance(CreateProductDto, {
      name: 'Product Name',
      description: 'Product description',
      ingredients: [],
      price: 10000,
      userId: '550e8400-e29b-41d4-a716-446655440000',
    });
    const errors = await validate(product);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail when price is below 10000', async () => {
    const product = plainToInstance(CreateProductDto, {
      name: 'Product Name',
      description: 'Product description',
      ingredients: [
        { id: '550e8400-e29b-41d4-a716-446655440000', quantity: 2 },
      ],
      price: 5000,
      userId: '550e8400-e29b-41d4-a716-446655440000',
    });
    const errors = await validate(product);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail when userId is not a valid UUID', async () => {
    const product = plainToInstance(CreateProductDto, {
      name: 'Product Name',
      description: 'Product description',
      ingredients: [
        { id: '550e8400-e29b-41d4-a716-446655440000', quantity: 2 },
      ],
      price: 10000,
      userId: 'invalid-uuid',
    });
    const errors = await validate(product);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail when ingredients are incorrect', async () => {
    const product = plainToInstance(CreateProductDto, {
      name: 'Product Name',
      description: 'Product description',
      ingredients: [
        { id: '550e8400-e29b-41d4-a716-446655440000', quantity: 0 },
      ],
      price: 10000,
      userId: '550e8400-e29b-41d4-a716-446655440000',
    });
    const errors = await validate(product);
    console.log('🚀 ~ it ~ errors:', errors);
    expect(errors.length).toBeGreaterThan(0);
  });
});
