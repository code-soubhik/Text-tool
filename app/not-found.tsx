import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="main notfound">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-description">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link href={'/'} className="notfound-button">
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
