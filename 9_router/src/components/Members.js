import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Members() {
  // useSearchParams --> react router'da query string (arama dizesi) ile ilgili islemleri yapmak icin kullanilir. 
  //query string, url'de bulunan bilgileri ifade eder
  const [searchParams, setSearchParams] = useSearchParams();
  const isActive = searchParams.get('filter') === 'active';
  return (
    <>

      <div>Members</div>
      <button onClick={() => setSearchParams({ filter: 'active' })}>
        Aktif Üyeler
      </button>
      <button onClick={() => setSearchParams()}>Tüm Üyeler</button>
      {isActive ? <h2>Aktif Üyeler</h2> : <h2>Tüm Üyeler</h2>}
    </>
  );
}

export default Members;
