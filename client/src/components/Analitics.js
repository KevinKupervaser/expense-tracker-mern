import React from "react";
import "../resources/analitics.css";
import { Progress } from "antd";

const Analitics = ({ transactions }) => {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;

  const categories = [
    "salario",
    "alquileres",
    "mercado",
    "inversiones",
    "entretenimiento",
    "viajes",
    "educación",
    "salud",
    "otros",
  ];

  return (
    <div>
      <div className='row analytics'>
        <div className='col-md-4 mt-3'>
          <div className='transactions-count'>
            <h4>Total de Transacciones: {totalTransactions}</h4>
            <hr />
            <h5>Ingresos: {totalIncomeTransactions.length}</h5>
            <h5>Egresos: {totalExpenseTransactions.length}</h5>

            <div className='progress-bars'>
              <Progress
                className='mx-4'
                type='circle'
                strokeColor={"#5DD64F"}
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />
              <Progress
                type='circle'
                strokeColor={"#ff4545"}
                percent={totalExpenseTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className='col-md-4 mt-3'>
          <div className='transactions-count'>
            <h4>Retorno: {totalTurnover}</h4>
            <hr />
            <h5>Ingresos: {totalIncomeTurnover}</h5>
            <h5>Egresos: {totalExpenseTurnover}</h5>

            <div className='progress-bars'>
              <Progress
                className='mx-4'
                type='circle'
                strokeColor={"#5DD64F"}
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />
              <Progress
                type='circle'
                strokeColor={"#ff4545"}
                percent={totalExpenseTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className='row'>
        <div className='col-md-6'>
          <div className='category-analysis'>
            <h4>Ingresos</h4>
            {categories.map((category, index) => {
              const amount = transactions
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className='category-card'>
                    <h5 key={index}>{category}</h5>
                    <Progress
                      strokeColor={"#5DD64F"}
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>

        <div className='col-md-6'>
          <div className='category-analysis'>
            <h4>Egresos</h4>
            {categories.map((category, index) => {
              const amount = transactions
                .filter((t) => t.type === "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className='category-card'>
                    <h5 key={index}>{category}</h5>
                    <Progress
                      strokeColor={"#ff4545"}
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analitics;
