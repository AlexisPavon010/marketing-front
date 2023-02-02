import { Button, message, Upload } from "antd"
import axios from "axios";
import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";

export const UploadImage = ({ form }: any) => {
  const [fileList, setFileList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const images: string[] = []

  const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL!

  const handleUpload = (e: any) => {
    setLoading(true)
    const formData = new FormData();
    formData.append('file', e.file);
    formData.append('upload_preset', 'prueba');

    return axios.post(CLOUDINARY_URL, formData)
      .then((response) => {
        console.log(response)
        setFileList((state: any) => [...state, { uid: response.data.public_id, url: response.data.secure_url, name: response.data.original_filename }]);
        images.push(response.data.secure_url)
        form.setFieldValue('images', images)
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
      name="file"
      listType="picture"
      maxCount={4}
      accept='image/*'
    >
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}
        loading={loading}
        icon={<BsFillImageFill size={16} />}
      >
        Subir Imagenes
      </Button>
    </Upload>
  )
}
