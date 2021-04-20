import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
// import PropTypes from 'prop-types';
import { getAllUsersOrders, cancelOrder } from '../../redux/actions/orders';
import Select from 'react-select';

import config from '../../config/default.json';
import './styles.scss';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

OrderList.propTypes = {

};

function OrderList({ auth, orders, getAllUsersOrders, cancelOrder }) {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setLoading(true);
      getAllUsersOrders();
      setLoading(false);
    }
  }, [auth, getAllUsersOrders]);

  const handleClick = (index) => {
    setTab(index);
  }

  const handleChange = (option, orderId) => {
    if (option.value === config.CANCELED_ORDER) {
      confirmAlert({
        title: 'Confirm to cancel order',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => cancelOrder(orderId)
          },
          {
            label: 'No',
            onClick: () => { }
          }
        ]
      });
    }
  }

  const options = [
    { value: 0, label: 'Cancle order' }
  ];

  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      border: 'none',
      display: 'flex',
      justifyContent: 'flex-end'
    }),
  }

  const indicatorSeparatorStyle = {
    width: 0,
  };

  const IndicatorSeparator = ({ innerProps }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };

  return (
    <div className="order-list">
      <div className="tab">
        <p className="tab__title">My Orders ({orders.length})</p>
        <p onClick={() => handleClick(0)} className={tab === 0 ? "tab__name tab__name--active" : "tab__name"}>Pending orders ({orders.filter(order => order.status === config.PENDING_ORDER).length})</p>
      </div>
      { orders && orders.length <= 0 ? (<div className="no-order"><p>You don't have any order <Link className="link" to="/products">Back to shop</Link></p></div>) : (
        <div className="tab__content">
          { orders.filter(order => order.status === config.PENDING_ORDER).length <= 0 ? (<div className="no-order"><p>No pending order <Link className="link" to="/products">Back to shop</Link></p></div>) : (
            <table>
              <thead>
                <tr>
                  <th style={{ width: "12%" }}>ORDERED ID</th>
                  <th style={{ width: "15%" }}>ORDERED DATE</th>
                  <th style={{ width: "35%" }}>DETAIL</th>
                  <th style={{ width: "8%" }}>TOTAL ($)</th>
                  <th style={{ width: "12%" }}>STATUS</th>
                  <th style={{ width: "20%" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr className="divider">
                  <td colSpan="6"></td>
                </tr>
                {tab === 0 &&
                  orders.filter(order => order.status === config.PENDING_ORDER).map(order => (
                    <tr>
                      <td>{order.orderId}</td>
                      <td>{new Date(order.orderedDate).toDateString()}</td>
                      <td>{order.detail[0].name} ({order.detail[0].sizeId.sizeName}) x {order.detail[0].quantity}</td>
                      <td>{order.total}.00</td>
                      <td><span className="status">Pending</span></td>
                      <td>
                        <Select
                          className="select"
                          value={{ value: -1, label: "Actions" }}
                          components={{ IndicatorSeparator }}
                          styles={customStyles}
                          onChange={(option) => handleChange(option, order._id)}
                          options={options}
                          isSearchable={false}
                        />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  orders: state.orders.orders
})

export default connect(mapStateToProps, { getAllUsersOrders, cancelOrder })(OrderList);
