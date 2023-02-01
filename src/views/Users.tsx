import { Card, Select, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { findAllUsersToDb } from "../helpers";

const columns: ColumnsType<any> = [
  {
    title: 'Nombre de Usuario',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
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
    title: 'Action',
    key: 'action',
    width: '150px',
    render: (_, record) => (
      <Select
        placeholder='Roles'
        style={{ width: '100%' }}
        options={
          [
            { label: 'Admin', value: 'admin' },
            { label: 'Jurado', value: 'jury' },
            { label: 'Usuario', value: 'user' },
          ]}
      />
    ),
  },
];

export const Users = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    findAllUsersToDb()
      .then((res) => setUsers(res))
      .catch()
      .finally()
  }, [])


  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Table
        columns={columns}
        dataSource={users}
        scroll={{ x: 800 }}
        rowKey='_id'
      // loading={loading}
      // onRow={(record, rowIndex) => ({
      //   onClick: event => {
      //     navigate(`/dashboard/categories/published/${record._id}`)
      //   }
      // })}
      />
    </Card>
  )
}