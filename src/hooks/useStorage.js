import { useState, useEffect } from 'react';
import { storage } from 'src/libs/firebase';

export const useStorage = (initFile, file, path) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initFile);
  const [uploadLoading, setUploadLoading] = useState(false);

  // runs every time the file value changes
  useEffect(() => {
    if (file) {
      setUrl('');
      // storage ref
      setUploadLoading(true);
      const storageRef = storage.ref(`${path}/${file.name}`);

      storageRef.put(file).on(
        'state_changed',
        snap => {
          // track the upload progress
          let percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          setProgress(percentage);
        },
        err => {
          setError(err);
          setUploadLoading(true);
        },
        async () => {
          // get the public download img url
          const downloadUrl = await storage
            .ref(path)
            .child(file.name)
            .getDownloadURL();

          // save the url to local state
          setUrl(downloadUrl);
          setUploadLoading(true);
        }
      );
    }
  }, [file]);

  return { progress, url, uploadLoading, error };
};
