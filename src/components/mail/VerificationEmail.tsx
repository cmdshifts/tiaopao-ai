import {
  Body,
  Html,
  Img,
  Preview,
  Text,
  Section,
  Hr,
  Button,
} from "@react-email/components"
import * as React from "react"
import { CSSProperties } from "react"

interface VerificationEmailTemplateProps {
  url: string
}

export const VerificationEmail: React.FC<
  Readonly<VerificationEmailTemplateProps>
> = ({ url }) => (
  <Html>
    <Preview>สวัสดีนักเดินทาง! 👋</Preview>
    <Body style={main}>
      <Section style={containerSection}>
        <Img
          style={logoLarge}
          alt="TripTiaoPao"
          height="40"
          src="https://triptiaopao.com/images/png/logo-large-color.png"
        />
        <Hr style={divider} />
        <Section style={mainSection}>
          <Img
            alt="Scenic View Of Ocean by Humphrey Muleba"
            style={image}
            height="160"
            src="https://triptiaopao.com/images/png/scenic-view-of-ocean.jpg"
          />
          <Text style={textLabel}>การผจญภัยครั้งใหม่รอคุณอยู่!</Text>
          <Text style={textDescription}>
            เวลาสำหรับการออกเดินทางมาแล้ว!
            คุณสามารถเข้าสู่ระบบและสร้างเส้นทางการเดินทางที่ตอบโจทย์ทุกฝันของคุณได้ทันที
            พร้อมที่จะออกค้นพบสิ่งใหม่ ๆ หรือยัง? 🧳
          </Text>
          <Button
            style={button}
            href={url}>
            ✈️ ออกเดินทาง!
          </Button>
          <Text style={textWarning}>
            หากท่านไม่ได้ทำการร้องขอดังกล่าว กรุณาเพิกเฉยต่ออีเมลฉบับนี้
          </Text>
        </Section>
        <Hr style={divider} />
        <Text style={footerDescription}>
          © 2024 TripTiaoPao.com. All Rights Reserved.
        </Text>
      </Section>
    </Body>
  </Html>
)

export default VerificationEmail

const main: CSSProperties = {
  backgroundColor: "#ffffff",
}

const containerSection: CSSProperties = {
  marginTop: "16px",
  marginBottom: "16px",
  maxWidth: "450px",
}

const image: CSSProperties = {
  width: "100%",
  borderRadius: "12px",
  objectFit: "cover",
}

const mainSection: CSSProperties = {
  marginTop: "32px",
  textAlign: "center",
}

const textLabel: CSSProperties = {
  marginTop: "16px",
  marginBottom: "16px",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "28px",
}

const logoLarge: CSSProperties = {
  alignSelf: "center",
}

const textDescription: CSSProperties = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#6B7280",
}

const button: CSSProperties = {
  marginTop: "16px",
  padding: "12px 40px",
  borderRadius: "8px",
  backgroundColor: "#2E9CC9",
  fontSize: "16px",
  fontWeight: "600",
  color: "#ffffff",
  display: "inline-block",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background-color 0.3s",
}

const textWarning: CSSProperties = {
  marginTop: "8px",
  fontSize: "12px",
  color: "#6B7280",
}

const divider = {
  width: "100%",
  border: "none",
  borderTop: "1px solid #eaeaea",
  marginTop: "16px",
  marginBottom: "16px",
  borderColor: "rgb(209,213,219)",
  borderBottomWidth: "2px",
}

const footerDescription: CSSProperties = {
  fontSize: "12px",
}
