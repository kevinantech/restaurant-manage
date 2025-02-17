/**
 * @jest-enviroment node
 */

import { getRequiredIngredients } from './create-order.uc';

/* interface IIngredient {
  id: string;
  quantity: number;
}

interface IProduct {
  ingredients: IIngredient[];
}

describe('create-order', () => {
  it('should correctly aggregate ingredient quantities by ID', () => {
    const products: IProduct[] = [
      {
        ingredients: [
          { id: '1', quantity: 2 },
          { id: '2', quantity: 3 },
        ],
      },
      {
        ingredients: [
          { id: '1', quantity: 5 },
          { id: '3', quantity: 4 },
        ],
      },
      {
        ingredients: [
          { id: '2', quantity: 1 },
          { id: '3', quantity: 2 },
        ],
      },
    ];

    const ingredientsById = getRequiredIngredients(products);

    expect(ingredientsById).toEqual({
      '1': { quantity: 7 },
      '2': { quantity: 4 },
      '3': { quantity: 6 },
    });
  });
});
 */
