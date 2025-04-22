import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  initialImage?: string;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageChange, 
  initialImage,
  error
}) => {
  const [preview, setPreview] = React.useState<string | null>(initialImage || null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageChange(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });
  
  const removeImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Product Image
      </label>
      
      {!preview ? (
        <motion.div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 cursor-pointer text-center transition-colors
            ${isDragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400'}
          `}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive ? 'Drop the image here' : 'Drag and drop an image, or click to select'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG or WEBP (max 5MB)
          </p>
        </motion.div>
      ) : (
        <div className="relative">
          <motion.img 
            src={preview} 
            alt="Preview" 
            className="w-full h-64 object-cover rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label="Remove image"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;