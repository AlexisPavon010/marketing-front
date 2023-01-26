import { Button, Card, Checkbox, Col, Form, InputNumber, Radio, Rate, Row, Select, Slider, Switch, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { AiOutlineInbox, AiOutlineUpload } from 'react-icons/ai';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};

export const Home = () => {
  return (
    <Card>
      <Form
        layout="vertical"
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
      >
        <Form.Item
          name="categories"
          label="Categorías"
          hasFeedback
        // rules={[{ required: true, message: 'Please select your country!' }]}
        >
          <Select placeholder="Please select a country">
            <Option value="china">Performance Marketing</Option>
            <Option value="usa">Marketing Promocional</Option>
            <Option value="china">Estrategia de Crecimiento</Option>
            <Option value="usa">Creación de Contenido</Option>
            <Option value="usa">Branding</Option>
            <Option value="usa">Impacto Positivo</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="brands"
          label="Marcas"
          hasFeedback
        // rules={[{ required: true, message: 'Please select your country!' }]}
        >
          <Select placeholder="Please select a country">
            <Option value="china">Performance Marketing</Option>
            <Option value="usa">Marketing Promocional</Option>
            <Option value="china">Estrategia de Crecimiento</Option>
            <Option value="usa">Creación de Contenido</Option>
            <Option value="usa">Branding</Option>
            <Option value="usa">Impacto Positivo</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Descripcion" help="maximo 1000 caracteres">
          <Form.Item name="description" noStyle>
            <TextArea rows={4} minLength={100} maxLength={1000} />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Dragger">
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <AiOutlineInbox />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="long"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<AiOutlineUpload />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
