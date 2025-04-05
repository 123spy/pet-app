import {
  PlusOutlined
} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {
  ProFormDigit,
  ProFormItem,
  ProFormMoney,
  ProFormTextArea,
  ProFormUploadDragger,
  ProTable
} from '@ant-design/pro-components';
import {Button, Image, message, Popconfirm, Tag} from 'antd';
import {useRef, useState} from 'react';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import {useModel} from "@@/exports";
import {
  addProductUsingPost,
  deleteProductUsingPost,
  ListProductByPageUsingPost,
  updateProductUsingPost
} from "@/services/ProductController";

const AdminProductPage = () => {
  const actionRef = useRef<ActionType>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [editingImages, setEditingImages] = useState<string[]>([]);
  const [inputTags, setInputTags] = useState<string>('');

  const onDelete = async (id: any) => {
    const res: any = await deleteProductUsingPost({id});
    if (res?.code === 0) {
      // @ts-ignore
      await actionRef.current.reload();
      message.success("success");
    } else {
      message.error("error");
    }
  }

  const renderTagsPreview = (tagsString: string) => {
    if (!tagsString) return null;

    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);

    return (
      <div style={{marginTop: 8}}>
        {tags.map((tag, index) => (
          <Tag key={index} color="blue" style={{marginBottom: 4}}>
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && <span style={{color: '#999'}}>Please enter labels, separated by commas</span>}
      </div>
    );
  };

  const columns: ProColumns<any>[] = [
    {
      title: "#",
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 50,
      align: "center",
    },
    {
      title: 'image',
      dataIndex: 'productImages',
      align: "center",
      hideInSearch: true,
      render: (_, record) => (
        <Image.PreviewGroup
          items={record.productImages?.map(img => ({src: img}))}
        >
          <div style={{display: 'flex', gap: 8}}>
            {record.productImages?.slice(0, 3).map((img: string, index: number) => (
              <Image
                key={index}
                src={img}
                width={50}
                height={50}
                style={{objectFit: 'cover', borderRadius: 4}}
                preview={{
                  mask: record.productImages?.length > 1 ?
                    `See more (${record.productImages?.length})` : 'View larger image'
                }}
              />
            ))}
          </div>
        </Image.PreviewGroup>
      ),
    },
    {
      title: 'title',
      dataIndex: 'productName',
      copyable: true,
      ellipsis: true,
      tooltip: 'If the content is too long, it will shrink automatically',
      align: "center"
    },
    {
      title: 'price',
      valueType: "money",
      dataIndex: 'productPrice',
      align: "center",
      hideInSearch: true,
    },
    {
      title: 'stock',
      dataIndex: 'productStock',
      align: "center",
      hideInSearch: true,
    },
    {
      title: 'tag',
      dataIndex: 'productTags',
      align: "center",
      hideInSearch: true,
      render: (_, record) => (
        <div style={{maxWidth: 200}}>
          {record.productTags?.map((tag: string, index: number) => (
            <Tag key={index} color="blue" style={{margin: '2px 4px'}}>
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'description',
      dataIndex: 'productDescription',
      copyable: true,
      ellipsis: true,
      tooltip: 'If the content is too long, it will shrink automatically',
      align: "center",
      hideInSearch: true,
    },
    {
      title: 'optional',
      align: "center",
      hideInSearch: true,
      render: (_, item) => {
        return (
          <div>
            <Popconfirm
              title="delete"
              description="Are you sure you want to remove this Pet?"
              onConfirm={() => onDelete(item?._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type={"link"}>delete</Button>
            </Popconfirm>

            <ModalForm
              title="update"
              trigger={
                <Button type="link">
                  update
                </Button>
              }
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
              }}
              submitTimeout={2000}
              onFinish={async (values) => {
                const newValues = {
                  ...values,
                  id: item?._id,
                  productImages: imageUrls.length > 0 ? imageUrls : item?.productImages,
                  productTags: values.productTags ?
                    values.productTags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) :
                    item?.productTags
                };

                const res: any = await updateProductUsingPost(newValues);
                if (res?.code === 0) {
                  // @ts-ignore
                  await actionRef.current.reload();
                  message.success("success");
                } else {
                  message.error("error");
                }
              }}
              onOpenChange={(open) => {
                if (open) {
                  setEditingImages(item?.productImages || []);
                  setInputTags(item?.productTags?.join(', ') || '');
                } else {
                  setImageUrls([]);
                  setEditingImages([]);
                  setInputTags('');
                }
              }}
              width={800}
            >
              <ProFormText
                name="productName"
                label="name"
                initialValue={item?.productName}
                placeholder="Please enter the name of the pet"
                rules={[{required: true, message: 'Please enter the name of the pet'}]}
              />
              <ProFormMoney
                name="productPrice"
                label="price"
                initialValue={item?.productPrice}
                placeholder="Please enter the price of the pet"
                rules={[{required: true, message: 'Please enter the price of the pet'}]}
              />
              <ProFormDigit
                name="productStock"
                label="stock"
                initialValue={item?.productStock}
                placeholder="Please enter the stock of the pet"
                rules={[{required: true, message: 'Please enter the stock of the pet'}]}
              />
              <ProFormTextArea
                name="productDescription"
                label="description"
                initialValue={item?.productDescription}
                placeholder="Please enter the description of the pet"
              />

              <ProFormItem
                name="productTags"
                label="tag"
                extra="Please separate multiple tags with a comma"
              >
                <ProFormText
                  placeholder="For example: electronics, mobile phones, flagships"
                  value={inputTags}
                  onChange={(e) => setInputTags(e.target.value)}
                />
              </ProFormItem>
              {renderTagsPreview(inputTags)}

              {editingImages.length > 0 && (
                <ProFormItem label="Current image">
                  <Image.PreviewGroup
                    items={editingImages.map(img => ({src: img}))}
                  >
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                      {editingImages.map((img, index) => (
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

              <ProFormUploadDragger
                name="productImage"
                label="Upload new image"
                max={5}
                fieldProps={{
                  action: "https://pet-server-e6yo.onrender.com/file/upload",
                  multiple: true,
                  name: "productImage",
                  listType: "picture-card",
                  onChange(info) {
                    const { file, fileList } = info;

                    if (file.status === 'uploading') {
                      message.loading(`${file.name} Upaging...`);
                      return;
                    }

                    if (file.status === 'done') {
                      const newImageUrl = file.response?.data;
                      if (newImageUrl) {
                        setImageUrls(prev => [...prev, newImageUrl]);
                        message.success(`${file.name} success`);
                      }
                    } else if (file.status === 'error') {
                      message.error(`${file.name} error`);
                    }
                  },
                  onRemove(file) {
                    const removedUrl = file.response?.data || file.url;
                    setImageUrls(prev => prev.filter(url => url !== removedUrl));
                    return true;
                  },
                  itemRender: (originNode, file) => {
                    return (
                      <div className="ant-upload-list-item-container">
                        {originNode}
                      </div>
                    );
                  }
                }}
                extra="Upload up to 5 images, and drag and drop uploads are supported"
              />

              {imageUrls.length > 0 && (
                <ProFormItem label="Newly uploaded images">
                  <Image.PreviewGroup
                    items={imageUrls.map(img => ({src: img}))}
                  >
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
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
            </ModalForm>
          </div>
        )
      }
    }
  ];

  const {initialState} = useModel('@@initialState');
  // @ts-ignore
  const {currentUser} = initialState;

  if (currentUser?.userRole !== 'admin') {
    return <div>If the permissions are insufficient, obtain administrator privileges before accessing them!</div>
  }

  return (
    <div>
      <ProTable<any>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const res: any = await ListProductByPageUsingPost({...params});
          if (res?.code === 0) {
            return {
              data: res?.data?.records,
              success: true,
              current: res?.data?.current,
              pageSize: res?.data?.size,
              total: res?.data?.total
            }
          } else {
            message.error("request error");
          }
          return {
            data: [],
            success: false,
          };
        }}
        columnsState={{
          persistenceKey: 'user',
          persistenceType: 'localStorage',
          defaultValue: {
            option: {fixed: 'right', disable: true},
          },
        }}
        rowKey="_id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{showSizeChanger: true}}
        dateFormatter="string"
        toolBarRender={() => [
          <ModalForm
            key="create"
            title="add Pet"
            trigger={
              <Button type="primary">
                <PlusOutlined/>
                add
              </Button>
            }
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
              const res: any = await addProductUsingPost({
                ...values,
                productImages: imageUrls,
                productTags: values.productTags ?
                  values.productTags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) :
                  []
              });
              if (res?.code === 0) {
                // @ts-ignore
                await actionRef.current.reload();
                setImageUrls([]);
                setInputTags('');
                message.success("Pet add success");
              } else {
                message.error("add error");
              }
            }}
            onOpenChange={(open) => {
              if (!open) {
                setImageUrls([]);
                setInputTags('');
              }
            }}
            width={800}
          >
            <ProFormText
              name="productName"
              label="name"
              placeholder="Please enter the name of the pet"
              rules={[{required: true, message: 'Please enter the name of the pet'}]}
            />
            <ProFormMoney
              name="productPrice"
              label="price"
              placeholder="Please enter the price of the pet"
              rules={[{required: true, message: 'Please enter the price of the pet'}]}
            />
            <ProFormDigit
              name="productStock"
              label="stock"
              initialValue={10}
              placeholder="Please enter the stock of the pet"
              rules={[{required: true, message: 'Please enter the stock of the pet'}]}
            />
            <ProFormTextArea
              name="productDescription"
              label="description"
              placeholder="Please enter the description of the pet"
            />

            <ProFormItem
              name="productTags"
              label="tag"
              extra="Please separate multiple tags with a comma"
            >
              <ProFormText
                placeholder="For example: electronics, mobile phones, flagships"
                value={inputTags}
                onChange={(e) => setInputTags(e.target.value)}
              />
            </ProFormItem>
            {renderTagsPreview(inputTags)}

            <ProFormUploadDragger
              name="productImage"
              label="image"
              max={5}
              fieldProps={{
                action: "https://pet-server-e6yo.onrender.com/file/upload",
                multiple: true,
                name: "productImage",
                listType: "picture-card",
                onChange(info) {
                  const { file, fileList } = info;

                  if (file.status === 'uploading') {
                    message.loading(`${file.name} uploading...`);
                    return;
                  }

                  if (file.status === 'done') {
                    const newImageUrl = file.response?.data;
                    if (newImageUrl) {
                      setImageUrls(prev => [...prev, newImageUrl]);
                      message.success(`${file.name} upload success`);
                    }
                  } else if (file.status === 'error') {
                    message.error(`${file.name} upload error`);
                  }
                },
                onRemove(file) {
                  const removedUrl = file.response?.data || file.url;
                  setImageUrls(prev => prev.filter(url => url !== removedUrl));
                  return true;
                },
                itemRender: (originNode, file) => {
                  return (
                    <div className="ant-upload-list-item-container">
                      {originNode}
                    </div>
                  );
                }
              }}
              extra="Upload up to 5 images, and drag and drop uploads are supported"
              rules={[{required: true, message: 'Please upload a picture of Pet'}]}
            />

            {imageUrls.length > 0 && (
              <ProFormItem label="An image has been uploaded">
                <Image.PreviewGroup
                  items={imageUrls.map(img => ({src: img}))}
                >
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
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
                      />
                    ))}
                  </div>
                </Image.PreviewGroup>
              </ProFormItem>
            )}
          </ModalForm>,
        ]}
      />
    </div>
  )
};

export default AdminProductPage;
