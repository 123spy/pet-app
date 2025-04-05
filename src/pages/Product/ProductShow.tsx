import React, {useEffect, useState} from 'react';
import {Layout, Typography, Row, Col, Card, Image, Spin, Button, Tag, message, Divider} from 'antd';
import {useParams} from 'react-router-dom';
import './ProductShow.css';
import {getProductUsingPost} from "@/services/ProductController";

import {addCartUsingPost} from "@/services/CartController";
import {DollarOutlined, HeartOutlined} from '@ant-design/icons';


const {Title, Paragraph, Text} = Typography;
const {Content} = Layout;

const ProductShow = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultImage = 'https://th.bing.com/th/id/OIP.DcyE_0CV83AVX6CKqTmCzgHaGm?rs=1&pid=ImgDetMain';

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getProductUsingPost({id});
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product data: ', error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const onBuy = async (id: string) => {
    message.success("The action is successful, please go to view");
  }

  const onCart = async () => {
    const res = await addCartUsingPost({productId: id});
    if (res?.code === 0) {
      message.success("The action is successful, please go to view");
    } else {
      message.error(`Failed to favorite`);
    }
  }

  if (loading) {
    return (
      <Layout className="layout">
        <Content style={{padding: '0 50px'}}>
          <Spin tip="Loading..." style={{textAlign: 'center', marginTop: '50px'}}/>
        </Content>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout className="layout">
        <Content style={{padding: '0 50px'}}>
          <Title level={2} style={{marginBottom: '20px', color: '#333'}}>Pet Information</Title>
          <Paragraph>No Data</Paragraph>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="layout">
      <Content style={{padding: '0 50px'}}>
        <Card
          bordered={false}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
          }}
        >
          <Title level={2} style={{marginBottom: '20px', color: '#333'}}>Pet Information</Title>
          <Divider></Divider>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={12} style={{display: 'flex', justifyContent: 'center'}}>
              <Image
                src={product.productImages[0] || defaultImage}
                alt={product.productName}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '10px'
                }}
              />
            </Col>
            <Col span={24} lg={12}>
              <div style={{padding: '20px'}}>
                <Text strong style={{fontSize: '24px', color: '#000'}}>
                  {product.productName}
                </Text>
                <Paragraph style={{fontSize: '16px', color: '#333', marginTop: '10px'}}>
                  {product.productDescription || 'There is no detailed description'}
                </Paragraph>
                <Text style={{fontSize: '28px', color: '#FF6347', fontWeight: 'bold', marginTop: '16px'}}>
                  ￥{product.productPrice.toFixed(2)}
                </Text>
                <Text style={{fontSize: '18px', color: '#666', marginTop: '10px', marginLeft: '10px'}}>
                  stock: {product.productStock}
                </Text>
                <div style={{marginTop: '20px'}}>
                  {
                    product?.productTags.map(tag => (
                      <Tag color="orange" style={{fontSize: '14px', padding: '5px 10px', borderRadius: '4px'}}>
                        {tag}
                      </Tag>
                    ))
                  }
                </div>
                <div style={{marginTop: '20px'}}>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: '#FFA500',
                      borderColor: '#FFA500',
                      marginRight: '10px',
                      fontSize: '20px',
                      height: '50px',
                      width: "200px"
                    }}
                    onClick={onCart}
                  >
                    <HeartOutlined /> Favorite
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: '#FFD700',
                      borderColor: '#FFD700',
                      fontSize: '20px',
                      height: '50px',
                      width: "200px"
                    }}
                    onClick={onBuy}
                  >
                    <DollarOutlined />
                    Adoption
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default ProductShow;
