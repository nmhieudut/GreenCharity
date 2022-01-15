import { useState, useEffect } from 'react';
import { storage } from 'src/libs/firebase';

export const useStorage = (initFile, file, path) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initFile);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (file) {
      setUrl('');
      setUploadLoading(true);
      const storageRef = storage.ref(`${path}/${file.name}`);

      storageRef.put(file).on(
        'state_changed',
        snap => {
          let percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          setProgress(percentage);
        },
        err => {
          setError(err);
          setUploadLoading(false);
        },
        async () => {
          const downloadUrl = await storage
            .ref(path)
            .child(file.name)
            .getDownloadURL();
          setUrl(downloadUrl);
          setUploadLoading(false);
        }
      );
    }
  }, [file]);

  return { progress, url, uploadLoading, error };
};
