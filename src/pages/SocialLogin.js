import React from "react";
import { KakaoIcon } from "./SocialIcons";

const { Kakao } = window;
function SocialLogin() {
  const kakaoLoginClickHandler = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        console.log("authObj : ", authObj);
        Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            console.log("닉네임 : ", response.kakao_account.profile.nickname);
            console.log("이메일 : ", response.kakao_account.email);
            console.log("id : ", response.id);
            fetch("http://192.168.0.101:8080/brunch/oauth/jwt/kakao", {
              method: "post",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Authorization":"Bearer "+ authObj.access_token
              },
              body: JSON.stringify(response),
              dataType: "text/plain",
            })
              .then(function (jwtToken) {
                // console.log(jwtToken.text());
                // let test = jwtToken.sj
                // console.log(test);
                return jwtToken.text();
              })
              .then(function (jwtToken) {
                console.log(jwtToken);
                localStorage.setItem("Authentication", "Bearer " + jwtToken); // 이렇게 하면 웹 브라우저에 저장
                // localStorage.setItem("jwtToken", jwtToken);
              });
            // console.log(jwtToken);
            // if (jwtToken.status === 200) {
            //   console.log(2, jwtToken.data); // 토큰
            //   localStorage.setItem("jwtToken", jwtToken.data); // 이렇게 하면 웹 브라우저에 저장
            // }
          },
          fail: function (error) {
            console.log(error);
          },
        });
      },
    });
  };
  return (
    <article className="socialLogin">
      <button className="btn kakao" onClick={kakaoLoginClickHandler}>
        <div className="kakaoIcon">
          {/* <KakaoLogin 
            jsKey="86eb9b2d5599d4ed8a21ba6a5b047c45"
            buttonText="Login"/> */}
          <KakaoIcon />
        </div>
      </button>
    </article>
  );
}

export default SocialLogin;
