import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
// import PropTypes from 'prop-types';
import { getAllUsersOrders, cancelOrder } from '../../redux/actions/orders';

import { DropDown } from '../../assets/icons';
import cancel from '../../assets/images/cancel.png';
import config from '../../config/default.json';
import './styles.scss';
import { Link } from 'react-router-dom';

OrderList.propTypes = {

};

function OrderList({ auth, orders, getAllUsersOrders, cancelOrder }) {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setLoading(true);
      getAllUsersOrders();
      setLoading(false);
    }
  }, [auth, getAllUsersOrders, loading]);

  const handleClick = (index) => {
    setTab(index);
  }

  const handleCancelOrder = (orderId) => {
    confirmAlert({
      title: 'Confirm to cancel order',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            async function cancel() {
              setLoading(true);
              await cancelOrder(orderId);
              setLoading(false);
            }
            cancel();
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  return (
    <div className="order-list">
      <div className="tab">
        <p className="tab__title">My Orders ({orders.length})</p>
        <p onClick={() => handleClick(0)} className={tab === 0 ? "tab__name tab__name--active" : "tab__name"}>Pending orders ({orders.filter(order => order.status === config.PENDING_ORDER).length})</p>
      </div>
      { orders && orders.length <= 0 ? (<div className="no-order"><p>You don't have any order <Link className="link" to="/">Back to shop</Link></p></div>) : (
        <div className="tab__content">
          { orders.filter(order => order.status === config.PENDING_ORDER).length <= 0 ? (<div className="no-order"><p>No pending order <Link className="link" to="/">Back to shop</Link></p></div>) : (
            <table>
              <thead>
                <tr>
                  <th style={{ width: "12%" }}>ORDERED ID</th>
                  <th style={{ width: "16%" }}>ORDERED DATE</th>
                  <th style={{ width: "35%" }}>DETAIL</th>
                  <th style={{ width: "10%" }}>TOTAL ($)</th>
                  <th style={{ width: "11%" }}>STATUS</th>
                  <th style={{ width: "12%" }}></th>
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
                        <div className="action">
                          <p>Actions</p>
                          <DropDown />
                          <div className="dropdown" onClick={() => handleCancelOrder(order._id)}>
                            <div>
                              <img className="cancel__image" src={cancel} alt="Cancel" />
                              <p>Remove</p>
                            </div>
                          </div>
                        </div>
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
