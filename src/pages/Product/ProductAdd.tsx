import { PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormText,
  ProFormMoney,
  ProFormDigit,
  ProFormTextArea,
  ProFormUploadDragger,
  ProFormItem, PageHeader
} from '@ant-design/pro-components';
import { Button, Image, message, Tag, Card } from 'antd';
import { useState } from 'react';
import { history } from '@umijs/max';
import { addProductUsingPost } from "@/services/ProductController";

const AddProductPage = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [inputTags, setInputTags] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const renderTagsPreview = (tagsString: string) => {
    if (!tagsString) return null;

    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);

    return (
      <div style={{ marginTop: 8 }}>
        {tags.map((tag, index) => (
          <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && <span style={{ color: '#999' }}>Please enter tags, separated by commas</span>}
      </div>
    );
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await addProductUsingPost({
        ...values,
        productImages: imageUrls,
        productTags: values.productTags ?
          values.productTags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) :
          []
      });

      if (res?.code === 0) {
        message.success('Product added successfully');
        history.push('/'); // Redirect to product list
      } else {
        message.error(res?.message || 'Failed to add product');
      }
    } catch (error) {
      message.error('Error occurred while adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <PageHeader
        title="Add New Product"
        onBack={() => history.back()}
        style={{ padding: 0, marginBottom: 24 }}
      />

      <Card>
        <ProForm
          layout="vertical"
          onFinish={handleSubmit}
          submitter={{
            render: (props, doms) => [
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={() => props.form?.submit?.()}
                icon={<PlusOutlined />}
              >
                Add Product
              </Button>,
              <Button
                key="cancel"
                style={{ marginLeft: 8 }}
                onClick={() => history.back()}
              >
                Cancel
              </Button>
            ],
          }}
        >
          <ProFormText
            name="productName"
            label="Product Name"
            placeholder="Enter product name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          />

          <ProFormMoney
            name="productPrice"
            label="Price"
            placeholder="Enter product price"
            rules={[{ required: true, message: 'Please enter product price' }]}
          />

          <ProFormDigit
            name="productStock"
            label="Stock Quantity"
            initialValue={10}
            placeholder="Enter stock quantity"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          />

          <ProFormTextArea
            name="productDescription"
            label="Description"
            placeholder="Enter product description"
          />

          <ProFormItem
            name="productTags"
            label="Tags"
            extra="Separate multiple tags with commas"
          >
            <ProFormText
              placeholder="Example: electronics, smartphone, flagship"
              value={inputTags}
              onChange={(e) => setInputTags(e.target.value)}
            />
          </ProFormItem>

          {renderTagsPreview(inputTags)}

          <ProFormUploadDragger
            name="productImage"
            label="Product Images"
            max={5}
            fieldProps={{
              action: "https://pet-server-1-gswe.onrender.com/file/upload",
              multiple: true,
              name: "productImage",
              listType: "picture-card",
              onChange(info) {
                const { file } = info;
                if (file.status === 'uploading') {
                  message.loading(`${file.name} uploading...`);
                  return;
                }
                if (file.status === 'done') {
                  const newImageUrl = file.response?.data;
                  if (newImageUrl) {
                    setImageUrls(prev => [...prev, newImageUrl]);
                    message.success(`${file.name} uploaded successfully`);
                  }
                } else if (file.status === 'error') {
                  message.error(`${file.name} upload failed`);
                }
              },
              onRemove(file) {
                const removedUrl = file.response?.data || file.url;
                setImageUrls(prev => prev.filter(url => url !== removedUrl));
                return true;
              },
            }}
            extra="Upload up to 5 images (drag and drop supported)"
            rules={[{ required: true, message: 'Please upload product images' }]}
          />

          {imageUrls.length > 0 && (
            <ProFormItem label="Uploaded Images">
              <Image.PreviewGroup
                items={imageUrls.map(img => ({ src: img }))}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {imageUrls.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      width={100}
                      height={100}
                      style={{
                        objectFit: 'cover',
                        borderRadius: 4,
                        border: '1px solid #f0f0f0'
                      }}
                      preview={{
                        mask: 'View larger image'
                      }}
                    />
                  ))}
                </div>
              </Image.PreviewGroup>
            </ProFormItem>
          )}
        </ProForm>
      </Card>
    </div>
  );
};

export default AddProductPage;
