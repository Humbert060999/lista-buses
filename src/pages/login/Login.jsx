import "./Login.css";
import { Input, Form, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api";
import IconoLogin from "../../assets/icono-usuario.png";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const users = [
    { username: "admin", password: "12345" },
    { username: "humberto", password: "12345" },
    { username: "daniel", password: "daniel" },
    { username: "Cancio", password: "Cancio267" },
    { username: "jbxy57", password: "jbxy57" },
    { username: "cshw32", password: "cshw32" },
    { username: "jvty12", password: "jvty12" },
    { username: "kclt56", password: "kclt56" },
  ];

  const iniciarSesion = (values) => {
    // Validación de las credenciales
    const user = users.find(
      (user) =>
        user.username === values.user && user.password === values.password
    );

    if (user) {
      navigate("/inicio");
      message.success("Inicio de sesión correctamente ");
    } else {
      message.error("Usuario o contraseña incorrectos");
    }
  };
  // const iniciarSesion = async (values) => {
  //   try {
  //     // Petición al backend Spring Boot
  //     const res = await axios.post(`${API_URL}/auth/login`, {
  //       username: values.user,
  //       password: values.password,
  //     });

  //     // Guardar tokens (temporal para desarrollo)
  //     localStorage.setItem("accessToken", res.data.accessToken);
  //     localStorage.setItem("refreshToken", res.data.refreshToken);

  //     message.success("Inicio de sesión correctamente");
  //     navigate("/inicio");
  //   } catch (err) {
  //     // Si el backend devuelve 401 u otro error
  //     message.error("Usuario o contraseña incorrectos");
  //   }
  // };

  return (
    <div className="contenedor-principal">
      <Form
        form={form}
        onFinish={iniciarSesion}
        layout="vertical"
        className="formulario"
      >
        <div className="icono-login">
          <img src={IconoLogin} alt="icono usuario" />
        </div>
        <div>
          <Form.Item
            label="Usuario"
            name="user"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre de usuario",
              },
            ]}
          >
            <Input
              placeholder="Ingrese el nombre de usuario"
              autoFocus
              maxLength={15}
            />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "Por favor ingrese su contraseña" },
            ]}
          >
            <Input.Password
              placeholder="Ingrese la contraseña"
              maxLength={15}
            />
          </Form.Item>
          <Button type="primary" block htmlType="submit">
            Ingresar
          </Button>
        </div>
      </Form>
    </div>
  );
}
