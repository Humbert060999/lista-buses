import "./Login.css";
import { Input, Form, Button, message } from "antd";
import { useNavigate } from "react-router-dom"; // Importa useNavigate en lugar de useHistory
import IconoLogin from "../Imagenes/icono-usuario.png";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Utiliza useNavigate para la navegación

  const users = [
    { username: "admin", password: "12345" },
    { username: "humberto", password: "12345" },
  ];

  const iniciarSesion = (values) => {
    // Validación de las credenciales
    const user = users.find(
      (user) =>
        user.username === values.user && user.password === values.password
    );

    if (user) {
      // Inicio de sesión exitoso
      navigate("/inicio");
      message.success("Inicio de sesión correctamente ")
    } else {
      // Error de autenticación
      message.error("Usuario o contraseña incorrectos");
    }
  };

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
            <Input placeholder="Ingrese el nombre de usuario" />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "Por favor ingrese su contraseña" },
            ]}
          >
            <Input.Password placeholder="Ingrese la contraseña" />
          </Form.Item>
          <Button type="primary" block  htmlType="submit">
            Ingresar
          </Button>
        </div>
      </Form>
    </div>
  );
}
