import React from 'react';
import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;
  let statusCode: number | null = null;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    statusCode = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error terjadi';
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Waduh, Terjadi Kesalahan!</h1>
      <p>
        <i>{errorMessage}</i>
      </p>
      {statusCode === 404 ? (
        <p>Halaman yang Anda cari tidak dapat ditemukan.</p>
      ) : (
        <p>Terjadi masalah pada sistem internal aplikasi.</p>
      )}
      <Link to="/">Kembali ke Beranda</Link>
    </div>
  );
};

export default ErrorPage;
