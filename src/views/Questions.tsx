import { Card, Select, Switch, Slider, Radio, Form, Checkbox, Row, Col, Rate, Upload, Button, Space, Typography, Input } from "antd"
import { AiOutlineUpload, AiOutlineInbox } from "react-icons/ai"

const { Option } = Select;
const { Title } = Typography;

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

const { TextArea } = Input;

export const Questions = () => {
  return (
    <Card>
      <Form
        layout="vertical"
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
      >
        <Row justify="space-around" align="middle" gutter={[8, 48]}>
          <Col span={24}>
            <Space direction="vertical" size="middle" >
              <Title level={5}>¿In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development?</Title>
              <Radio.Group onChange={() => { }} >
                <Space direction="vertical" size='large'>
                  <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>Option C</Radio>
                  <Radio value={4}>Option D</Radio>
                  <Radio value={5}>Option F</Radio>
                </Space>
              </Radio.Group>
            </Space>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size="middle" >
              <Title level={5}>¿In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development?</Title>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <TextArea
                  showCount
                  maxLength={100}
                  onChange={() => { }}
                  placeholder="can resize"
                />
              </Form.Item>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={18}>
            <Button htmlType="submit">
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </Card >
  )
}
