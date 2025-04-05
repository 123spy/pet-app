import React from 'react';
import { Card, Image, Typography, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const TAG_COLORS = [
  'magenta', 'red', 'volcano', 'orange', 'gold',
  'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
];

const ProductCard = ({ product }) => {
  const defaultImage = "https://management-1306526770.cos.ap-shanghai.myqcloud.com/c380fe34-28e1-40d1-9230-768f00be924c";

  const getFirstMedia = () => {
    if (!product.productImages || product.productImages.length === 0) {
      return defaultImage;
    }

    const firstMedia = product.productImages[0];

    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const isVideo = videoExtensions.some(ext => firstMedia.toLowerCase().endsWith(ext));

    return isVideo ? (
      <video
        controls={false}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      >
        <source src={firstMedia} type={`video/${firstMedia.split('.').pop()}`} />
      </video>
    ) : (
      <Image
        src={firstMedia}
        alt={product.productName}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        preview={{
          mask: null,
        }}
      />
    );
  };

  // 获取随机标签颜色
  const getRandomTagColor = (index) => {
    return TAG_COLORS[index % TAG_COLORS.length];
  };

  return (
    <Card
      bordered={false}
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        marginBottom: '12px'
      }}>
        {getFirstMedia()}
      </div>

      <Link to={`/product/${product._id}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Text strong style={{ fontSize: '16px', color: '#000', display: 'block', marginBottom: 12 }}>
            {product.productName}
          </Text>

          {product.productTags?.length > 0 && (
            <Space size={[6, 8]} wrap style={{ marginBottom: 16 }}>
              {product.productTags.map((tag, index) => (
                <Tag
                  key={tag}
                  color={getRandomTagColor(index)}
                  style={{ margin: 0, padding: '8 8px', fontSize: '16px' }}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Text style={{ fontSize: '24px', color: '#FF6347', fontWeight: 'bold' }}>
              ￥{product.productPrice?.toFixed(2) || '0.00'}
            </Text>
            <Text style={{ fontSize: '16px', color: '#999' }}>
              stock: {product.productStock || 0}
            </Text>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
