import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <h1>Oops...</h1>
      <p>
        {isRouteErrorResponse(error)
          ? "404 Page Not Found"
          : "Unexpected Error Occurred"}
      </p>
    </>
  );
};

export default ErrorPage;
