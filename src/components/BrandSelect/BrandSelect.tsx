import { Select, Divider, Row, Col, Input, Button, Form, Tooltip } from "antd"
import { useState, useEffect } from 'react'
import { BsInfoCircle } from "react-icons/bs"

import { createBrand, getBrands } from "../../api"

export const BrandSelect = () => {
  const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState([])
  const [formBrand] = Form.useForm()


  const handleCreateBrand = (values: any) => {
    setLoading(true)
    createBrand(values)
      .then(({ data }) => {
        const newBrands = [data, ...brands]
        // @ts-ignore 
        setBrands(newBrands)
        formBrand.resetFields()
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getBrands()
      .then(({ data }) => {
        setBrands(data)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])


  return (
    <Form.Item
      name="brand"
      label={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>Marcas</span>
          <Tooltip placement="topLeft" title={`Selecciona tu marca de la lista desplegable. Si no aparece en nuestra base de datos, puedes seleccionar "Otro" y agregar tu marca.`}>
            <BsInfoCircle color="#1677ff" />
          </Tooltip>
        </div >
      }
      hasFeedback
      rules={[{ required: true, message: 'El nombre de la marca es requerido!' }]}
    >
      <Select
        options={[
          {
            label: 'Financiera',
            options: [
              { label: 'Interbank', value: 'Interbank' },
              { label: 'Interseguro', value: 'Interseguro' },
              { label: 'Inteligo', value: 'Inteligo' },
              { label: 'Express Net', value: 'Express Net' },
              { label: 'Izipay', value: 'Izipay' },
            ],
          },
          {
            label: 'Retail',
            options: [
              { label: 'Plaza Vea', value: 'Plaza Vea' },
              { label: 'Makro', value: 'Makro' },
              { label: 'Mass', value: 'Mass' },
              { label: 'Vivanda', value: 'Vivanda' },
              { label: 'Real Plaza', value: 'Real Plaza' },
              { label: 'Oechsle', value: 'Oechsle' },
              { label: 'Agora', value: 'Agora' },
              { label: 'Promart', value: 'Promart' },
              { label: 'Financiera Oh', value: 'Financiera Oh' },
            ],
          },
          {
            label: 'Salud',
            options: [
              { label: 'Inkafarma', value: 'Inkafarma' },
              { label: 'Mifarma', value: 'Mifarma' },
              { label: 'Química Suiza', value: 'Química Suiza' },
              { label: 'Clínica Aviva', value: 'Clínica Aviva' },
            ],
          },
          {
            label: 'Educación',
            options: [
              { label: 'Innova Schools', value: 'Innova Schools' },
              { label: 'UTP', value: 'UTP' },
              { label: 'Idat', value: 'Idat' },
              { label: 'Its', value: 'Its' },
              { label: 'Zegel', value: 'Zegel' },
              { label: 'Perú Champs', value: 'Perú Champs' },
              { label: 'Corriente Alterna', value: 'Corriente Alterna' },
              { label: 'Colectivo 23', value: 'Colectivo 23' },

            ],
          },
          {
            label: 'Marcas Exclusivas',
            options: brands.map(({ brandName }) => (
              { label: brandName, value: brandName }
            ))
          },
        ]}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '24px 0' }} />
            <Form
              form={formBrand}
              onFinish={handleCreateBrand}
            >
              <Row
                style={{
                  padding: '0 20px'
                }}
                gutter={8}
              >
                <Col flex={1}>
                  <Form.Item
                    name='brandName'
                    rules={[{ required: true, message: 'El nombre de la marca es requerido!' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Nombre de la marca"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Button loading={loading} type="primary" htmlType='submit'>
                    Agregar Marca
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        )}
      />
    </Form.Item>
  )
}