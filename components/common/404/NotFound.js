import Link from 'next/link';
import React from 'react';

const NotFound = ({ message, link = null, linkText = "" }) => (
  <div className="empty-content-box">
    <div className="not-found-title">
      <h5>404 | Not Found</h5>
      <p>{message}</p>
    </div>
    {link &&
      <Link href={link}>
        linkText
      </Link>
    }
  </div>
)

export default NotFound;