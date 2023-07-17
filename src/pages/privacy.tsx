import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Aqueduct"; 
  });

  return (
    <div 
      style={{
        display: "flex",
        alignContent: "center",
        margin: "0 auto",
        justifyContent: "space-around",
        width: '100%',
      }}
    >
      <div style={{ width: '100%' }}>
        <iframe src="/privacy.html" style={{ width: '100%', height: '100vh', border: '0' }} />
      </div>
    </div>
  );
};

export default PrivacyPage;
