import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  type CustomerInfo = {
    customerInfoKey: string;
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  
  type Product = {
    productKey: string;
    name: string;
    description: string;
    guildToUsing: string;
    weight: string;
    price: number;
    expiryDay: string;
    imageUrl: string;
    quantity: number;
    status: number;
  };
  
  type OrderDetail = {
    orderDetailKey: string;
    product: Product;
    quantity: number;
    actualPrice: number;
  };
  
  type CouponInfo = {
    couponKey: string;
    couponCode: string;
    description: string;
    discountPercentage: number;
    numOfUses: number;
    expiredDate: string;
    createdBy: string;
    createdDate: string;
  } | null;
  
  type Order = {
    orderKey: string;
    customerInfo: CustomerInfo;
    orderDetails: OrderDetail[];
    couponInfo: CouponInfo;
    createdAt: string;
    totalPrice: number;
    status: string;
  };
 type IBillProps = {
   order: Order
 }
  
  export const Bill:React.FC<IBillProps> = (props) => {
    const {
      order
    } = props;
    return (
    <Html>
      <Head />
      <Preview>Thông tin đơn hàng, theo dõi đơn hàng</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={track.container}>
            <Row>
              <Column>
                <Text style={global.paragraphWithBold}>Mã đơn hàng</Text>
                <Text style={track.number}>{order.orderKey}</Text>
              </Column>
              <Column align="right">
                <Link href={`https://vietafood.shop/orderDetail/${order.orderKey}`} style={global.button}>Theo dõi đơn hàng</Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={message}>
            <Img
              src="https://vietafood.shop/assets/logo-lPjZkMnY.png"
              width="66"
              height="60"
              alt="Vietafood logo"
              style={{ margin: "auto" }}
            />
            <Heading style={global.heading}>Đơn hàng đã được thanh toán</Heading>
            <Text style={global.text}>
              Chúng tôi xác nhận đơn hàng đã được thanh toán.
            </Text>
            <Text style={global.text}>
              Hãy bấm vào nút ở trên để theo dõi đơn hàng
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
            Hãy nhắn tin qua fanpage VietaFood tại{" "}
            <Link href="https://www.facebook.com/VietaFood ">https://www.facebook.com/VietaFood </Link>
            <Text style={global.text}>
            hoặc gọi số hotline 0858 731 831 để được hỗ trợ.
            </Text>
            
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>Giao hàng đến: {order.customerInfo.name}</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              {order.customerInfo.address}
            </Text>
          </Section>
          <Hr style={global.hr} />
          {order.orderDetails.map((detail: OrderDetail) => (
          <Section
            key={detail.orderDetailKey}
            style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
          >
            <Row style={{paddingTop:"20px", paddingBottom:"20px"}}>
              <Column>
                <Img
                  src={detail.product.imageUrl}
                  alt={detail.product.name}
                  style={{ float: "left" }}
                  width="260px"
                />
              </Column>
              <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                <Text style={{ ...paragraph, fontWeight: "800", color: "#E5BC69" }}>
                {detail.product.name}
                </Text>
                <Text style={{ ...paragraph, fontWeight: "500" }}>
                {detail.product.description}
                </Text>
                <Text style={global.text}>{detail.quantity}</Text>
              </Column>
            </Row>
          </Section>
           ))}
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: "inline-flex", marginBottom: 40 }}>
              <Column style={{ width: "170px" }}>
                <Text style={global.paragraphWithBold}>Tổng giá trị đơn hàng</Text>
                <Text style={track.number}>{formatPrice(order.totalPrice)}</Text>
              </Column>
              <Column>
                <Text style={global.paragraphWithBold}>Ngày đặt hàng</Text>
                <Text style={track.number}>{new Date(order.createdAt).toLocaleString()}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Link style={global.button}>Trạng thái: {order.status} </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Row>
              <Text style={global.heading}>Lựa chọn khác bạn có thể thích</Text>
            </Row>
            <Row style={recomendations.container}>
              <Link href="https://vietafood.shop/product/P_1C60EF43-09F0-409A-A9A0-AD790242529A">
              <Column
                style={{ ...recomendations.product, paddingLeft: "4px" }}
                align="center"
                >
                <Img
                  src="https://firebasestorage.googleapis.com/v0/b/vietafood-54b3d.appspot.com/o/1%20xoai.png?alt=media&token=b61e0f2c-727b-4d3c-8be4-d0721c922f35"
                  alt="Xoài"
                  width="100%"
                  />
                <Text style={recomendations.title}>
                  Xoài xấy dẻo
                </Text>
                <Text style={recomendations.text}>
                  250g
                </Text>
              </Column>
              </Link>
              <Link href="https://vietafood.shop/product/P_897BB242-7E70-4D34-B86C-B96284DB2122">
              <Column
                style={{ ...recomendations.product, paddingLeft: "4px" }}
                align="center"
                >
                <Img
                  src="https://firebasestorage.googleapis.com/v0/b/vietafood-54b3d.appspot.com/o/1%20vo%20buoi.png?alt=media&token=d2128a78-f4ea-4124-ac49-d35fd8964af6"
                  alt="Bưởi"
                  width="100%"
                  />
                <Text style={recomendations.title}>
                  Vỏ bưởi xấy dẻo
                </Text>
                <Text style={recomendations.text}>
                  250g
                </Text>
              </Column>
              </Link>
              <Link href="https://vietafood.shop/product/P_9284F409-C7A0-4632-9DE7-1895F996071D">
              <Column
                style={{ ...recomendations.product, paddingLeft: "4px" }}
                align="center"
                >
                <Img
                  src="https://firebasestorage.googleapis.com/v0/b/vietafood-54b3d.appspot.com/o/1%20thom.png?alt=media&token=319b8365-78ee-4596-a1e7-77eb6c934140"
                  alt="Thơm"
                  width="100%"
                  />
                <Text style={recomendations.title}>
                  Thơm xấy dẻo
                </Text>
                <Text style={recomendations.text}>
                  250g
                </Text>
              </Column>
              </Link>
              <Link href="https://vietafood.shop/product/P_9A992CC2-21E6-4E45-A15A-DB3229A2F8B3">
              <Column
                style={{ ...recomendations.product, paddingLeft: "4px" }}
                align="center"
                >
                <Img
                  src="https://firebasestorage.googleapis.com/v0/b/vietafood-54b3d.appspot.com/o/1%20mit.png?alt=media&token=004fee84-186f-46a4-95ad-53996c4951a3"
                  alt="Mit"
                  width="100%"
                  />
                <Text style={recomendations.title}>
                  Mít xấy dẻo
                </Text>
                <Text style={recomendations.text}>
                  250g
                </Text>
              </Column>
              </Link>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={menu.container}>
            <Row>
              <Text style={menu.title}>Get Help</Text>
            </Row>
            <Row style={menu.content}>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="https://www.facebook.com/VietaFood" style={menu.text}>
                  Liên hệ qua facebook
                </Link>
              </Column>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href="https://vietafood.shop/" style={menu.text}>
                  Đến với website VietaFood
                </Link>
              </Column>
  
            </Row>
            <Hr style={global.hr} />
            <Row style={menu.tel}>
              <Column>
                <Row>
                  <Column style={{ width: "16px" }}>
                    <Img
                    src="https://p7.hiclipart.com/preview/505/874/494/telephone-call-computer-icons-telephone-number-email.jpg"
                      width="16px"
                      height="26px"
                      style={{ paddingRight: "14px" }}
                    />
                  </Column>
                  <Column>
                    <Text style={{ ...menu.text, marginBottom: "0" }}>
                    0858 731 831 
                    </Text>
                  </Column>
                </Row>
              </Column>
              <Column>
                <Text
                  style={{
                    ...menu.text,
                    marginBottom: "0",
                  }}
                >
                  7 am - 5 pm
                </Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Row>
              <Text style={global.heading}>VietaFood.shop</Text>
            </Row>
            <Row style={categories.container}>
              <Column align="center">
                <Link href="https://vietafood.shop/" style={categories.text}>
                  Trang chủ
                </Link>
              </Column>
              <Column align="center">
                <Link href="https://vietafood.shop/aboutUs" style={categories.text}>
                  Chúng tôi
                </Link>
              </Column>
              <Column align="center">
                <Link href="https://vietafood.shop/products" style={categories.text}>
                  Sản phẩm
                </Link>
              </Column>
              <Column align="center">
                <Link href="https://shopee.vn/hoangphuong0106az?uls_trackid=500tpgr4011d&utm_content=2KsbNGXJqb7B5YbhBkJgnxJgDJwq" style={categories.text}>
                  Mua trên Shopee
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={{ ...global.hr, marginTop: "12px" }} />
          <Section style={paddingY}>
            <Row style={footer.policy}>
              <Column>
                <Text style={footer.text}>Web Version</Text>
              </Column>
              <Column>
                <Text style={footer.text}>Privacy Policy</Text>
              </Column>
            </Row>
            <Row>
              <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
                Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ (Chúng tôi sẽ không thấy được reply của email này.)
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                © 2024 VietaFood.shop All Rights Reserved.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
  
  export default Bill;
  
  const paddingX = {
    paddingLeft: "40px",
    paddingRight: "40px",
  };
  
  const paddingY = {
    paddingTop: "22px",
    paddingBottom: "22px",
  };
  
  const paragraph = {
    margin: "0",
    lineHeight: "2",
  };
  
  const global = {
    paddingX,
    paddingY,
    defaultPadding: {
      ...paddingX,
      ...paddingY,
    },
    paragraphWithBold: { ...paragraph, fontWeight: "bold" },
    heading: {
      fontSize: "32px",
      lineHeight: "1.3",
      fontWeight: "700",
      textAlign: "center",
      letterSpacing: "-1px",
    } as React.CSSProperties,
    text: {
      ...paragraph,
      color: "#747474",
      fontWeight: "500",
    },
    button: {
      border: "1px solid #929292",
      fontSize: "16px",
      textDecoration: "none",
      padding: "10px 0px",
      width: "220px",
      display: "block",
      textAlign: "center",
      fontWeight: 500,
      color: "#000",
    } as React.CSSProperties,
    hr: {
      borderColor: "#E5E5E5",
      margin: "0",
    },
  };
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "10px auto",
    width: "600px",
    maxWidth: "100%",
    border: "1px solid #E5E5E5",
  };
  
  const track = {
    container: {
      padding: "22px 40px",
      backgroundColor: "#F7F7F7",
    },
    number: {
      margin: "12px 0 0 0",
      fontWeight: 500,
      lineHeight: "1.4",
      color: "#6F6F6F",
    },
  };
  
  const message = {
    padding: "40px 74px",
    textAlign: "center",
  } as React.CSSProperties;
  
  const adressTitle = {
    ...paragraph,
    fontSize: "15px",
    fontWeight: "bold",
  };
  
  const recomendationsText = {
    margin: "0",
    fontSize: "15px",
    lineHeight: "1",
    paddingLeft: "10px",
    paddingRight: "10px",
  };
  
  const recomendations = {
    container: {
      padding: "20px 0",
    },
    product: {
      verticalAlign: "top",
      textAlign: "left" as const,
      paddingLeft: "2px",
      paddingRight: "2px",
    },
    title: { ...recomendationsText, paddingTop: "12px", fontWeight: "500" },
    text: {
      ...recomendationsText,
      paddingTop: "4px",
      color: "#747474",
    },
  };
  
  const menu = {
    container: {
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
      backgroundColor: "#F7F7F7",
    },
    content: {
      ...paddingY,
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    title: {
      paddingLeft: "20px",
      paddingRight: "20px",
      fontWeight: "bold",
    },
    text: {
      fontSize: "13.5px",
      marginTop: 0,
      fontWeight: 500,
      color: "#000",
    },
    tel: {
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "32px",
      paddingBottom: "22px",
    },
  };
  
  const categories = {
    container: {
      width: "500px",
      margin: "auto",
      paddingTop: "12px",
    },
    text: {
      
      fontWeight: "500",
      color: "#000",
    },
  };
  
  const footer = {
    policy: {
      width: "166px",
      margin: "auto",
    },
    text: {
      margin: "0",
      color: "#AFAFAF",
      fontSize: "13px",
      textAlign: "center",
    } as React.CSSProperties,
  };
  