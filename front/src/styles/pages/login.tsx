import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 30vw;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
  border-radius: 8px;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: bold;
  
  span {
    color: #0066cc;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputLabel = styled.label`
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 0.9rem;
`;

const InputField = styled.input`
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const LoginButton = styled.button`
  padding: 0.8rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0052a3;
  }
`;

const SignupLink = styled.a`
  margin-top: 1.5rem;
  text-align: center;
  color: #0066cc;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;
export{
    LoginContainer,
    Logo,
    LoginForm,
    InputLabel,
    InputField,
    LoginButton,
    SignupLink
}