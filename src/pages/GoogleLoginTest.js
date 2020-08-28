import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

const Config = {
  headers: {
    "Content-Type": "application/json; charset:utf-8",
  },
};

const responseGoogle = async (response) => {
  console.log(response);
  // ui를 같이 던질 수 있음 (ex. 프로그레스바)
  // fetch보다 axios를 사용하는 것이 좋음!
  // let res = {...response, ...{provider : "google"}} // 미리 provider를 붙여놓으면 나중에 구분하기 쉽다.
  let jwtToken = await axios.post(
    "http://localhost:8080/oauth/jwt/google", // 스프링 컨트롤러 생성 // 주소
    JSON.stringify(response), // response는 자바스크립트 오브젝트로 바꼈기 때문에 다시 json으로 바꿔준다. //바디
    Config // 옵션
  );
  if (jwtToken.status === 200) {
    console.log(2, jwtToken.data); // 토큰
    localStorage.setItem("jwtToken", jwtToken.data); // 이렇게 하면 웹 브라우저에 저장
  }
  // .then((res) => {
  //   console.log(1, res.headers);
  //   console.log(2, res.data);
  //   localStorage.setItem("jwt", res.data);
  // });
};

const GoogleLoginTest = () => {
  return (
    <div>
      <GoogleLogin
        clientId="134534524223-iffc25mbqm9t596c81veg1g1cbo2ieni.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginTest;
