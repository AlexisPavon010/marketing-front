import { Card, Select, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { IUser } from "../interfaces/User";
import { getUsers, updatedRole } from "../api/auth";


export const Users = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<IUser[]>([])

  const handleChangeRole = (id: string, role: string) => {
    updatedRole(id, role).then(() => {
      toast.success('Rol Actualizado con Exito! 🚀', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
    })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    setLoading(true)
    getUsers()
      .then(({ data }) => setUsers(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  const columns: ColumnsType<any> = [
    {
      title: 'Nombre de Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      align: 'center',
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag>
          {role.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Cambio de Rol',
      key: 'action',
      width: '150px',
      render: (user) => (
        <Select
          placeholder='Roles'
          style={{ width: '100%' }}
          onChange={(role) => handleChangeRole(user._id, role)}
          value={user.role}
          options={
            [
              { label: 'Admin', value: 'admin' },
              { label: 'Jurado', value: 'jury' },
              { label: 'Usuario', value: 'user' },
            ]}
        />

      )
    }
  ];

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Table
        columns={columns}
        dataSource={users}
        scroll={{ x: 800 }}
        rowKey='docId'
        loading={loading}
      // onRow={(record, rowIndex) => ({
      //   onClick: event => {
      //     navigate(`/dashboard/categories/published/${record._id}`)
      //   }
      // })}
      />
    </Card>
  )
}