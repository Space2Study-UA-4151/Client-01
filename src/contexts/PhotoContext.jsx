import { createContext, useContext, useState } from 'react';

const PhotoContext = createContext();

export const usePhoto = () => useContext(PhotoContext);

export const PhotoProvider = ({ children }) => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setPhotoFile = (file) => {
    setPhoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const value = {
    photo,
    setPhoto: setPhotoFile,
    preview,
    loading,
    setLoading,
    error,
    setError,
  };

  return <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>;
};
