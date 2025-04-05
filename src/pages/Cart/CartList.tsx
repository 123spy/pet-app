import React, { useEffect, useState } from 'react';
import { Table, Image, message, Button, Popconfirm, Result, Tag, Typography } from 'antd';
import moment from 'moment';
import { deleteCartUsingPost, ListCartByPageUsingPost } from "@/services/CartController";
import { useModel } from "@@/exports";
import styles from './CartList.module.css';
import { Link } from "react-router-dom";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const defaultImage = 'https://th.bing.com/th/id/OIP.DcyE_0CV83AVX6CKqTmCzgHaGm?rs=1&pid=ImgDetMain';

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await ListCartByPageUsingPost({ userId: currentUser?._id });
      if (response.code === 0) {
        setCartItems(response.data.records);
      } else {
        message.error(response.msg);
      }
    } catch (error) {
      message.error('Failed to fetch cart items. Please check your network or API endpoint.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchCartItems();
    }
  }, [currentUser?._id]);

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'image',
      dataIndex: 'product.productImage',
      key: 'productImage',
      render: (_, record) => (
        <Image
          src={record.product?.productImages[0] || defaultImage}
          alt="Product"
          width={50}
          height={50}
          fallback={defaultImage}
          className={styles.productImage}
        />
      ),
    },
    {
      title: 'name',
      key: 'productName',
      render: (_, record) => (
        <div className={styles.productName}>{record.product?.productName}</div>
      ),
    },
    {
      title: 'tag',
      key: 'tag',
      render: (_, record) => (
        <div>
          {
            record.product?.productTags?.map((tag) => (
              <Tag color="volcano" className={styles.productCategory}>
                {tag}
              </Tag>
            ))
          }

        </div>
      ),
    },
    {
      title: 'price',
      key: 'productPrice',
      render: (_, record) => (
        <div className={styles.productPrice}>￥{record.product?.productPrice}</div>
      ),
    },
    {
      title: 'num',
      key: 'quantity',
      render: (_, record) => <div className={styles.quantity}>{record.quantity || 1}</div>,
    },
    {
      title: 'time',
      key: 'creatTime',
      render: (_, record) => (
        <div className={styles.orderTime}>
          {moment(record.creatTime).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      ),
    },
    {
      title: 'optional',
      key: 'action',
      render: (_, record) => (
        <div className={styles.actionButtons}>
          <Button type="primary" onClick={() => handleRemove(record._id)} className={styles.removeButton}>
            delete
          </Button>
        </div>
      ),
    },
  ];

  const handleRemove = async (cartItemId) => {
    const res = await deleteCartUsingPost({ id: cartItemId });
    if (res?.code === 0) {
      message.success(`delete success: favorite id: ${cartItemId}`);
    } else {
      message.error(`delete error: favorite id: ${cartItemId}, ${res?.message}`);
    }
    await fetchCartItems();
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      message.warning('favorite is null');
      return;
    }

    try {
      const deletePromises = cartItems.map(item => deleteCartUsingPost({ id: item._id }));
      await Promise.all(deletePromises);

      setCartItems([]);

      message.success('Pet adoption was successful');
    } catch (error) {
      message.error('Failed pet adoption');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.productPrice || 0) * (item.quantity || 1);
    }, 0);
  };

  if (!currentUser?._id) {
    return (
      <div>
        <Result
          status="404"
          title="404"
          subTitle="Please log in to view."
          extra={<Button type="primary"> <Link to={"/user/login"}>login</Link></Button>}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>favorite list</h1>
      <Table
        columns={columns}
        dataSource={cartItems}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 10 }}
        loading={loading}
        className={styles.table}
      />
      <div className={styles.totalPrice}>
        <Typography.Title level={3} style={{ color: 'red' }}>Price: ￥{getTotalPrice().toFixed(2)}</Typography.Title>
      </div>
      <div className={styles.clearCartButton}>
        <Button
          type="danger"
          onClick={handleCheckout}
          className={styles.clearCartButtonStyle}
        >
          settlement
        </Button>
      </div>
    </div>
  );
};

export default CartList;
