import { useRef, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style';
import { useStepContext } from '~/context/step-context';
import addImageIcon from '~/assets/img/tutor-my-courses/add-image-icon.svg';

const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const AddPhotoStep = ({ btnsBox }) => {
  const inputRef = useRef();
  const { stepData, handleStepData } = useStepContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const photo = stepData['photo'];
  const [preview, setPreview] = useState(photo && photo instanceof File ? URL.createObjectURL(photo) : '');

  const handleFileChange = async (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      setError('Only .png, .jpg, .jpeg files are allowed');
      handleStepData('photo', null);
      setPreview('');
      return;
    }
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 10 MB');
      handleStepData('photo', null);
      setPreview('');
      return;
    }
    setLoading(true);
    handleStepData('photo', file);
    setPreview(URL.createObjectURL(file));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    e.target.value = null;
  };

  return (
    <Box sx={style.root}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #bbb', borderRadius: 4, minHeight: 400 }}>
        {preview ? (
          <img src={preview} alt="Photo Preview" style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8 }} />
        ) : (
          <img src={addImageIcon} alt="Add Preview" style={{ maxWidth: 180, maxHeight: 180, opacity: 0.5 }} />
        )}
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2 }}>
        <Typography sx={{ mb: 2 }}>
          Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </Typography>
        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          variant="outlined"
          startIcon={<span role="img" aria-label="upload">📤</span>}
          onClick={() => inputRef.current && inputRef.current.click()}
          disabled={loading}
        >
          Upload your profile photo
        </Button>
        <Typography variant="body2" color="textSecondary">Maximum file size - 10 Mb</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {loading && <CircularProgress size={24} sx={{ mt: 1 }} />}
        {photo && !error && !loading && (
          <Typography color="success.main" sx={{ mt: 1 }}>✓ Photo loaded</Typography>
        )}
        <div style={{ width: '100%', marginTop: 200 }}>{btnsBox}</div>
      </Box>
    </Box>
  );
};

export default AddPhotoStep;
