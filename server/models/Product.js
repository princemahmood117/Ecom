import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }], // 4 images
  quantity: { type: Number, required: true, default: 0 },
  benefits: [{ type: String }],
}, { timestamps: true });

productSchema.virtual('inStock').get(function () {
  return this.quantity > 0;
});
productSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Product', productSchema);