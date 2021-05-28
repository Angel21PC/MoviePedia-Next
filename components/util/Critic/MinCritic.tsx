import React, { FC } from "react";
import { useEffect, useState } from "react";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";

export interface MinCriticProps {
  creator: string;
  date: any;
  title: string;
  id_critic: string;
}

const MinCritic: FC<MinCriticProps> = (props) => {
  const { creator, date, title, id_critic } = props;

  return (
    <Toast key={title}>
      <ToastHeader closeButton={false}>{creator}</ToastHeader>
      <div className="d-flex w-100">
        <ToastBody className="w-100 d-flex">
          <div className="w-50 mr-5">{title}</div>
        </ToastBody>
      </div>
    </Toast>
  );
};

export default MinCritic;
