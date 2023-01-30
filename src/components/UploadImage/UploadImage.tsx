import { Button, message, Upload } from "antd"
import { AiOutlineUpload } from "react-icons/ai"
import axios from "axios";
import { useState } from "react";

export const UploadImage = ({ form }: any) => {
  const [fileList, setFileList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const images: string[] = []


  const handleUpload = (e: any) => {
    setLoading(true)
    const formData = new FormData();
    formData.append('file', e.file);
    formData.append('upload_preset', 'prueba');

    return axios.post('https://api.cloudinary.com/v1_1/alexispavon010/auto/upload', formData)
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
      <Button loading={loading} icon={<AiOutlineUpload />}>Click to upload</Button>
    </Upload>
  )
}
