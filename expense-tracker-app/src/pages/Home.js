import * as React from "react";
import AddEditTransaction from "../components/AddEditTransaction";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import "../resources/transactions.css";
import axios from "axios";
import { DatePicker, message, Select } from "antd";
import { Table } from "antd";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Analitics from "../components/Analitics";

const { RangePicker } = DatePicker;

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [transactionsData, setTransactionsData] = React.useState([]);
  const [frequency, setFrequency] = React.useState("7");
  const [selectedRange, setSelectedRange] = React.useState([]);
  const [type, setType] = React.useState("all");
  const [viewType, setViewType] = React.useState("table");

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("money-track-user"));
      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      // console.log(response.data);
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaction Deleted Successfully");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  React.useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Monto",
      dataIndex: "amount",
    },
    {
      title: "Categoria",
      dataIndex: "category",
    },
    {
      title: "Referencia",
      dataIndex: "reference",
    },
    {
      title: "Descripción",
      dataIndex: "description",
    },
    {
      title: "Editar/Borrar",
      dataIndex: "editar",
      render: (text, record) => {
        return (
          <div className='d-flex'>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined
              className='mx-4'
              onClick={() => deleteTransaction(record)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className='filter d-flex justify-content-between align-items-center'>
        <div className='d-flex'>
          <div className='d-flex flex-column'>
            <h6>Filtrar por Fechas      </h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Ultima Semana</Select.Option>
              <Select.Option value='30'>Ultimo Mes</Select.Option>
              <Select.Option value='365'>Ultimo Año</Select.Option>
              <Select.Option value='custom'>Personalizada</Select.Option>
              <Select.Option value='1000000'>Todas</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className='mt-2'>
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>

          <div className='d-flex flex-column mx-5'>
            <h6>Tipo de Transacción</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value='all'>Todas</Select.Option>
              <Select.Option value='income'>Ingresos</Select.Option>
              <Select.Option value='expense'>Egresos</Select.Option>
            </Select>
          </div>
        </div>

        <div className='d-flex'>
          <div>
            <div className='view-switch mx-4'>
              <UnorderedListOutlined
                className={`mx-2 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("table")}
              />
              <AreaChartOutlined
                className={` ${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("analytics")}
              />
            </div>
          </div>
          <button
            className='primary'
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            AÑADIR
          </button>
        </div>
      </div>

      <div className='table-analitics'>
        {viewType === "table" ? (
          <div className='table'>
            <Table columns={columns} dataSource={transactionsData} />
          </div>
        ) : (
          <Analitics transactions={transactionsData} />
        )}
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          setSelectedItemForEdit={setSelectedItemForEdit}
          getTransactions={getTransactions}
        />
      )}
    </DefaultLayout>
  );
};

export default Home;
