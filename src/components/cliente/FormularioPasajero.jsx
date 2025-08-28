import "./VentanaCliente.css"
import {
    Input,
    Form,
    Modal,
    Radio,
} from "antd";
import InputMask from "react-input-mask";

export default function FormularioPasajero() {
    return (
        <Modal
            title={<h3 style={{ textAlign: "center" }}>Formulario de pasajero</h3>}
            open={viewModal}
            onOk={() => form2.submit()}
            onCancel={showCloseConfirm}
            okText="Guardar"
            cancelText="Cerrar"
            width="90%"
            className="form-pasajeros-container"
        >
            <Form form={form2} layout="vertical" onFinish={guardarDatosPasajeros}>
                <Form.Item
                    label="CI"
                    name="ci"
                    rules={[
                        { required: true, message: "Por favor, ingresa el CI" },
                        {
                            pattern: /^[0-9]{1,9}$/,
                            message: "Solo números, máximo 9 dígitos",
                        },
                    ]}
                >
                    <Input
                        placeholder="Ingrese el número de carnet"
                        maxLength={9}
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                </Form.Item>
                <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[
                        { required: true, message: "Por favor, ingresa los nombres" },
                        {
                            pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                            message: "Solo se permiten letras",
                        },
                    ]}
                >
                    <Input placeholder="Ingrese nombre(s)" maxLength={22} />
                </Form.Item>
                <Form.Item
                    label="Apellido"
                    name="apellido"
                    rules={[
                        { required: true, message: "Por favor, ingresa los apellidos" },
                        {
                            pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                            message: "Solo se permiten letras",
                        },
                    ]}
                >
                    <Input placeholder="Ingrese los apellidos" maxLength={22} />
                </Form.Item>
                <Form.Item
                    label="Fecha de nacimiento"
                    name="fechaNacimiento"
                    rules={[
                        {
                            required: true,
                            message: "Por favor, ingrese la fecha de nacimiento",
                        },
                        {
                            pattern: /^\d{2}\/\d{2}\/\d{4}$/,
                            message: "Formato inválido, use DD/MM/YYYY",
                        },
                    ]}
                >
                    <InputMask
                        mask="99/99/9999"
                        placeholder="DD/MM/YYYY"
                        className="input-fecha-cliente"
                        inputMode="numeric"
                        pattern="\d*"
                    />
                </Form.Item>
                <div className="group-nacionalidad-destino">
                    <Form.Item label="Nacionalidad" name="nacionalidadPasajero">
                        <Input placeholder="Ingrese la nacionalidad" maxLength={11} />
                    </Form.Item>
                    <Form.Item label="Destino" name="destinoPasajero">
                        <Input placeholder="Ingrese el destino" maxLength={12} />
                    </Form.Item>
                </div>
                <Form.Item label="Sexo" name="sexo">
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Masculino</Radio>
                        <Radio value={2}>Femenino</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}