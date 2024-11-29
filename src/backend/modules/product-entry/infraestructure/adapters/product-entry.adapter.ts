import { IProductEntry } from "../../domain/product-entry.entity";

export class ProductEntryAdapter {
  private adaptee: any;
  constructor(adaptee: any) {
    this.adaptee = adaptee;
  }

  requestOne(): IProductEntry {
    return {
      id: this.adaptee.id,
      name: this.adaptee.name,
      category: this.adaptee.category,
      unitOfMeasure: this.adaptee.unitOfMeasure,
      unitWeight: this.adaptee.unitWeight,
      stock: this.adaptee.stock,
    };
  }

  request(): IProductEntry[] {
    return (this.adaptee as []).map((p) =>
      new ProductEntryAdapter(p).requestOne()
    );
  }
}
