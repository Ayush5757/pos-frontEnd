import React from 'react';
import { Printer, Text, Cut, render } from 'react-thermal-printer';

const ReceiptComponent = () => {
  return (
    <Printer type="epson" width={42} characterSet="korea">
      <Text size={{ width: 2, height: 2 }}>9,500원</Text>
      <Text bold={true}>결제 완료</Text>
      <Cut />
    </Printer>
  );
};

export default ReceiptComponent;
