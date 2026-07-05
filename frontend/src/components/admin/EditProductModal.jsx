// import { useState } from 'react';
// import api from '../../services/api';


// const EditProductModal = ({ product, onClose, onSaved }) => {
//   const [form, setForm] = useState({
//     name: product.name,
//     brand: product.brand,
//     description: product.description,
//     price: product.price,
//     quantity: product.quantity,
//     benefits: product.benefits?.length ? product.benefits : [''],
//   });
//   const [newImages, setNewImages] = useState([]);
//   const [saving, setSaving] = useState(false);

//   const updateBenefit = (i, val) => {
//     const updated = [...form.benefits];
//     updated[i] = val;
//     setForm({ ...form, benefits: updated });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     const fd = new FormData();
//     Object.entries(form).forEach(([key, val]) => {
//       if (key === 'benefits') val.filter(Boolean).forEach((b) => fd.append('benefits', b));
//       else fd.append(key, val);
//     });
//     product.images.forEach((img) => fd.append('existingImages', img));
//     newImages.forEach((file) => fd.append('images', file));

//     try {
//       const { data } = await api.put(`/products/${product._id}`, fd, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       onSaved(data);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
//       <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-lg my-8 space-y-3">
//         <h3 className="text-lg font-bold">Edit Product</h3>
//         <input className="w-full border rounded-lg px-3 py-2" value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
//         <input className="w-full border rounded-lg px-3 py-2" value={form.brand}
//           onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" />
//         <textarea className="w-full border rounded-lg px-3 py-2" value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
//         <div className="flex gap-3">
//           <input type="number" className="w-1/2 border rounded-lg px-3 py-2" value={form.price}
//             onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" />
//           <input type="number" className="w-1/2 border rounded-lg px-3 py-2" value={form.quantity}
//             onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Benefits</label>
//           {form.benefits.map((b, i) => (
//             <input key={i} className="w-full border rounded-lg px-3 py-2 mt-1" value={b}
//               onChange={(e) => updateBenefit(i, e.target.value)} placeholder={`Benefit ${i + 1}`} />
//           ))}
//           <button type="button" onClick={() => setForm({ ...form, benefits: [...form.benefits, ''] })}
//             className="text-sm text-brand-pink mt-1">+ Add benefit</button>
//         </div>

//         <div>
//           <label className="text-sm font-medium">Add More Images</label>
//           <input type="file" multiple accept="image/*" onChange={(e) => setNewImages([...e.target.files])} />
//         </div>

//         <div className="flex gap-3 pt-2">
//           <button onClick={onClose} className="flex-1 border rounded-lg py-2">Cancel</button>
//           <button onClick={handleSave} disabled={saving} className="flex-1 bg-brand-dark text-white rounded-lg py-2">
//             {saving ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProductModal;




import { useState } from 'react';
import { getImageUrl } from '../../utils/getImageUrl';
import api from '../../services/api';


const EditProductModal = ({ product, onClose, onSaved }) => {
  const [form, setForm] = useState({
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    benefits: product.benefits?.length ? product.benefits : [''],
  });
  // Track which existing images are being kept (removable individually)
  const [keptImages, setKeptImages] = useState(product.images);
  const [newImages, setNewImages] = useState([]);
  const [saving, setSaving] = useState(false);

  const updateBenefit = (i, val) => {
    const updated = [...form.benefits];
    updated[i] = val;
    setForm({ ...form, benefits: updated });
  };

  const removeExistingImage = (img) => {
    setKeptImages((prev) => prev.filter((i) => i !== img));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (keptImages.length + newImages.length === 0) {
      alert('Product must have at least one image');
      return;
    }

    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'benefits') val.filter(Boolean).forEach((b) => fd.append('benefits', b));
      else fd.append(key, val);
    });

    // Only send the images that are still kept (removed ones are simply omitted)
    keptImages.forEach((img) => fd.append('existingImages', img));
    newImages.forEach((file) => fd.append('images', file));

    try {
      const { data } = await api.put(`/products/${product._id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSaved(data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-lg my-8 space-y-3">
        <h3 className="text-lg font-bold">Edit Product</h3>
        <input className="w-full border rounded-lg px-3 py-2" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input className="w-full border rounded-lg px-3 py-2" value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" />
        <textarea className="w-full border rounded-lg px-3 py-2" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <div className="flex gap-3">
          <input type="number" className="w-1/2 border rounded-lg px-3 py-2" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" />
          <input type="number" className="w-1/2 border rounded-lg px-3 py-2" value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" />
        </div>

        <div>
          <label className="text-sm font-medium">Benefits</label>
          {form.benefits.map((b, i) => (
            <input key={i} className="w-full border rounded-lg px-3 py-2 mt-1" value={b}
              onChange={(e) => updateBenefit(i, e.target.value)} placeholder={`Benefit ${i + 1}`} />
          ))}
          <button type="button" onClick={() => setForm({ ...form, benefits: [...form.benefits, ''] })}
            className="text-sm text-brand-pink mt-1">+ Add benefit</button>
        </div>

        {/* Current images with remove option */}
        <div>
          <label className="text-sm font-medium">Current Images</label>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {keptImages.map((img) => (
              <div key={img} className="relative">
                <img src={getImageUrl(img)} alt="" className="w-full aspect-square object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(img)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New images to upload, with previews */}
        <div>
          <label className="text-sm font-medium">Add New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setNewImages((prev) => [...prev, ...Array.from(e.target.files)])}
          />
          {newImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {newImages.map((file, i) => (
                <div key={i} className="relative">
                  <img src={URL.createObjectURL(file)} alt="" className="w-full aspect-square object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 border rounded-lg py-2">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 bg-brand-dark text-white rounded-lg py-2">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;