import React, {useEffect, useState} from 'react';
import {Layout, Typography, Row, Col, Card, Image, Spin, Pagination, Input, Button, Empty} from 'antd';
import './ProductList.css';
import {ListProductByPageUsingPost} from "@/services/ProductController";
import {Link} from "react-router-dom";
import ProductCard from "@/pages/Product/components/ProductCard";

const {Title, Paragraph, Text} = Typography;
const {Content} = Layout;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');

  const defaultImage = "https://management-1306526770.cos.ap-shanghai.myqcloud.com/c380fe34-28e1-40d1-9230-768f00be924c";

  const loadData = async (page, pageSize, searchText) => {
    setLoading(true);
    try {
      const response = await ListProductByPageUsingPost({current: page, pageSize, searchText});
      console.log(response?.data);
      setProducts(response?.data?.records || []);
      setTotal(response?.data?.total || 0);
      setTotalPages(response?.data?.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage, pageSize, searchText);
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadData(1, pageSize, searchText);
  };

  return (
    <Layout className="layout">
      <Content style={{padding: '0 50px'}}>
        <div className="site-layout-content">
          <div className="search-container">
            <Input
              placeholder="please input text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{width: 'calc(50% - 40px)', height: '40px', fontSize: '16px'}}
              className="search-box"
            />
            <Button
              type="primary"
              onClick={handleSearch}
              style={{height: '40px', fontSize: '16px', marginLeft: '0px'}}
            >
              search
            </Button>
          </div>
          {loading ? (
            <Spin tip="Loading..." style={{textAlign: 'center', marginTop: '50px'}}/>
          ) : products.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No Data</span>}
              style={{textAlign: 'center', marginTop: '50px'}}
            />
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {products.map(product => (
                  <Col key={product?._id} span={24} lg={6} md={12} xs={24} style={{ marginBottom: '20px' }}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                style={{marginTop: '20px', textAlign: 'center'}}
              />
            </>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ProductList;
