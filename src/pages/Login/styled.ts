import styled from 'styled-components';

export const LoginStyled = styled.div`
  .left-side-container {
    display: flex;
    background-image: radial-gradient(circle at 19% 7%, #f5f8ff, #e5e9ff 109%);
    flex: 2;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .poster-img {
    width: 600px;
    height: auto;
  }
  .poster-img-container {
    position: relative;
  }
  .banner-txt-container {
    position: absolute;
    left: -50px;
    top: -80px;

    font-family: Montserrat;
    font-size: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #4f4f4f;
  }
  .large-oval {
    width: 188px;
    height: 188px;
    border-radius: 50%;
    background-color: #fff;
  }
  .small-oval {
    width: 126px;
    height: 126px;
    border-radius: 50%;
    background-color: #fff;
  }
  .right-side-container {
    flex: 1;
    display: flex;
    background-color: #272727;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .login-title{
    font-family: Montserrat;
    font-size: 27px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
  .login-form {
    width: 100%;
    max-width: 300px;
    margin-top: 100px;
  }
  .login-form-button {
    width: 100%;
    height: 40px;
    border-radius: 6px;
    background-image: radial-gradient(circle at 0 0, #9d70ff, #633dff);
    border: none;
  }
  .input-label {
    opacity: 0.5;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
    margin-bottom: 10px;
  }
  .register-link {
    text-decoration: underline;
    opacity: 0.5;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
  }
`;
