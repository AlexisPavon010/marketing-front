import { Form, Radio, Space, Typography } from 'antd'

export const Step4 = () => {
  return (
    <>
      <Typography.Title style={{ width: '100%' }} level={5}>¿La Acción / Campaña / Idea es diferente a lo que hace la competencia? (Para casos de performance marketing: ¿utiliza nuevas plataformas o herramientas?)</Typography.Title>
      <Space direction="vertical" size='large'>
        <Form.Item name='pregunta4' rules={[{ required: true, message: 'Por favor seleccione una respuesta.' }]}>
          <Radio.Group style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
            <Radio value={1}>Muy insatisfactorio</Radio>
            <Radio value={2}>Insatisfactorio</Radio>
            <Radio value={3}>Neutral</Radio>
            <Radio value={4}>Satisfactorio</Radio>
            <Radio value={5}>Muy satisfactorio</Radio>
          </Radio.Group>
        </Form.Item>
      </Space>
    </>
  )
}
