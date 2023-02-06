import { Button, message, Upload } from "antd"
import { AiFillVideoCamera } from "react-icons/ai"
import { useState, useEffect } from "react";
import axios from "axios";

export const UploadVideo = ({ form }: any) => {
  const [fileList, setFileList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const videos: string[] = []

  const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL!

  useEffect(() => {
    form.getFieldValue('videos').length > 0 ? setFileList(form.getFieldValue('videos').map((url: string) => ({ url }))) : setFileList([])
  }, [])

  const handleUpload = (e: any) => {
    setLoading(true)
    const formData = new FormData();
    formData.append('file', e.file);
    formData.append('upload_preset', 'prueba');

    return axios.post(CLOUDINARY_URL, formData)
      .then((response) => {
        console.log(response)
        setFileList((state: any) => [...state, { uid: response.data.public_id, url: response.data.secure_url, name: response.data.original_filename }]);
        videos.push(response.data.secure_url)
        form.setFieldValue('videos', videos)
      })
      .catch((error) => {
        message.error(error.message);
        setLoading(false)
      })
      .finally(() => setLoading(false))
  }

  const handleRemove = (file: any) => {
    setFileList(fileList.filter((item: any) => item.uid !== file.uid));
  };

  return (
    <Upload
      customRequest={handleUpload}
      onRemove={handleRemove}
      fileList={fileList}
      multiple
      name="video"
      listType="picture"
      maxCount={2}
      accept='video/*'
    >
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}
        loading={loading}
        icon={<AiFillVideoCamera size={16} />}
      >
        Subir Videos
      </Button>
    </Upload>
  )
}
