import * as React from "react";
import { Select } from "antd";
import Form from "antd/es/form/Form";
import Input from "antd/lib/input/Input";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import { message } from "antd";
import Spinner from "./Spinner";

const AddEditTransaction = ({
  showAddEditTransactionModal,
  setShowAddEditTransactionModal,
  selectedItemForEdit,
  getTransactions,
  setSelectedItemForEdit,
}) => {
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("money-track-user"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: { ...values, userid: user._id },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Transaction updated successfully");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success("Transaction added successfully");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Modal
      title={selectedItemForEdit ? "Editar" : "Añadir"}
      visible={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout='vertical'
        className='transaction-form'
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label='Monto' name='amount'>
          <Input type='text' />
        </Form.Item>

        <Form.Item label='Tipo' name='type'>
          <Select>
            <Select.Option value='income'>Ingresos</Select.Option>
            <Select.Option value='expense'>Egresos</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Categoria' name='category'>
          <Select>
            <Select.Option value='salario'>Salario</Select.Option>
            <Select.Option value='alquileres'>Alquileres</Select.Option>
            <Select.Option value='mercado'>Supermercado</Select.Option>
            <Select.Option value='inversiones'>Inversiones</Select.Option>
            <Select.Option value='entretenimiento'>
              Entretenimiento
            </Select.Option>
            <Select.Option value='viajes'>Viajes</Select.Option>
            <Select.Option value='educación'>Educación</Select.Option>
            <Select.Option value='salud'>Salud</Select.Option>
            <Select.Option value='otros'>Otros</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Fecha' name='date'>
          <Input type='date' />
        </Form.Item>
        <Form.Item label='Referencia' name='reference'>
          <Input type='text' />
        </Form.Item>
        <Form.Item label='Descripción' name='description'>
          <Input type='text' />
        </Form.Item>

        <div className='d-flex justify-content-end'>
          <button className='primary' type='submit'>
            GUARDAR
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransaction;
