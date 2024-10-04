import { Space, Table, Tag, notification, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { userOrderService, productListService, currencyExchangeService } from '../../../services/apiServices/apiService';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Invoice from './invoice';
import ProductDetails from './productDetails';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Notification',
    description: 'This feature is not enable yet',
  });
};

const OrderList = (props) => {
  const { id } = useSelector((e) => e.userLogin.userDetail);
  const [data, setData] = useState([]);
  const [invoiceData, setInvoiceData] = useState();
  const [productData, setProductDataData] = useState();
  const [pname, setPname] = useState([]);
  const [invoiceState, setInvoiceState] = useState(false);
  const [pdataState, setPdataState] = useState(false);

  const invoiceHandler = (Objects) => {
    setInvoiceData(Objects);
    setInvoiceState(true);
  };

  const detailsHandler = (status) => {
    setProductDataData(status);
    setPdataState(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Link to={'#'}>{text}</Link>,
    },
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
      responsive: ['md'],
    },
    {
      title: 'Shipping Address',
      dataIndex: 'address',
      key: 'address',
      width: 150,
      responsive: ['md'],
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Order Status',
      key: 'status',
      dataIndex: 'status',
      responsive: ['md'],
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag == 'complete' ? 'green' : 'geekblue';

            if (tag === 'cancel') {
              color = 'volcano';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Payment Status',
      key: 'paymentStatus',
      responsive: ['md'],
      render: (_, { paymentStatus }) => (
        <>
          {paymentStatus.map((e) => {
            let icon = paymentStatus == 'complete' ? <CheckCircleOutlined /> : <ClockCircleOutlined />;
            let color = paymentStatus == 'complete' ? 'green' : 'default';

            return (
              <Tag icon={icon} color={color}>
                {paymentStatus}
              </Tag>
            );
          })}
        </>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   width: 50,
    //   responsive: ['md'],
    //   render: (_, record) => (
    //     <>
    //       {record.tags.map((tag) => {
    //         let type = tag == 'processing' ? 'primary' : 'dashed';
    //         let text = tag == 'processing' ? 'Cancel Order' : tag == 'complete' ? 'Order recived' : ' canceled';
    //         return (
    //           <Space size="middle">
    //             <Button
    //               disabled={tag == 'processing' ? false : true}
    //               onClick={() => openNotificationWithIcon('info')}
    //               type={type}
    //               danger
    //             >
    //               {text}
    //             </Button>
    //           </Space>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Invoice Details',
      key: 'invoiceDetails',

      render: (_, record, i) => (
        <>
          {record.invoiceDetails.map((e) => {
            return (
              <Button
                onClick={() => {
                  e[0] == 'complete' ? invoiceHandler(e[1]) : detailsHandler(e[1]);
                }}
                danger
              >
                {e[0] == 'complete' ? 'invoice' : 'Details'}
              </Button>
            );
          })}
        </>
      ),
    },
  ];

  useEffect(() => {
    productListService().then((e) => {
      if (e.status == 200) {
        props.setApiState(false);
        setPname(e.data.product);
      }
    });
  }, []);

  useEffect(() => {
    userOrderService(id).then((e) => {
      let array = [];
      if (e.status == 200) {
        for (let el of e.data.data) {
          array.push({
            key: el.id,
            name: el.product.name,
            orderId: el.id,
            address: el.secoundry_address == 1 ? props.secAdrs.city : props.primeAdres.city,
            tags: [el.status],
            paymentStatus: el.payment_status == 0 ? ['pending'] : ['complete'],
            Amount: pname
              ?.filter((e) => e.id == el.product_id)
              .map((e) => {
                return Number(e.price) * Number(el.product_quantity);
              })
              .toString(),
            invoiceDetails:
              el.status == 'processing'
                ? [
                    [
                      'pending',
                      [
                        {
                          product:
                            pname?.length !== 0
                              ? pname?.filter((e) => e.id == el.product_id).map((e) => e.name)
                              : 'product name',
                          price: pname
                            ?.filter((e) => e.id == el.product_id)
                            .map((e) => {
                              return Number(e.price) * Number(el.product_quantity);
                            })
                            .toString(),
                          billingInfo: el.secoundry_address == 1 ? props.secAdrs : props.primeAdres,
                          paymentInformation: 'COD',
                          quantity:
                            pname?.length !== 0
                              ? pname?.filter((e) => e.id == el.product_id).map((e) => el.product_quantity)
                              : 'product quatitiy',
                          orderId: el.id,
                        },
                      ],
                    ],
                  ]
                : [
                    [
                      'complete',
                      [
                        {
                          product:
                            pname?.length !== 0
                              ? pname?.filter((e) => e.id == el.product_id).map((e) => e.name)
                              : 'product name',
                          price: pname
                            ?.filter((e) => e.id == el.product_id)
                            .map((e) => {
                              return Number(e.price) * Number(el.product_quantity);
                            })
                            .toString(),
                          billingInfo: props.primeAdres,
                          paymentInformation: 'COD',
                          quantity:
                            pname?.length !== 0
                              ? pname?.filter((e) => e.id == el.product_id).map((e) => el.product_quantity)
                              : 'product quatitiy',
                          orderId: el.id,
                        },
                      ],
                    ],
                  ],
          });
        }
      }
      setData(array);
    });
  }, [pname]);
  return (
    <>
      {' '}
      {pdataState && (
        <div id="pwd_continer" onClick={() => setPdataState(false)}>
          <ProductDetails productData={productData} />
        </div>
      )}
      {invoiceState && (
        <div id="pwd_continer" onClick={() => setInvoiceState(false)}>
          <Invoice invoiceData={invoiceData} />
        </div>
      )}
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default OrderList;
