import { useState } from "react";

function ImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    onImageSelect(file);
  };

  return (
    <div className="space-y-4">

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-64 object-cover rounded-xl"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

    </div>
  );
}

export default ImageUploader;