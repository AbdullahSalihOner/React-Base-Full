import React from 'react';
import { useParams } from 'react-router-dom';

function MemberDetail() {
  // const params = useParams();
  // const memberId = params.memberId;

  // useParams --> react router'da parametreleri almak ve kullanmak icin kullanilir
  const { memberId } = useParams();
  return <div>MemberDetail {memberId}</div>;
}

export default MemberDetail;
