import React from "react";

function ErrorPage(props) {
    return (
        <div>
          <h1 className={'display-3'}>에러 페이지</h1>
          <p>Route 의 path에 지정된 url이 아닌 다른 url을 입력 시 접속되는 페이지</p>
        </div>
    );
}

export default ErrorPage;